import React from "react";

import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Paper from "@mui/material/Paper";

import { IFieldToType, TAllFilters } from "./types";

import FilterInput from "./FilterInput";

export default function FilterDrawer<IFilter extends TAllFilters>({
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  filters,
  addFilter,
  updateFilter,
  removeFilter,
  clearFilters,
  fieldsToType,
  fieldsToLabel,
}: {
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (isFilterDrawerOpen: boolean) => void;
  filters: IFilter[];
  addFilter: (filter: IFilter) => void;
  updateFilter: (index: number, filter: IFilter) => void;
  removeFilter: (index: number) => void;
  clearFilters: () => void;
  fieldsToType: IFieldToType;
  fieldsToLabel: Record<string, string>;
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
          <IconButton
            color="inherit"
            aria-label="add filters"
            onClick={() =>
              addFilter({
                field: "name",
                comparator: "ilike",
                value: "",
              } as IFilter)
            }
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="inherit"
            aria-label="clear filters"
            onClick={() => clearFilters()}
          >
            <ClearAllIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            color="inherit"
            aria-label="close filters"
            onClick={() => setIsFilterDrawerOpen(false)}
          >
            <HighlightOffIcon />
          </IconButton>
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
                  fieldsToType={fieldsToType}
                  fieldsToLabel={fieldsToLabel}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Drawer>
  );
}
