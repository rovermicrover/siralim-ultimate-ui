import React, { useCallback, useEffect, useState, useReducer } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from 'use-query-params';
import { IQueryParams, ISort, ISortAction } from '../lib/queryParams';

import SortedTableHeader from '../components/SortedTableHeader';
import TagsPills from '../components/TagsPills';

const SORTABLE_FIELDS = [
  { field: 'name', name: 'Name' },
  { field: 'klass_name', name: 'Class' },
  { field: 'race_name', name: 'Race' },
  { field: 'trait_name', name: 'Trait' },
  { field: 'health', name: 'Health' },
  { field: 'attack', name: 'Attack' },
  { field: 'intelligence', name: 'Intelligence' },
  { field: 'defense', name: 'Defense' },
  { field: 'speed', name: 'Speed' },
]

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, 'race_name'),
  sort_direction: withDefault(StringParam, 'asc'),
}

export default function Creatures() {
  const [creatures, setCreatures] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  const fetchCreatures = useCallback(async (page: number, size: number, sort_by: string, sort_direction: string) => {
    const params = new URLSearchParams({ 
      page: String(page), 
      size: String(size),
      sort_by, 
      sort_direction,
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/creatures?${params.toString()}`);
    const json = await response.json();
    setCreatures(json.data);
    setCount(json.pagination.count);
  }, []);

  useEffect(() => {
    fetchCreatures(query.page, query.size, query.sort_by, query.sort_direction)
  }, [query]);

  const pageChange = useCallback(( event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
    setQuery({...query, page: newPage});
  }, [query]);

  const sizeChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery({ ...query, size: parseInt(event.target.value), page: 0 });
  }, [query]);

  const reduceSort = useCallback((sort: ISortAction) => {
    setQuery({ ...query, ...sort });
  }, [query]);

  return (
    <TableContainer style={{maxHeight: '100%'}} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
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
            {SORTABLE_FIELDS.map(({field, name}) => (
              <SortedTableHeader align="center" key={field} field={field} name={name} sort={query} reduceSort={reduceSort} />
            ))}
            <TableCell align="right">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {creatures.map((creature) => 
            <TableRow key={creature.id}>
              <TableCell component="th" scope="row"><img src={creature.battle_sprite}/></TableCell>
              <TableCell align="center">{creature.name}</TableCell>
              <TableCell align="center"><img src={creature.klass.icon}/></TableCell>
              <TableCell align="center">{creature.race.name}</TableCell>
              <TableCell align="center">{creature.trait.name}</TableCell>
              <TableCell align="center">{creature.health}</TableCell>
              <TableCell align="center">{creature.attack}</TableCell>
              <TableCell align="center">{creature.intelligence}</TableCell>
              <TableCell align="center">{creature.defense}</TableCell>
              <TableCell align="center">{creature.speed}</TableCell>
              <TableCell align="right">
                <TagsPills tags={creature.trait.tags} justifyContent="flex-end"/>
              </TableCell>
            </TableRow> 
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
              <TablePagination
                style={{borderTop: '1px solid rgba(224, 224, 224, 1)'}}
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
  );
}