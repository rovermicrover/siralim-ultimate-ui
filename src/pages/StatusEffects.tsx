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
  IStatusEffectModel,
  IStatusEffectsSearchSchema,
  IStatusEffectStrFilterSchema,
  IStatusEffectIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";
import { IFieldToType } from "../components/filters/types";
import FilterDrawer from "../components/filters/FilterDrawer";

const FIELDS_TO_LABELS: Record<string, string> = {
  name: "Name",
  category: "Category",
  turns: "Turns",
  leave_chance: "Leave Chance",
  max_stacks: "Max Stacks",
};

const FILTER_FIELDS_TO_TYPE: IFieldToType = {
  name: "string",
  category: "string",
  turns: "number",
  leave_chance: "number",
  max_stacks: "number",
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  filters: withDefault(JsonParam, []),
};

const fetchStatusEffects =
  buildSearch<IStatusEffectsSearchSchema>("status-effects");

export default function StatusEffects() {
  const [statusEffects, setStatusEffects] = useState<IStatusEffectModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchStatusEffects(query).then((response: IStatusEffectsSearchSchema) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setStatusEffects(data);
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
  } = buildQueryParamsMutators<
    IStatusEffectStrFilterSchema | IStatusEffectIntFilterSchema
  >(query, setQuery);

  return (
    <>
      <FilterDrawer<IStatusEffectStrFilterSchema | IStatusEffectIntFilterSchema>
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
              <TableCell>Icon</TableCell>
              <SortedTableHeader
                field={"name"}
                name={FIELDS_TO_LABELS["name"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                field={"category"}
                name={FIELDS_TO_LABELS["category"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"turns"}
                name={FIELDS_TO_LABELS["turns"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"leave_chance"}
                name={FIELDS_TO_LABELS["leave_chance"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <SortedTableHeader
                align="center"
                field={"max_stacks"}
                name={FIELDS_TO_LABELS["max_stacks"]}
                sort={query}
                reduceSort={reduceSort}
              />
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusEffects.map((statusEffect) => (
              <TableRow key={statusEffect.id}>
                <TableCell>
                  <img
                    src={statusEffect.icon}
                    alt={`Status Effect Icon ${statusEffect.name}`}
                  />
                </TableCell>
                <TableCell>{statusEffect.name}</TableCell>
                <TableCell>{statusEffect.category}</TableCell>
                <TableCell align="center">{statusEffect.turns}</TableCell>
                <TableCell align="center">
                  {statusEffect.leave_chance}
                </TableCell>
                <TableCell align="center">{statusEffect.max_stacks}</TableCell>
                <TableCell align="right">{statusEffect.description}</TableCell>
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
