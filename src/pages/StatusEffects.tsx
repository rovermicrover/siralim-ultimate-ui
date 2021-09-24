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

import SortedTableHeader from '../components/SortedTableHeader'
import TagsPills from '../components/TagsPills'

const SORTABLE_FIELDS = [
  { field: 'name', name: 'Name' },
  { field: 'material_name', name: 'Material Name' },
]

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 25),
  sort_by: withDefault(StringParam, 'name'),
  sort_direction: withDefault(StringParam, 'asc'),
}

export default function StatusEffects() {
  const [statusEffects, setStatusEffects] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  const fetchStatusEffects = useCallback(async (page: number, size: number, sort_by: string, sort_direction: string) => {
    const params = new URLSearchParams({ 
      page: String(page), 
      size: String(size),
      sort_by, 
      sort_direction,
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/status-effects?${params.toString()}`);
    const json = await response.json();
    setStatusEffects(json.data);
    setCount(json.pagination.count);
  }, []);

  useEffect(() => {
    fetchStatusEffects(query.page, query.size, query.sort_by, query.sort_direction)
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
            <SortedTableHeader field={'name'} name={'Name'} sort={query} reduceSort={reduceSort} />
            <SortedTableHeader field={'category'} name={'Category'} sort={query} reduceSort={reduceSort} />
            <TableCell align="center">Icon</TableCell>
            <SortedTableHeader align="center" field={'turns'} name={'Turns'} sort={query} reduceSort={reduceSort} />
            <SortedTableHeader align="center" field={'leave_chance'} name={'Leave Chance'} sort={query} reduceSort={reduceSort} />
            <SortedTableHeader align="center" field={'max_stacks'} name={'Max Stacks'} sort={query} reduceSort={reduceSort} />
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statusEffects.map((statusEffect) => 
            <TableRow key={statusEffect.id}>
              <TableCell>{statusEffect.name}</TableCell>
              <TableCell>{statusEffect.category}</TableCell>
              <TableCell align="center"><img src={statusEffect.icon}/></TableCell>
              <TableCell align="center">{statusEffect.turns}</TableCell>
              <TableCell align="center">{statusEffect.leave_chance}</TableCell>
              <TableCell align="center">{statusEffect.max_stacks}</TableCell>
              <TableCell align="right">{statusEffect.description}</TableCell>
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