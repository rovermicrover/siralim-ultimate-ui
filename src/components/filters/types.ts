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

export interface IFieldToType {
  [Key: string]: "string" | "number";
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
