import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";

import {
  useQueryParams,
  StringParam,
  NumberParam,
  JsonParam,
  withDefault,
} from "use-query-params";
import { buildQueryParamsMutators } from "../lib/queryParams";

import SortedTableHeader from "../components/SortedTableHeader";
import TagsPills from "../components/TagsPills";
import {
  ITraitModel,
  ITraitsSearchSchema,
  ITraitStrFilterSchema,
  ITraitIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
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
      <TableContainer style={{ maxHeight: "100%" }} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  color="inherit"
                  aria-label="open filters"
                  onClick={() => setIsFilterDrawerOpen(true)}
                  edge="start"
                >
                  <FilterListIcon />
                </IconButton>
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
