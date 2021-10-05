import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { useDebounce } from "use-debounce";

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
import { IField } from "../components/filters/types";
import TablePaginationDefault from "../components/TablePaginationDefault";

const FIELDS: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: "traits" },
  material_name: { type: "string", label: "Material Name" },
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
  const [queryDebounced] = useDebounce(query, 200);

  useEffect(() => {
    fetchTraits(queryDebounced).then((response: ITraitsSearchSchema) => {
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
  }, [queryDebounced]);

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

  const InstanceTablePagination = TablePaginationDefault({
    count,
    query,
    pageChange,
    sizeChange,
  });

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
        fields={FIELDS}
      />
      <TableContainer className="data-table-container" component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow role="presentation">
              <TableCell
                role="presentation"
                colSpan={2}
                sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <FilterButtons
                  hasFilters={query.filters.length ? true : false}
                  setIsFilterDrawerOpen={setIsFilterDrawerOpen}
                  clearFilters={clearFilters}
                />
                <SearchInput q={query.q} qChange={qChange} />
              </TableCell>
            </TableRow>
            <TableRow role="presentation">{InstanceTablePagination}</TableRow>
            <TableRow>
              <SortedTableHeader
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"material_name"}
                name={FIELDS["material_name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {traits.map((trait) => (
              <React.Fragment key={trait.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>{trait.name}</TableCell>
                  <TableCell align="center">{trait.material_name}</TableCell>
                </TableRow>
                <TableRow
                  sx={
                    trait.tags.length
                      ? { "& > *": { borderBottom: "unset !important" } }
                      : {}
                  }
                >
                  <TableCell colSpan={2} style={{ paddingTop: 0 }}>
                    {trait.description}
                  </TableCell>
                </TableRow>
                {trait.tags.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={2} style={{ paddingTop: 0 }}>
                      <TagsPills tags={trait.tags} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>{InstanceTablePagination}</TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
