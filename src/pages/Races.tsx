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
import { IRaceModel, IRacesSearchRequest, IRacesSearchSchema } from '../lib/openAPI';
import { buildSearch } from '../lib/search';

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

const fetchRaces = buildSearch<IRacesSearchRequest, IRacesSearchSchema>('races');

export default function Races() {
  const [races, setRaces] = useState<IRaceModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchRaces(query).then(({ data, pagination: { count }}: IRacesSearchSchema) => {
      setRaces(data);
      setCount(count);
    });
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
            <SortedTableHeader align="center" field={'default_klass_name'} name={'Class'} sort={query} reduceSort={reduceSort} />
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {races.map((race) => 
            <TableRow key={race.id}>
              <TableCell>{race.name}</TableCell>
              <TableCell align="center"><img src={race.default_klass.icon}/></TableCell>
              <TableCell align="right">{race.description}</TableCell>
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