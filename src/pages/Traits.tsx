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

export default function Traits() {
  const [traits, setTraits] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  const fetchTraits = useCallback(async (page: number, size: number, sort_by: string, sort_direction: string) => {
    const params = new URLSearchParams({ 
      page: String(page), 
      size: String(size),
      sort_by, 
      sort_direction,
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/traits?${params.toString()}`);
    const json = await response.json();
    setTraits(json.data);
    setCount(json.pagination.count);
  }, []);

  useEffect(() => {
    fetchTraits(query.page, query.size, query.sort_by, query.sort_direction)
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
            <SortedTableHeader align="left" field={'name'} name={'Name'} sort={query} reduceSort={reduceSort} />
            <SortedTableHeader align="left" field={'material_name'} name={'Material Name'} sort={query} reduceSort={reduceSort} />
            <TableCell align="center">Description</TableCell>
            <TableCell align="right">Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {traits.map((trait) => 
            <TableRow key={trait.id}>
              <TableCell>{trait.name}</TableCell>
              <TableCell>{trait.material_name}</TableCell>
              <TableCell align="center">{trait.description}</TableCell>
              <TableCell align="right">
                <TagsPills tags={trait.tags} justifyContent="flex-end"/>
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