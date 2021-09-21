import React, { useCallback, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/Pagination';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface SortArrowParams {
  field: string;
  name: string;
  sortBy: string;
  sortAscDirection: boolean;
  setSort: (field: string) => void;
}

function SortedTableHeader({field, name, sortBy, sortAscDirection, setSort}: SortArrowParams) {
  const isActive = field == sortBy;
  const direction = isActive ? sortAscDirection ? 'asc' : 'desc' : 'asc';

  const style = isActive ? sortAscDirection ? { borderTop: "5px solid #ccc" } : { borderBottom: "5px solid #ccc" } : {}

  return (
    <TableCell
      style={style}
      align="center"
      key={field}
      sortDirection={direction}
    >
      <TableSortLabel
        active={isActive}
        direction={direction}
        onClick={() => setSort(field)}
      >
        {name}
      </TableSortLabel>
    </TableCell>
  );
}

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

export default function Creatures() {
  const [creatures, setCreatures] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('race_name');
  const [sortAscDirection, setSortAcsDirection] = useState<boolean>(true);


  const fetchCreatures = useCallback(async (page: number, sortBy: string, sortAscDirection: boolean) => {
    const sortDirection = sortAscDirection ? 'asc' : 'desc'
    const params = new URLSearchParams({ 
      page: String(page - 1), 
      sort_by: sortBy, 
      sort_direction: sortDirection,
    });
    const response = await fetch(`http://localhost/api/creatures?${params.toString()}`);
    const json = await response.json();
    setCreatures(json.data);
    setPageSize(json.pagination.size);
  }, []);

  useEffect(() => {
    fetchCreatures(page, sortBy, sortAscDirection)
  }, [fetchCreatures, page, sortBy, sortAscDirection]);

  const pageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  }, []);

  const setSort = useCallback((newSortBy: string) => {
    if(newSortBy === sortBy) {
      setSortAcsDirection(!sortAscDirection)
    } else {
      setSortAcsDirection(true)
      setSortBy(newSortBy)
    }
  }, [sortBy, sortAscDirection]);

  const page_count = page + (pageSize > creatures.length ? 0 : 1)

  return (
    <>
      <TablePagination page={page} count={page_count} onChange={pageChange} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sprite</TableCell>
              {SORTABLE_FIELDS.map(({field, name}) => (
                <SortedTableHeader field={field} name={name} sortBy={sortBy} sortAscDirection={sortAscDirection} setSort={setSort} />
              ))}
              <TableCell align="right">Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {creatures.map((creature) => 
              <TableRow
                key={creature.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                <TableCell align="right">{creature.trait.tags.join(' ')}</TableCell>
              </TableRow> 
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}