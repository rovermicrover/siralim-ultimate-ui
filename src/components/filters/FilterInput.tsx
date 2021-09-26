import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { IFieldToType, TAllFilters } from "./types";

import {
  NumericFilterComparators,
  StringFilterComparators,
} from "../../lib/openAPI";

const STRING_COMPARITORS: StringFilterComparators[] = [
  "ilike",
  "==",
  "!=",
  "is_not_null",
  "is_null",
];
const NUMBER_COMPARITORS: NumericFilterComparators[] = [
  "==",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "is_not_null",
  "is_null",
];

const COMPARITOR_TO_LABELS = {
  ilike: "Contains",
  like: "Case Sensitive Contains",
  "==": "Equals",
  "!=": "Does Not Equals",
  is_null: "Does Not Exist",
  is_not_null: "Exists",
  ">": ">",
  ">=": ">=",
  "<": "<",
  "<=": "<=",
};

const TYPE_TO_COMPARITORS = {
  string: STRING_COMPARITORS,
  number: NUMBER_COMPARITORS,
};

export default function FilterInput<IFilter extends TAllFilters>({
  filter,
  index,
  updateFilter,
  removeFilter,
  fieldsToType,
  fieldsToLabel,
}: {
  filter: IFilter;
  index: number;
  updateFilter: (index: number, filter: IFilter) => void;
  removeFilter: (index: number) => void;
  fieldsToType: IFieldToType;
  fieldsToLabel: Record<string, string>;
}) {
  const fields = Object.keys(fieldsToType);
  const fieldType = fieldsToType[filter.field];
  const comparitors = TYPE_TO_COMPARITORS[fieldType];
  const handleFieldChange = (e: SelectChangeEvent<string>) => {
    const newField = e.target.value;
    const newValue = fieldsToType[newField] === "number" ? 1 : "";
    const newComparator = fieldsToType[newField] === "number" ? ">=" : "==";
    updateFilter(index, {
      ...filter,
      field: e.target.value,
      comparator: newComparator,
      value: newValue,
    } as IFilter);
  };

  const handleComparitorChange = (e: SelectChangeEvent<string>) => {
    updateFilter(index, { ...filter, comparator: e.target.value } as IFilter);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    const newValue =
      fieldsToType[targetValue] === "number"
        ? parseInt(targetValue)
        : `${targetValue}`;
    updateFilter(index, { ...filter, value: newValue } as IFilter);
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={2} sm={1}>
            <IconButton
              color="inherit"
              aria-label="open filters"
              onClick={() => removeFilter(index)}
              edge="start"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={10} sm={4}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Field</InputLabel>
              <Select
                value={filter.field}
                label="Field"
                onChange={handleFieldChange}
              >
                {fields.map((field, i) => (
                  <MenuItem key={i} value={field}>
                    {fieldsToLabel[field]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel>Comparitor</InputLabel>
              <Select
                value={filter.comparator}
                label="Comparitor"
                onChange={handleComparitorChange}
              >
                {comparitors.map((f) => (
                  <MenuItem key={f} value={f}>
                    {COMPARITOR_TO_LABELS[f]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="standard"
              label="Value"
              value={filter.value}
              type={fieldType}
              onChange={handleValueChange}
            />
          </Grid>
        </Grid>
      </FormGroup>
    </Paper>
  );
}
