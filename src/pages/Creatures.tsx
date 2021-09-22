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
  { field: 'klass_name', name: 'Class Name' },
  { field: 'race_name', name: 'Race Name' },
  { field: 'trait_name', name: 'Trait Name' },
  { field: 'health', name: 'Health' },
  { field: 'attack', name: 'Attack' },
  { field: 'intelligence', name: 'Intelligence' },
  { field: 'defense', name: 'Defense' },
  { field: 'speed', name: 'Speed' },
]

const paginationInit: IPagination = { page: 0, size: 25, count: 0 };
const sortInit: ISort = { by: 'race_name', direction: 'asc' };

export default function Creatures() {
  const [creatures, setCreatures] = useState<any[]>([]);
  const [pagination, reducePagination] = useReducer(paginationReducer, paginationInit)
  const [sort, reduceSort] = useReducer(sortReducer, sortInit);

  const fetchCreatures = useCallback(async (page: number, size: number, sort: ISort) => {
    const params = new URLSearchParams({ 
      page: String(page), 
      size: String(size),
      sort_by: sort.by, 
      sort_direction: sort.direction,
    });
    const response = await fetch(`${process.env.REACT_APP_API_URL}/creatures?${params.toString()}`);
    const json = await response.json();
    setCreatures(json.data);
    reducePagination({ count: json.pagination.count });
  }, []);

  useEffect(() => {
    fetchCreatures(pagination.page, pagination.size, sort)
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
            <TableCell>Sprite</TableCell>
            {SORTABLE_FIELDS.map(({field, name}) => (
              <SortedTableHeader key={field} field={field} name={name} sort={sort} reduceSort={reduceSort} />
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