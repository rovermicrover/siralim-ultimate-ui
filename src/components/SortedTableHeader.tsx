/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/react";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

import { ISort, ISortAction, TSortDirection } from "../lib/queryParams";

interface ISortedTableHeaderProps {
  field: string;
  name: string;
  icon?: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  sort: ISort;
  reduceSort: (sortAction: ISortAction) => void;
  align?: "center" | "left" | "right" | "justify" | "inherit" | undefined;
}

function setSort(
  reduceSort: (sortAction: ISortAction) => void,
  sort: ISort,
  newSortBy: string
) {
  if (newSortBy === sort.sort_by) {
    reduceSort({
      sort_direction: sort.sort_direction === "asc" ? "desc" : "asc",
    });
  } else {
    reduceSort({ sort_direction: "asc", sort_by: newSortBy });
  }
}

export default function SortedTableHeader({
  field,
  name,
  icon,
  sort,
  reduceSort,
  align = "left",
}: ISortedTableHeaderProps) {
  const isActive = field === sort.sort_by;
  const direction: TSortDirection = isActive
    ? sort.sort_direction === "asc"
      ? "asc"
      : "desc"
    : "asc";
  const style = isActive
    ? sort.sort_direction === "asc"
      ? { borderTop: "5px solid #ccc" }
      : { borderBottom: "5px solid #ccc" }
    : {};

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
        css={css`
          :hover {
            font-weight: 700;
          }
        `}
      >
        {icon ? (
          typeof icon == "string" ? (
            <img src={icon} alt={name} />
          ) : (
            React.createElement(icon)
          )
        ) : null}
        {name}
      </TableSortLabel>
    </TableCell>
  );
}
