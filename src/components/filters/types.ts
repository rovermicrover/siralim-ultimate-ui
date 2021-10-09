import {
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

export type ISearchSchema =
  ICreaturesSearchSchema | IStatusEffectsSearchSchema | IRacesSearchSchema | ISpellsSearchSchema | IPerksSearchSchema | ITraitsSearchSchema
export type TAllFilters = ISearchSchema['filter']['filters'][number];
