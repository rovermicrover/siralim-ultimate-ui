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
import TagsPills from "../components/TagsPills";
import {
  ISpellModel,
  ISpellsSearchSchema,
  ISpellStrFilterSchema,
  ISpellIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IFieldToType } from "../components/filters/types";
import FilterDrawer from "../components/filters/FilterDrawer";

const FIELDS_TO_LABELS: Record<string, string> = {
  "name": "Name",
  "klass_name": "Class",
  "charges": "Charges",
}

const FILTER_FIELDS_TO_TYPE: IFieldToType = {
  name: "string",
  klass_name: "string",
  charges: "number"
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  filters: withDefault(JsonParam, []),
};

const fetchSpells = buildSearch<ISpellsSearchSchema>("spells");

export default function Spells() {
  const [spells, setSpells] = useState<ISpellModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchSpells(query).then(
      (response: ISpellsSearchSchema) => {
        if (response.pagination) {
          const {
            data,
            pagination: { count },
          } = response;
          setSpells(data);
          setCount(count);
        } else {
          // TODO: handle validation error
        }
      }
    );
  }, [query]);

  const {
    pageChange,
    sizeChange,
    reduceSort,
    updateFilter,
    addFilter,
    removeFilter,
    clearFilters,
  } = buildQueryParamsMutators<ISpellStrFilterSchema | ISpellIntFilterSchema>(query, setQuery);

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
                align="left"
                field={"name"}
                name={FIELDS_TO_LABELS["name"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"klass_name"}
                name={FIELDS_TO_LABELS["klass_name"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"charges"}
                name={FIELDS_TO_LABELS["charges"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <TableCell align="center">Source</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {spells.map((spell) => (
              <TableRow key={spell.id}>
                <TableCell>{spell.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={spell.klass.icon}
                    alt={`${spell.name} Klass Icon ${spell.klass.name}`}
                  />
                </TableCell>
                <TableCell align="center">{spell.charges}</TableCell>
                <TableCell align="center">{spell.source.name}</TableCell>
                <TableCell align="center">{spell.description}</TableCell>
                <TableCell align="right">
                  <TagsPills tags={spell.tags} justifyContent="flex-end" />
                </TableCell>
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
