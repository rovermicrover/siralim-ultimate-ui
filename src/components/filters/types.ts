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
  ICreaturesSearchSchema,
  IRacesSearchSchema,
  ISpellsSearchSchema,
  IPerksSearchSchema,
  IStatusEffectsSearchSchema,
  ITraitsSearchSchema,
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

  export type ISearchSchema =
ICreaturesSearchSchema | IStatusEffectsSearchSchema | IRacesSearchSchema | ISpellsSearchSchema | IPerksSearchSchema | ITraitsSearchSchema
