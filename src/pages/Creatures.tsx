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
import FilterButtons from "../components/filters/FilterButtons";
import FilterDrawer from "../components/filters/FilterDrawer";
import { IFieldToType } from "../components/filters/types";
import SearchInput from "../components/SearchInput";
import {
  ICreatureModel,
  ICreaturesSearchSchema,
  ICreatureStrFilterSchema,
  ICreatureIntFilterSchema,
} from "../lib/openAPI";
import { buildSearch } from "../lib/search";

const FIELDS_TO_LABELS: Record<string, string> = {
  name: "Name",
  klass_name: "Class",
  race_name: "Race",
  trait_name: "Trait",
  health: "Health",
  attack: "Attack",
  intelligence: "Intelligence",
  defense: "Defense",
  speed: "Speed",
};

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

const SORTABLE_FIELDS = [
  "name",
  "klass_name",
  "race_name",
  "trait_name",
  "health",
  "attack",
  "intelligence",
  "defense",
  "speed",
];

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, "race_name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
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

  const {
    pageChange,
    sizeChange,
    reduceSort,
    qChange,
    updateFilter,
    addFilter,
    removeFilter,
    clearFilters,
  } = buildQueryParamsMutators<
    ICreatureStrFilterSchema | ICreatureIntFilterSchema
  >(query, setQuery);

  return (
    <>
      <FilterDrawer<ICreatureStrFilterSchema | ICreatureIntFilterSchema>
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
              <TableCell colSpan={3}>
                <FilterButtons
                  hasFilters={query.filters.length ? true : false}
                  setIsFilterDrawerOpen={setIsFilterDrawerOpen}
                  clearFilters={clearFilters}
                />
                <SearchInput q={query.q} qChange={qChange} />
              </TableCell>
              <TablePagination
                count={count}
                page={query.page}
                labelRowsPerPage="Num: "
                onPageChange={pageChange}
                rowsPerPage={query.size}
                onRowsPerPageChange={sizeChange}
              />
            </TableRow>
            <TableRow>
              <TableCell>Sprite</TableCell>
              {SORTABLE_FIELDS.map((field) => (
                <SortedTableHeader
                  align="center"
                  key={field}
                  field={field}
                  name={FIELDS_TO_LABELS[field]}
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
                  <TableCell sx={{ width: "32px" }} scope="row">
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
                </TableRow>
                <TableRow
                  sx={
                    creature.trait.tags.length > 0
                      ? { "& > *": { borderBottom: "unset !important" } }
                      : {}
                  }
                >
                  <TableCell colSpan={10} style={{ paddingTop: 0 }}>
                    {creature.trait.description}
                  </TableCell>
                </TableRow>
                {creature.trait.tags.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={10} style={{ paddingTop: 0 }}>
                      <TagsPills
                        tags={creature.trait.tags}
                        justifyContent="flex-start"
                      />
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
