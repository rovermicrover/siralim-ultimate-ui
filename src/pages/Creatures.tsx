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
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Helmet } from "react-helmet-async";

import { StringParam, withDefault } from "use-query-params";
import { QueryParamStructure } from "../lib/queryParams";
import { ICreaturesSearchSchema } from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { ESearchEndPoints } from "../lib/endpoints";
import { useQuery } from "../lib/useQuery";
import { buildBugReportUrl } from "../lib/bugReportForm";
import creatureFields from "../lib/creatureFields";

import SortedTableHeader from "../components/SortedTableHeader";
import TagsPills from "../components/TagsPills";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import SearchInput from "../components/SearchInput";
import jsonLD from "../lib/jsonLD";
import { MuiSafeLink } from "../components/MuiRouterLink";

import BugReportIcon from "@mui/icons-material/BugReport";

const NAME_FIELDS = ["name", "klass_name", "race_name"];

const ATTRIBUTE_FIELDS = [
  "health",
  "attack",
  "intelligence",
  "defense",
  "speed",
];

const queryParamsStructure = new QueryParamStructure<
  ICreaturesSearchSchema["filter"]["filters"][number]
>({
  sort_by: withDefault(StringParam, "race_name"),
});

const fetchCreatures = buildSearch<ICreaturesSearchSchema>(
  ESearchEndPoints.creatures
);

export default function Creatures() {
  const {
    results: creatures,
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
  } = useQuery(fetchCreatures, queryParamsStructure);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Helmet>
        <title>Creatures Bestiary | Siralim Ultimate Unofficial Codex</title>
        <meta
          name="description"
          content="Creatures Bestiary | Siralim Ultimate Unofficial Codex"
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
        fields={creatureFields}
      />
      <TableContainer className="data-table-container" component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow role="presentation">
              <TableCell
                role="presentation"
                colSpan={8}
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
              {NAME_FIELDS.map((key) => {
                return { key, field: creatureFields[key] };
              }).map(({ key, field }, i) => (
                <SortedTableHeader
                  align={i > 0 ? "center" : "left"}
                  key={key}
                  field={key}
                  name={isLg ? field.label : field.abbr || field.label}
                  icon={field.icon}
                  sort={query}
                  reduceSort={reduceSort}
                />
              ))}
              {ATTRIBUTE_FIELDS.map((key) => {
                return { key, field: creatureFields[key] };
              }).map(({ key, field }) => (
                <SortedTableHeader
                  align="center"
                  key={key}
                  field={key}
                  name={
                    isLg ? field.label : isSm ? field.abbr || field.label : ""
                  }
                  icon={field.icon}
                  sort={query}
                  reduceSort={reduceSort}
                />
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {creatures.map((creature) => (
              <React.Fragment key={creature.id}>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell colSpan={9} style={{ paddingBottom: 0 }}>
                    <MuiSafeLink
                      to={`/creatures/${creature.slug}`}
                      target="_blank"
                    >
                      <Typography
                        variant="h4"
                        component="h3"
                      >
                        {creature.name}
                      </Typography>
                    </MuiSafeLink>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell align="left" sx={{ width: "32px" }}>
                    <MuiSafeLink
                      to={`/creatures/${creature.slug}`}
                      target="_blank"
                    >
                      <img
                        width="64"
                        src={creature.battle_sprite}
                        alt={`${creature.name} Battle Sprite`}
                        aria-hidden="true"
                      />
                    </MuiSafeLink>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={creature.klass.name}>
                      <img
                        src={creature.klass.icon}
                        width="32"
                        alt={`${creature.name} Klass Icon ${creature.klass.name}`}
                        aria-hidden="true"
                      />
                    </Tooltip>
                    {isSm ? (
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        {creature.klass.name}
                      </Typography>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={creature.race.name}>
                      <img
                        src={creature.race.icon}
                        width="32"
                        alt={`${creature.name} Race Icon ${creature.race.name}`}
                        aria-hidden="true"
                      />
                    </Tooltip>
                    {isSm ? (
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        component="div"
                      >
                        {creature.race.name}
                      </Typography>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">{creature.health}</TableCell>
                  <TableCell align="center">{creature.attack}</TableCell>
                  <TableCell align="center">{creature.intelligence}</TableCell>
                  <TableCell align="center">{creature.defense}</TableCell>
                  <TableCell align="center">{creature.speed}</TableCell>
                </TableRow>
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell colSpan={9} style={{ paddingTop: 0 }}>
                    <Typography variant="subtitle2" component="div">
                      Trait: {creature.trait.name}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {creature.trait.description}
                    </Typography>
                  </TableCell>
                </TableRow>
                {creature.trait.tags.length > 0 && (
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset !important" } }}
                  >
                    <TableCell colSpan={8} style={{ paddingTop: 0 }}>
                      <TagsPills tags={creature.trait.tags} />
                    </TableCell>
                  </TableRow>
                )}
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset !important" } }}
                >
                  <TableCell colSpan={8} style={{ paddingTop: 0 }}>
                    <b>
                      Sources:{" "}
                      {creature.sources.map(({ name }) => name).join(" | ")}
                    </b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={8} style={{ paddingTop: 0 }}>
                    <MuiSafeLink
                      href={buildBugReportUrl({
                        dataType: "Creatures",
                        target: creature.name,
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
