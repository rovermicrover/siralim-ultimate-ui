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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import {
  useQueryParams,
  StringParam,
  NumberParam,
  JsonParam,
  withDefault,
} from "use-query-params";
import { ISortAction } from "../lib/queryParams";

import SortedTableHeader from "../components/SortedTableHeader";
import TagsPills from "../components/TagsPills";
import FilterInput, { IFieldToType } from "../components/filters/FilterInput";
import {
  ICreatureModel,
  ICreaturesSearchSchema,
  ICreatureStrFilterSchema,
  ICreatureIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";

const SORTABLE_FIELDS = [
  { field: "name", name: "Name" },
  { field: "klass_name", name: "Class" },
  { field: "race_name", name: "Race" },
  { field: "trait_name", name: "Trait" },
  { field: "health", name: "Health" },
  { field: "attack", name: "Attack" },
  { field: "intelligence", name: "Intelligence" },
  { field: "defense", name: "Defense" },
  { field: "speed", name: "Speed" },
];

const FILTER_FIELDS_TO_TYPE: IFieldToType = {
  name: "string",
  klass_name: "string",
  race_name: "string",
  trait_name: "string",
  health: "number",
  attack: "number",
  intelligence: "number",
  defense: "number",
  speed: "number",
};

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "race_name"),
  sort_direction: withDefault(StringParam, "asc"),
  filters: withDefault(JsonParam, []),
};

const fetchCreatures = buildSearch<ICreaturesSearchSchema>("creatures");

export default function Creatures() {
  const [creatures, setCreatures] = useState<ICreatureModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchCreatures(query).then((response: ICreaturesSearchSchema) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setCreatures(data);
        setCount(count);
      } else {
        // TODO: handle validation error
      }
    });
  }, [query]);

  const pageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setQuery({ ...query, page: newPage });
    },
    [query]
  );

  const sizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery({ ...query, size: parseInt(event.target.value), page: 0 });
    },
    [query]
  );

  const reduceSort = useCallback(
    (sort: ISortAction) => {
      setQuery({ ...query, ...sort });
    },
    [query]
  );

  const updateFilter = useCallback(
    (
      index: number,
      filter: ICreatureStrFilterSchema | ICreatureIntFilterSchema
    ) => {
      const { filters } = query;
      const newFilters = [...filters];
      newFilters[index] = filter;
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const addFilter = useCallback(
    (filter: ICreatureStrFilterSchema | ICreatureIntFilterSchema) => {
      const { filters } = query;
      const newFilters = [...filters];
      newFilters.push(filter);
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const removeFilter = useCallback(
    (index: number) => {
      const { filters } = query;
      const newFilters = [
        ...filters.slice(0, index),
        ...filters.slice(index + 1, filters.length),
      ];
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const clearFilters = useCallback(() => {
    setQuery({ ...query, filters: [] });
  }, [query]);

  return (
    <>
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        sx={{
          width: 500,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 500, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <IconButton
          color="inherit"
          aria-label="open filters"
          onClick={() =>
            addFilter({ field: "name", comparator: "ilike", value: "" })
          }
          edge="start"
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open filters"
          onClick={() => clearFilters()}
          edge="start"
        >
          <ClearAllIcon />
        </IconButton>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {query.filters.map(
              (
                f: ICreatureStrFilterSchema | ICreatureIntFilterSchema,
                i: number
              ) => (
                <Grid key={i} item xs={12}>
                  <FilterInput<
                    ICreatureStrFilterSchema | ICreatureIntFilterSchema
                  >
                    filter={f}
                    index={i}
                    updateFilter={updateFilter}
                    removeFilter={removeFilter}
                    fieldsToType={FILTER_FIELDS_TO_TYPE}
                  />
                </Grid>
              )
            )}
          </Grid>
        </Paper>
      </Drawer>
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
              <TableCell>Sprite</TableCell>
              {SORTABLE_FIELDS.map(({ field, name }) => (
                <SortedTableHeader
                  align="center"
                  key={field}
                  field={field}
                  name={name}
                  sort={query}
                  reduceSort={reduceSort}
                />
              ))}
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creatures.map((creature) => (
              <TableRow key={creature.id}>
                <TableCell component="th" scope="row">
                  <img
                    src={creature.battle_sprite}
                    alt={`${creature.name} Battle Sprite`}
                  />
                </TableCell>
                <TableCell align="center">{creature.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={creature.klass.icon}
                    alt={`${creature.name} Klass Icon ${creature.klass.name}`}
                  />
                </TableCell>
                <TableCell align="center">{creature.race.name}</TableCell>
                <TableCell align="center">{creature.trait.name}</TableCell>
                <TableCell align="center">{creature.health}</TableCell>
                <TableCell align="center">{creature.attack}</TableCell>
                <TableCell align="center">{creature.intelligence}</TableCell>
                <TableCell align="center">{creature.defense}</TableCell>
                <TableCell align="center">{creature.speed}</TableCell>
                <TableCell align="right">
                  <TagsPills
                    tags={creature.trait.tags}
                    justifyContent="flex-end"
                  />
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
