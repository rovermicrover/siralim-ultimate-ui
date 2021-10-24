import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";

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
  icon?: string | OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export type ISearchSchema =
  | ICreaturesSearchSchema
  | IStatusEffectsSearchSchema
  | IRacesSearchSchema
  | ISpellsSearchSchema
  | IPerksSearchSchema
  | ITraitsSearchSchema;
export type TAllFilters = ISearchSchema["filter"]["filters"][number];
