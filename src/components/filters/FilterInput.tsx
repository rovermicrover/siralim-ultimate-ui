import React, { useCallback } from "react";
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

import {
  ICreatureStrFilterSchema,
  ITraitStrFilterSchema,
  IRaceStrFilterSchema,
  ISpellStrFilterSchema,
  IKlassStrFilterSchema,
  IStatusEffectStrFilterSchema,
  ICreatureIntFilterSchema,
  ITraitIntFilterSchema,
  IRaceIntFilterSchema,
  ISpellIntFilterSchema,
  IStatusEffectIntFilterSchema,
  CreatureStrFilterEnum,
  TraitStrFilterEnum,
  RaceStrFilterEnum,
  SpellStrFilterEnum,
  KlassStrFilterEnum,
  StatusEffectStrFilterEnum,
  CreatureIntFilterEnum,
  TraitIntFilterEnum,
  RaceIntFilterEnum,
  SpellIntFilterEnum,
  KlassIntFilterEnum,
  StatusEffectIntFilterEnum,
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

type StrFilterEnum =
  | CreatureStrFilterEnum
  | TraitStrFilterEnum
  | RaceStrFilterEnum
  | SpellStrFilterEnum
  | KlassStrFilterEnum
  | StatusEffectStrFilterEnum
  | CreatureIntFilterEnum
  | TraitIntFilterEnum
  | RaceIntFilterEnum
  | SpellIntFilterEnum
  | KlassIntFilterEnum
  | StatusEffectIntFilterEnum;

export interface IFieldToType {
  [Key: string]: "string" | "number";
}

export default function FilterInput<
  IFilter extends
    | ICreatureStrFilterSchema
    | ITraitStrFilterSchema
    | IRaceStrFilterSchema
    | ISpellStrFilterSchema
    | IKlassStrFilterSchema
    | IStatusEffectStrFilterSchema
    | ICreatureIntFilterSchema
    | ITraitIntFilterSchema
    | IRaceIntFilterSchema
    | ISpellIntFilterSchema
    | IStatusEffectIntFilterSchema
>({
  filter,
  index,
  updateFilter,
  removeFilter,
  fieldsToType,
}: {
  filter: IFilter;
  index: number;
  updateFilter: (index: number, filter: IFilter) => void;
  removeFilter: (index: number) => void;
  fieldsToType: IFieldToType;
}) {
  const fields = Object.keys(fieldsToType);
  const fieldType = fieldsToType[filter.field];
  const comparitors = TYPE_TO_COMPARITORS[fieldType];
  const handleFieldChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      const newField = e.target.value;
      const newValue = fieldsToType[newField] === "number" ? 1 : "";
      updateFilter(index, {
        ...filter,
        field: e.target.value,
        comparator: "==",
        value: newValue,
      } as IFilter);
    },
    [index, filter, fieldsToType]
  );

  const handleComparitorChange = useCallback(
    (e: SelectChangeEvent<string>) => {
      updateFilter(index, { ...filter, comparator: e.target.value } as IFilter);
    },
    [index, filter]
  );

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = e.target.value;
      const newValue =
        fieldsToType[targetValue] === "number"
          ? parseInt(targetValue)
          : `${targetValue}`;
      updateFilter(index, { ...filter, value: newValue } as IFilter);
    },
    [index, filter]
  );

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
                    {field}
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
