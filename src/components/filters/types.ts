import {
  ICreaturesSearchSchema,
  IRacesSearchSchema,
  ISpellsSearchSchema,
  IPerksSearchSchema,
  IStatusEffectsSearchSchema,
  ITraitsSearchSchema,
} from "../../lib/openAPI";

import { ESearchEndPoints } from "../../lib/endpoints";

export interface IField {
  type: "string" | "boolean" | "number" | "string_array";
  label: string;
  abbr?: string;
  resource?: ESearchEndPoints;
}

export type ISearchSchema =
  | ICreaturesSearchSchema
  | IStatusEffectsSearchSchema
  | IRacesSearchSchema
  | ISpellsSearchSchema
  | IPerksSearchSchema
  | ITraitsSearchSchema;
export type TAllFilters = ISearchSchema["filter"]["filters"][number];
