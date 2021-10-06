import {
  ICreatureStrFilterSchema,
  ITraitStrFilterSchema,
  IRaceStrFilterSchema,
  ISpellStrFilterSchema,
  IKlassStrFilterSchema,
  IStatusEffectStrFilterSchema,
  IPerkStrFilterSchema,
  ICreatureIntFilterSchema,
  ITraitIntFilterSchema,
  IRaceIntFilterSchema,
  ISpellIntFilterSchema,
  IStatusEffectIntFilterSchema,
  IPerkIntFilterSchema,
  IPerkBoolFilterSchema,
} from "../../lib/openAPI";

export interface IField {
  type: "string" | "boolean" | "number";
  label: string;
  abbr?: string;
  resource?: string;
}

export type TAllFilters =
  | ICreatureStrFilterSchema
  | ITraitStrFilterSchema
  | IRaceStrFilterSchema
  | ISpellStrFilterSchema
  | IKlassStrFilterSchema
  | IStatusEffectStrFilterSchema
  | IPerkStrFilterSchema
  | ICreatureIntFilterSchema
  | ITraitIntFilterSchema
  | IRaceIntFilterSchema
  | ISpellIntFilterSchema
  | IStatusEffectIntFilterSchema
  | IPerkIntFilterSchema
  | IPerkBoolFilterSchema;
