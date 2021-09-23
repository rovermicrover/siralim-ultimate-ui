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

import paginationReducer, { IPagination } from '../reducers/pagination';
import sortReducer, { ISort } from '../reducers/sort';

import SortedTableHeader from '../components/SortedTableHeader'
import TagsPills from '../components/TagsPills'

const SORTABLE_FIELDS = [
  { field: 'name', name: 'Name' },
  { field: 'material_name', name: 'Material Name' },
]

const paginationInit: IPagination = { page: 0, size: 25, count: 0 };
const sortInit: ISort = { by: 'name', direction: 'asc' };

export default function Klasses() {
  const [klasses, setKlasses] = useState<any[]>([]);
  const [pagination, reducePagination] = useReducer(paginationReducer, paginationInit)
  const [sort, reduceSort] = useReducer(sortReducer, sortInit);

  const fetchKlasses = useCallback(async (page: number, size: number, sort: ISort) => {
    const params = new URLSearchParams({ 
      page: String(page), 
      size: String(size),
      sort_by: sort.by, 
      sort_direction: sort.direction,
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/classes?${params.toString()}`);
    const json = await response.json();
    setKlasses(json.data);
    reducePagination({ count: json.pagination.count });
  }, []);

  useEffect(() => {
    fetchKlasses(pagination.page, pagination.size, sort)
  }, [pagination.page, pagination.size, sort]);

  const pageChange = useCallback(( event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
    reducePagination({ page: newPage });
  }, []);

  const sizeChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    reducePagination({ size: parseInt(event.target.value), page: 0 });
  }, []);

  return (
    <TableContainer style={{maxHeight: '100%'}} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TablePagination
              count={pagination.count}
              page={pagination.page}
              onPageChange={pageChange}
              rowsPerPage={pagination.size}
              onRowsPerPageChange={sizeChange}
            />
          </TableRow>
          <TableRow>
            <SortedTableHeader field={'name'} name={'Name'} sort={sort} reduceSort={reduceSort} />
            <TableCell align="center">Icon</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {klasses.map((klass) => 
            <TableRow key={klass.id}>
              <TableCell>{klass.name}</TableCell>
              <TableCell align="center"><img src={klass.icon}/></TableCell>
              <TableCell align="right">{klass.description}</TableCell>
            </TableRow> 
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
              <TablePagination
                style={{borderTop: '1px solid rgba(224, 224, 224, 1)'}}
                count={pagination.count}
                page={pagination.page}
                onPageChange={pageChange}
                rowsPerPage={pagination.size}
                onRowsPerPageChange={sizeChange}
              />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}