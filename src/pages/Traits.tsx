import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import {
  useQueryParams,
  StringParam,
  NumberParam,
  JsonParam,
  withDefault,
} from "use-query-params";
import { buildQueryParamsMutators } from "../lib/queryParams";

import SortedTableHeader from "../components/SortedTableHeader";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import SearchInput from "../components/SearchInput";
import TagsPills from "../components/TagsPills";
import {
  ITraitModel,
  ITraitsSearchSchema,
  ITraitStrFilterSchema,
  ITraitIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IFieldToType } from "../components/filters/types";

const FIELDS_TO_LABELS: Record<string, string> = {
  name: "Name",
  material_name: "Material Name",
};

const FILTER_FIELDS_TO_TYPE: IFieldToType = {
  name: "string",
  material_name: "string",
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
  filters: withDefault(JsonParam, []),
};

const fetchTraits = buildSearch<ITraitsSearchSchema>("traits");

export default function Traits() {
  const [traits, setTraits] = useState<ITraitModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchTraits(query).then((response: ITraitsSearchSchema) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setTraits(data);
        setCount(count);
      } else {
        // TODO: handle validation error
      }
    });
  }, [query]);

  const {
    pageChange,
    sizeChange,
    reduceSort,
    qChange,
    updateFilter,
    addFilter,
    removeFilter,
    clearFilters,
  } = buildQueryParamsMutators<ITraitStrFilterSchema | ITraitIntFilterSchema>(
    query,
    setQuery
  );

  return (
    <>
      <FilterDrawer<ITraitStrFilterSchema | ITraitIntFilterSchema>
        isFilterDrawerOpen={isFilterDrawerOpen}
        setIsFilterDrawerOpen={setIsFilterDrawerOpen}
        filters={query.filters}
        addFilter={addFilter}
        updateFilter={updateFilter}
        removeFilter={removeFilter}
        clearFilters={clearFilters}
        fieldsToType={FILTER_FIELDS_TO_TYPE}
        fieldsToLabel={FIELDS_TO_LABELS}
      />
      <TableContainer style={{ maxHeight: "100%" }} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <FilterButtons
                  hasFilters={query.filters.length ? true : false}
                  setIsFilterDrawerOpen={setIsFilterDrawerOpen}
                  clearFilters={clearFilters}
                />
              </TableCell>
              <TableCell>
                <SearchInput q={query.q} qChange={qChange} />
              </TableCell>
              <TablePagination
                count={count}
                page={query.page}
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
              />
            </TableRow>
            <TableRow>
              <SortedTableHeader
                align="left"
                field={"name"}
                name={"Name"}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="left"
                field={"material_name"}
                name={"Material Name"}
                sort={query}
                reduceSort={reduceSort}
              />
              <TableCell align="center">Description</TableCell>
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {traits.map((trait) => (
              <TableRow key={trait.id}>
                <TableCell>{trait.name}</TableCell>
                <TableCell>{trait.material_name}</TableCell>
                <TableCell align="center">{trait.description}</TableCell>
                <TableCell align="right">
                  <TagsPills tags={trait.tags} justifyContent="flex-end" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
                count={count}
                page={query.page}
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
