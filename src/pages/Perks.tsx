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
  IPerkModel,
  IPerksSearchSchema,
  IPerkStrFilterSchema,
  IPerkIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import BoolIcon from "../components/BoolIcon";
import TagsPills from "../components/TagsPills";
import useQueryParamMutator from "../components/useQueryMutator";

const FIELDS: Record<string, IField> = {
  specialization_name: {
    type: "string",
    label: "Specialization",
    resource: "specializations",
  },
  name: { type: "string", label: "Name", resource: "perks" },
  ranks: { type: "number", label: "Ranks" },
  cost: { type: "number", label: "Cost" },
  annointment: { type: "boolean", label: "Annointment" },
  ascension: { type: "boolean", label: "Ascension" },
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
  filters: withDefault(JsonParam, []),
};

const fetchPerks = buildSearch<IPerksSearchSchema>("perks");

export default function Perks() {
  const {results, query, filterButtonProps, FilterButtons, filterProps, filterDrawerProps,FilterDrawer,
    searchProps: searchInputProps, SearchInput, tablePaginationProps, TablePagination
} = useQueryParamMutator(queryParamsStructure, FIELDS, fetchPerks);

  const InstanceTablePagination = <TablePagination {...tablePaginationProps} />

  return (
    <>
      <FilterDrawer<IPerkStrFilterSchema | IPerkIntFilterSchema>
        {...filterDrawerProps}
      />
      <TableContainer className="data-table-container" component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow role="presentation">
              <TableCell
                role="presentation"
                colSpan={6}
                sx={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                <FilterButtons
                {...filterButtonProps}
                />
                <SearchInput {...searchInputProps} />
              </TableCell>
            </TableRow>
            <TableRow role="presentation">
              {InstanceTablePagination}
            </TableRow>
            <TableRow>
              <SortedTableHeader
                field={"specialization_name"}
                name={FIELDS["specialization_name"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"ranks"}
                name={FIELDS["ranks"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"cost"}
                name={FIELDS["cost"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"annointment"}
                name={FIELDS["annointment"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"ascension"}
                name={FIELDS["ascension"].label}
                sort={query}
                reduceSort={filterProps.reduceSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((perk) => (
              <React.Fragment key={perk.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>
                    <img
                      width="32"
                      src={perk.specialization.icon}
                      alt={`Perk Specialization Icon ${perk.specialization.name}`}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {perk.specialization.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <img
                      width="32"
                      src={perk.icon}
                      alt={`Perk Icon ${perk.name}`}
                      aria-hidden="true"
                    />
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                    >
                      {perk.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{perk.ranks}</TableCell>
                  <TableCell align="center">{perk.cost}</TableCell>
                  <TableCell align="center">
                    <BoolIcon
                      bool={perk.annointment}
                      title={FIELDS["annointment"].label}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <BoolIcon
                      bool={perk.ascension}
                      title={FIELDS["ascension"].label}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={
                    perk.tags.length > 0
                      ? { "& > *": { borderBottom: "unset !important" } }
                      : {}
                  }
                >
                  <TableCell colSpan={6} style={{ paddingTop: 0 }}>
                    {perk.description}
                  </TableCell>
                </TableRow>
                {perk.tags.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} style={{ paddingTop: 0 }}>
                      <TagsPills tags={perk.tags} />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              {InstanceTablePagination}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
