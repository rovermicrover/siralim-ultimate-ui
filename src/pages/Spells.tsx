import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
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
import TagsPills from "../components/TagsPills";
import {
  ISpellModel,
  ISpellsSearchSchema,
  ISpellStrFilterSchema,
  ISpellIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import useQueryParamMutator from "../components/useQueryMutator";

const FIELDS: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: "spells" },
  klass_name: { type: "string", label: "Class", resource: "classes" },
  charges: { type: "number", label: "Charges" },
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
  filters: withDefault(JsonParam, []),
};

const fetchSpells = buildSearch<ISpellsSearchSchema>("spells");

export default function Spells() {
  const {results, query, filterButtonProps, FilterButtons, filterProps, filterDrawerProps,FilterDrawer,
    searchProps: searchInputProps, SearchInput, tablePaginationProps, TablePagination
} = useQueryParamMutator(queryParamsStructure, FIELDS, fetchSpells);

  const InstanceTablePagination = <TablePagination {...tablePaginationProps} />

  return (
    <>
      <FilterDrawer<ISpellStrFilterSchema | ISpellIntFilterSchema>
        {...filterDrawerProps}
      />
      <TableContainer className="data-table-container" component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow role="presentation">
              <TableCell
                role="presentation"
                colSpan={4}
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
                align="left"
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"klass_name"}
                name={FIELDS["klass_name"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"charges"}
                name={FIELDS["charges"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <TableCell align="right">Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((spell) => (
              <React.Fragment key={spell.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>{spell.name}</TableCell>
                  <TableCell align="center">
                    <img
                      src={spell.klass.icon}
                      width="32"
                      alt={`${spell.name} Klass Icon ${spell.klass.name}`}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {spell.klass.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{spell.charges}</TableCell>
                  <TableCell align="right">{spell.source.name}</TableCell>
                </TableRow>
                <TableRow
                  sx={
                    spell.tags.length > 0
                      ? { "& > *": { borderBottom: "unset !important" } }
                      : {}
                  }
                >
                  <TableCell colSpan={4} style={{ paddingTop: 0 }}>
                    {spell.description}
                  </TableCell>
                </TableRow>
                {spell.tags.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={4} style={{ paddingTop: 0 }}>
                      <TagsPills tags={spell.tags} />
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
