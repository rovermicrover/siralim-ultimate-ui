import React, { useEffect, useState, useMemo } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import { useDebounce } from "use-debounce";

import { IField, TAllFilters } from "./types";

import {
  NumericFilterComparators,
  StringFilterComparators,
} from "../../lib/openAPI";
import { buildSearch } from "../../lib/search";

const STRING_COMPARITORS: StringFilterComparators[] = [
  "ilike",
  "==",
  "!=",
  "is_not_null",
  "is_null",
];
const BOOL_COMPARITORS: StringFilterComparators[] = [
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
  boolean: BOOL_COMPARITORS,
  number: NUMBER_COMPARITORS,
};

export default function FilterInput<IFilter extends TAllFilters>({
  filter,
  index,
  updateFilter,
  removeFilter,
  fields,
}: {
  filter: IFilter;
  index: number;
  updateFilter: (index: number, filter: IFilter) => void;
  removeFilter: (index: number) => void;
  fields: Record<string, IField>;
}) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filterValueDebounced] = useDebounce(filter.value, 200);

  const fieldType = fields[filter.field].type;
  const fieldResource = fields[filter.field].resource;
  const comparitors = TYPE_TO_COMPARITORS[fieldType];
  const handleFieldChange = (e: SelectChangeEvent<string>) => {
    const newField = e.target.value;
    const newValue =
      fields[newField].type === "number"
        ? 1
        : fields[newField].type === "boolean"
        ? true
        : "";
    const newComparator =
      fields[newField].type === "number"
        ? ">="
        : fields[newField].type === "boolean"
        ? "=="
        : "ilike";
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

  const handleValueChange = (value: string | boolean | number | null) => {
    const targetValue = value ? String(value) : "";
    const newValue =
      fields[filter.field].type === "number"
        ? parseInt(targetValue)
        : fields[filter.field].type === "boolean"
        ? Boolean(targetValue)
        : `${targetValue}`;
    updateFilter(index, { ...filter, value: newValue } as IFilter);
  };

  const fetchResource = useMemo(
    () => buildSearch<any>(fieldResource || "creatures"),
    [fieldResource]
  );

  useEffect(() => {
    if (filterValueDebounced && fieldResource) {
      const getTypeAhead = async () => {
        const suggestionsFilter = {
          field: "name",
          comparator: "ilike",
          value: String(filterValueDebounced),
        } as IFilter;
        const response: any = await fetchResource({
          q: "",
          size: 10,
          page: 0,
          filters: [suggestionsFilter],
          sort_by: "name",
          sort_direction: "asc",
        });
        const newSuggestions = (response?.data || [])
          .map(({ name }: { name: any }) => String(name))
          .filter((name: string) => name);
        setSuggestions(newSuggestions);
      };

      getTypeAhead();
    } else {
      setSuggestions([]);
    }
  }, [filterValueDebounced, fieldResource, fetchResource]);

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
                {Object.entries(fields).map(([key, field], i) => (
                  <MenuItem key={i} value={key}>
                    {field.label}
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
            {fieldResource ? (
              <Autocomplete
                freeSolo
                options={suggestions}
                filterOptions={(x) => x}
                onChange={(e, value) => handleValueChange(value)}
                onInputChange={(e, value) => handleValueChange(value)}
                value={filter.value}
                renderInput={(params) => (
                  <TextField
                    variant="standard"
                    label="Value"
                    type={fieldType}
                    {...params}
                  />
                )}
              />
            ) : fieldType === "boolean" ? (
              <Checkbox
                checked={Boolean(filter.value)}
                onChange={(e) => handleValueChange(e.target.checked)}
              />
            ) : (
              <TextField
                fullWidth
                variant="standard"
                label="Value"
                value={filter.value}
                type={fieldType}
                onChange={(e) => handleValueChange(e.target.value)}
              />
            )}
          </Grid>
        </Grid>
      </FormGroup>
    </Paper>
  );
}
