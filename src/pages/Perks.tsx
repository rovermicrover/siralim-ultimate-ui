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

import { StringParam, withDefault } from "use-query-params";
import { QueryParamStructure } from "../lib/queryParams";
import { IPerksSearchSchema } from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { ESearchEndPoints } from "../lib/endpoints";
import { useQuery } from "../lib/useQuery";
import { buildBugReportUrl } from "../lib/bugReportForm";

import SortedTableHeader from "../components/SortedTableHeader";
import SearchInput from "../components/SearchInput";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import BoolIcon from "../components/BoolIcon";
import TagsPills from "../components/TagsPills";
import jsonLD from "../lib/jsonLD";
import { MuiSafeLink } from "../components/MuiRouterLink";

import BugReportIcon from "@mui/icons-material/BugReport";

const FIELDS: Record<string, IField> = {
  specialization_name: {
    type: "string",
    label: "Specialization",
    resource: ESearchEndPoints.specializations,
  },
  name: { type: "string", label: "Name", resource: ESearchEndPoints.perks },
  ranks: { type: "number", label: "Ranks" },
  cost: { type: "number", label: "Cost" },
  annointment: { type: "boolean", label: "Annointment" },
  ascension: { type: "boolean", label: "Ascension" },
  tags: {
    type: "string_array",
    label: "Tags",
  },
};

const queryParamsStructure = new QueryParamStructure<
  IPerksSearchSchema["filter"]["filters"][number]
>({
  sort_by: withDefault(StringParam, "specialization_name"),
});

const fetchPerks = buildSearch<IPerksSearchSchema>(ESearchEndPoints.perks);

export default function Perks() {
  const {
    results: perks,
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
  } = useQuery(fetchPerks, queryParamsStructure);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Perks List | Siralim Ultimate Unofficial Codex</title>
        <meta
          name="description"
          content="Perks List | Siralim Ultimate Unofficial Codex"
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
                colSpan={6}
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
                field={"specialization_name"}
                name={FIELDS["specialization_name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"ranks"}
                name={FIELDS["ranks"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"cost"}
                name={FIELDS["cost"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"annointment"}
                name={FIELDS["annointment"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"ascension"}
                name={FIELDS["ascension"].label}
                sort={query}
                reduceSort={reduceSort}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {perks.map((perk) => (
              <React.Fragment key={perk.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell>
                    <img
                      height="32"
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
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell colSpan={6} style={{ paddingTop: 0 }}>
                    {perk.description}
                  </TableCell>
                </TableRow>
                {perk.tags.length > 0 && (
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset !important" } }}
                  >
                    <TableCell colSpan={6} style={{ paddingTop: 0 }}>
                      <TagsPills tags={perk.tags} />
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={8} style={{ paddingTop: 0 }}>
                    <MuiSafeLink
                      href={buildBugReportUrl({
                        dataType: "Perks",
                        target: perk.name,
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
