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
import {
  IRaceModel,
  IRacesSearchSchema,
  IRaceStrFilterSchema,
  IRaceIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IFieldToType } from "../components/filters/types";
import FilterDrawer from "../components/filters/FilterDrawer";

const FIELDS_TO_LABELS: Record<string, string> = {
  name: "Name",
  default_klass_name: "Class",
};

const FILTER_FIELDS_TO_TYPE: IFieldToType = {
  name: "string",
  default_klass_name: "string",
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  filters: withDefault(JsonParam, []),
};

const fetchRaces = buildSearch<IRacesSearchSchema>("races");

export default function Races() {
  const [races, setRaces] = useState<IRaceModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchRaces(query).then((response: IRacesSearchSchema) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setRaces(data);
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
  } = buildQueryParamsMutators(query, setQuery);

  return (
    <>
      <FilterDrawer<IRaceStrFilterSchema | IRaceIntFilterSchema>
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
                field={"name"}
                name={FIELDS_TO_LABELS["name"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"default_klass_name"}
                name={FIELDS_TO_LABELS["default_klass_name"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {races.map((race) => (
              <TableRow key={race.id}>
                <TableCell>{race.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={race.default_klass.icon}
                    alt={`${race.name} Default Klass Icon ${race.default_klass.name}`}
                  />
                </TableCell>
                <TableCell align="right">{race.description}</TableCell>
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
