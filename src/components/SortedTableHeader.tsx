/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react'
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';

import { ISort, ISortAction } from '../reducers/sort'

interface ISortedTableHeaderProps {
  field: string;
  name: string;
  sort: ISort;
  reduceSort: (sortAction: ISortAction) => void;
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

function setSort(reduceSort: (sortAction: ISortAction) => void, sort: ISort, newSortBy: string) {
  if(newSortBy === sort.by) {
    reduceSort({direction: sort.direction == 'asc' ? 'desc' : 'asc'});
  } else {
    reduceSort({direction: 'asc', by: newSortBy});
  }
}

export default function SortedTableHeader({field, name, sort, reduceSort, align = "left"}: ISortedTableHeaderProps) {
  const isActive = field == sort.by;
  const direction = isActive ? sort.direction : 'asc';
  const style = isActive ? sort.direction == 'asc' ? { borderTop: "5px solid #ccc" } : { borderBottom: "5px solid #ccc" } : {}

  return (
    <TableCell
      style={style}
      align={align}
      key={field}
      sortDirection={direction}
    >
      <TableSortLabel
        active={isActive}
        direction={direction}
        hideSortIcon={true}
        onClick={() => setSort(reduceSort, sort, field)}
        css={css`:hover { font-weight: 700; }`}
      >
        {name}
      </TableSortLabel>
    </TableCell>
  );
}