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

import { QueryParamStructure } from "../lib/queryParams";

import SortedTableHeader from "../components/SortedTableHeader";
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import SearchInput from "../components/SearchInput";
import TagsPills from "../components/TagsPills";
import {
  ITraitsSearchSchema,
  ITraitStrFilterSchema,
  ITraitIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IField } from "../components/filters/types";
import { useQuery } from "../components/useQuery";

const FIELDS: Record<string, IField> = {
  name: { type: "string", label: "Name", resource: "traits" },
  material_name: { type: "string", label: "Material Name" },
};

const queryParamsStructure = new QueryParamStructure<
  ITraitStrFilterSchema | ITraitIntFilterSchema
>();

const fetchTraits = buildSearch<ITraitsSearchSchema>("traits");

export default function Traits() {
  const {
    results: traits,
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
  } = useQuery(fetchTraits, queryParamsStructure);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

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
