import React from "react";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearAllIcon from "@mui/icons-material/ClearAll";

interface IFilterButtonsProps {
  hasFilters: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;
  clearFilters: () => void;
}

export default function FilterButtons({
  hasFilters,
  setIsFilterDrawerOpen,
  clearFilters,
}: IFilterButtonsProps) {
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open filters"
        onClick={() => setIsFilterDrawerOpen(true)}
        edge="start"
      >
        <FilterListIcon />
      </IconButton>
      {hasFilters && (
        <IconButton
          color="inherit"
          aria-label="clear filters"
          onClick={() => clearFilters()}
          edge="start"
        >
          <ClearAllIcon />
        </IconButton>
      )}
    </>
  );
}
