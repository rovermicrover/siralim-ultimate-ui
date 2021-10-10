import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
      <Tooltip title="Filter">
        <IconButton
          color="inherit"
          aria-label="open filters"
          onClick={() => setIsFilterDrawerOpen(true)}
          edge="start"
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {hasFilters && (
        <Tooltip title="Clear Filters">
          <IconButton
            color="inherit"
            aria-label="clear filters"
            onClick={() => clearFilters()}
            edge="start"
          >
            <ClearAllIcon color="error" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
