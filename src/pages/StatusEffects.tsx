import React, { useState } from "react";
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
import { Helmet } from "react-helmet-async";

import { QueryParamStructure } from "../lib/queryParams";
import { IStatusEffectsSearchSchema } from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { ESearchEndPoints } from "../lib/endpoints";
import { useQuery } from "../lib/useQuery";
import { buildBugReportUrl } from "../lib/bugReportForm";

import SortedTableHeader from "../components/SortedTableHeader";
import SearchInput from "../components/SearchInput";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import jsonLD from "../lib/jsonLD";
import { MuiSafeLink } from "../components/MuiRouterLink";

import BugReportIcon from "@mui/icons-material/BugReport";

const FIELDS: Record<string, IField> = {
  name: {
    type: "string",
    label: "Name",
    resource: ESearchEndPoints.statusEffects,
  },
  category: { type: "string", label: "Category" },
  turns: { type: "number", label: "Turns" },
  leave_chance: { type: "number", label: "Leave Chance" },
  max_stacks: { type: "number", label: "Stacks" },
};

const queryParamsStructure = new QueryParamStructure<
  IStatusEffectsSearchSchema["filter"]["filters"][number]
>();

const fetchStatusEffects = buildSearch<IStatusEffectsSearchSchema>(
  ESearchEndPoints.statusEffects
);

export default function StatusEffects() {
  const {
    results: statusEffects,
    count,
    query,
    queryMutators: {
      pageChange,
      sizeChange,
      reduceSort,
      qChange,
      updateFilter,
      addFilter,
      removeFilter,
      clearFilters,
    },
  } = useQuery(fetchStatusEffects, queryParamsStructure);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Status Effects List | Siralim Ultimate Unofficial Codex</title>
        <meta
          name="description"
          content="Status Effects List | Siralim Ultimate Unofficial Codex"
        />
        <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
      </Helmet>
      <FilterDrawer
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
                colSpan={5}
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
            <TableRow id="head-pagination-row" role="presentation">
              <TablePagination
                role="presentation"
                count={count}
                page={query.page}
                labelRowsPerPage="Num: "
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
                showFirstButton={true}
                showLastButton={true}
              />
            </TableRow>
            <TableRow>
              <SortedTableHeader
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                field={"category"}
                name={FIELDS["category"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"turns"}
                name={FIELDS["turns"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"leave_chance"}
                name={FIELDS["leave_chance"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"max_stacks"}
                name={FIELDS["max_stacks"].label}
                sort={query}
                reduceSort={reduceSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {statusEffects.map((statusEffect) => (
              <React.Fragment key={statusEffect.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>
                    <img
                      width="32"
                      height="32"
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
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell colSpan={5} style={{ paddingTop: 0 }}>
                    {statusEffect.description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8} style={{ paddingTop: 0 }}>
                    <MuiSafeLink
                      href={buildBugReportUrl({
                        dataType: "Status Effects (Buffs, Debuffs, Minions)",
                        target: statusEffect.name,
                      })}
                    >
                      <BugReportIcon />
                    </MuiSafeLink>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
                count={count}
                page={query.page}
                labelRowsPerPage="Num: "
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
                showFirstButton={true}
                showLastButton={true}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
