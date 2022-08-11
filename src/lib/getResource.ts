import { ESearchEndPoints } from "./endpoints";
import {
  ICreaturesGetSchema,
  IKlassesGetSchema,
  IPerksGetSchema,
  IRacesGetSchema,
  ISourcesGetSchema,
  ISpecializationsGetSchema,
  ISpellsGetSchema,
  IStatusEffectsGetSchema,
  ITraitsGetSchema,
} from "./openAPI";

export type IGetSchema =
  | ICreaturesGetSchema
  | IKlassesGetSchema
  | IPerksGetSchema
  | IRacesGetSchema
  | ISourcesGetSchema
  | ISpecializationsGetSchema
  | ISpellsGetSchema
  | IStatusEffectsGetSchema
  | ITraitsGetSchema;

export interface GetResourceResponseFn<IResponse extends IGetSchema> {
  (id: string): Promise<IResponse>;
}

export function buildGetResource<IResponse extends IGetSchema>(
  path: ESearchEndPoints
): GetResourceResponseFn<IResponse> {
  return async function (id) {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${path}/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    return (await response.json()) as IResponse;
  };
}
