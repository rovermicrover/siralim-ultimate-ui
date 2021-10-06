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
import Typography from "@mui/material/Typography";
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
import SearchInput from "../components/SearchInput";
import {
  IStatusEffectModel,
  IStatusEffectsSearchSchema,
  IStatusEffectStrFilterSchema,
  IStatusEffectIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import useQueryParamMutator from "../components/useQueryMutator";

const FIELDS: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: "status_effects" },
  category: { type: "string", label: "Category" },
  turns: { type: "number", label: "Turns" },
  leave_chance: { type: "number", label: "Leave Chance" },
  max_stacks: { type: "number", label: "Stacks" },
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
  filters: withDefault(JsonParam, []),
};

const fetchStatusEffects =
  buildSearch<IStatusEffectsSearchSchema>("status-effects");

export default function StatusEffects() {
  const {results, query, filterButtonProps, FilterButtons, filterProps, filterDrawerProps,FilterDrawer,
    searchProps: searchInputProps, SearchInput, tablePaginationProps, TablePagination
} = useQueryParamMutator(queryParamsStructure, FIELDS, fetchStatusEffects);

  const InstanceTablePagination = <TablePagination {...tablePaginationProps} />

  return (
    <>
      <FilterDrawer<IStatusEffectStrFilterSchema | IStatusEffectIntFilterSchema>
        {...filterDrawerProps}
      />
      <TableContainer className="data-table-container" component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow role="presentation">
              <TableCell
                role="presentation"
                colSpan={5}
                sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <FilterButtons
                {...filterButtonProps}
                />
                <SearchInput {...searchInputProps} />
              </TableCell>
            </TableRow>
            <TableRow role="presentation">{InstanceTablePagination}</TableRow>
            <TableRow>
              <SortedTableHeader
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                field={"category"}
                name={FIELDS["category"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"turns"}
                name={FIELDS["turns"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"leave_chance"}
                name={FIELDS["leave_chance"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"max_stacks"}
                name={FIELDS["max_stacks"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((statusEffect) => (
              <React.Fragment key={statusEffect.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>
                    <img
                      width="32"
                      src={statusEffect.icon}
                      alt={`Status Effect Icon ${statusEffect.name}`}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {statusEffect.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{statusEffect.category}</TableCell>
                  <TableCell align="center">{statusEffect.turns}</TableCell>
                  <TableCell align="center">
                    {statusEffect.leave_chance
                      ? `${statusEffect.leave_chance}%`
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    {statusEffect.max_stacks}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} style={{ paddingTop: 0 }}>
                    {statusEffect.description}
                  </TableCell>
                </TableRow>
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
