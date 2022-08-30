import React from "react";

import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";

import { IField, TAllFilters } from "./types";

import FilterInput from "./FilterInput";

export default function FilterDrawer<IFilter extends TAllFilters>({
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  filters,
  addFilter,
  updateFilter,
  removeFilter,
  clearFilters,
  fields,
}: {
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;
  filters: IFilter[];
  addFilter: (filter: IFilter) => void;
  updateFilter: (index: number, filter: IFilter) => void;
  removeFilter: (index: number) => void;
  clearFilters: () => void;
  fields: Record<string, IField>;
}) {
  return (
    <Drawer
      anchor="right"
      open={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      sx={{
        width: 500,
        maxWidth: "100vw",
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 500,
          maxWidth: "100vw",
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Grid container spacing={2} sx={{ textAlign: "center" }}>
        <Grid item xs={4}>
          <Tooltip title="Add Filter">
            <IconButton
              color="inherit"
              aria-label="add filter"
              onClick={() =>
                addFilter({
                  field: "name",
                  comparator: "ilike",
                  value: "",
                } as IFilter)
              }
            >
              <AddIcon color="success" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Clear Filters">
            <IconButton
              color="inherit"
              aria-label="clear filters"
              onClick={() => clearFilters()}
            >
              <ClearAllIcon color="error" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Close Filters">
            <IconButton
              color="inherit"
              aria-label="close filters"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      {filters.length > 0 && (
        <Paper elevation={1} sx={{ p: 2 }}>
          <Grid container spacing={2}>
            {filters.map((f: IFilter, i: number) => (
              <Grid key={i} item xs={12}>
                <FilterInput<IFilter>
                  filter={f}
                  index={i}
                  updateFilter={updateFilter}
                  removeFilter={removeFilter}
                  fields={fields}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Drawer>
  );
}
