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

import { QueryParamStructure } from "../lib/queryParams";

import SortedTableHeader from "../components/SortedTableHeader";
import SearchInput from "../components/SearchInput";
import TagsPills from "../components/TagsPills";
import {
  ISpellsSearchSchema,
  ISpellStrFilterSchema,
  ISpellIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { ESearchEndPoints } from "../lib/endpoints";
import { IField } from "../components/filters/types";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import { useQuery } from "../components/useQuery";

const FIELDS: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: ESearchEndPoints.spells },
  klass_name: {
    type: "string",
    label: "Class",
    resource: ESearchEndPoints.classes,
  },
  charges: { type: "number", label: "Charges" },
};

const queryParamsStructure = new QueryParamStructure<
  ISpellStrFilterSchema | ISpellIntFilterSchema
>();

const fetchSpells = buildSearch<ISpellsSearchSchema>(ESearchEndPoints.spells);

export default function Spells() {
  const {
    results: spells,
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
  } = useQuery(fetchSpells, queryParamsStructure);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  return (
    <>
      <FilterDrawer<ISpellStrFilterSchema | ISpellIntFilterSchema>
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
                colSpan={4}
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
            <TableRow role="presentation">
              <TablePagination
                role="presentation"
                count={count}
                page={query.page}
                labelRowsPerPage="Num: "
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
              />
            </TableRow>
            <TableRow>
              <SortedTableHeader
                align="left"
                field={"name"}
                name={FIELDS["name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"klass_name"}
                name={FIELDS["klass_name"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"charges"}
                name={FIELDS["charges"].label}
                sort={query}
                reduceSort={reduceSort}
              />
              <TableCell align="right">Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spells.map((spell) => (
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
            <TableRow>
              <TablePagination
                style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
                count={count}
                page={query.page}
                labelRowsPerPage="Num: "
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
