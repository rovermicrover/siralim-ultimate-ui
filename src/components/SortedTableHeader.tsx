import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { ISort, ISortAction } from '../reducers/sort'

interface ISortedTableHeaderProps {
  field: string;
  name: string;
  sort: ISort;
  reduceSort: (sortAction: ISortAction) => void;
}

function setSort(reduceSort: (sortAction: ISortAction) => void, sort: ISort, newSortBy: string) {
  if(newSortBy === sort.by) {
    reduceSort({direction: sort.direction == 'asc' ? 'desc' : 'asc'});
  } else {
    reduceSort({direction: 'asc', by: newSortBy});
  }
}

export default function SortedTableHeader({field, name, sort, reduceSort}: ISortedTableHeaderProps) {
  const isActive = field == sort.by;
  const direction = isActive ? sort.direction : 'asc';
  const style = isActive ? sort.direction == 'asc' ? { borderTop: "5px solid #ccc" } : { borderBottom: "5px solid #ccc" } : {}

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
        onClick={() => setSort(reduceSort, sort, field)}
      >
        {name}
      </TableSortLabel>
    </TableCell>
  );
}