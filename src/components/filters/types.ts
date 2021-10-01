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
} from "../../lib/openAPI";

export type StrFilterEnum =
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

  export interface IField {
    type: "string" | "number";
    label: string;
    abbr?: string;
  }

export type TAllFilters =
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
  | IStatusEffectIntFilterSchema;
