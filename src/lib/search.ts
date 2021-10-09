import { IQueryParams } from "../lib/queryParams";
import { ISearchSchema } from "../components/filters/types";
import { ESearchEndPoints } from "./endpoints";

const COMPARATOR_LIKES = ["like", "ilike"];

export interface QueryResponseFn<IResponse extends ISearchSchema> {
  ({
    page,
    size,
    sort_by,
    sort_direction,
    q,
    filters,
  }: IQueryParams<IResponse["filter"]["filters"][number]>): Promise<IResponse>;
}

export function buildSearch<IResponse extends ISearchSchema>(
  path: ESearchEndPoints
): QueryResponseFn<IResponse> {
  return async function ({ page, size, sort_by, sort_direction, q, filters }) {
    const newFilters = filters.map((f) => {
      const { value, comparator } = f;
      const newValue = COMPARATOR_LIKES.some((c) => c === comparator)
        ? `%${value}%`
        : value;
      return { ...f, value: newValue };
    });

    const allNewFilters = [
      ...newFilters,
      ...(q
        ? [{ value: `%${q}%`, comparator: "ilike", field: "full_text" }]
        : []),
    ];

    const body = {
      pagination: { page, size },
      sorting: { by: sort_by, direction: sort_direction },
      filter: { filters: allNewFilters },
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${path}/search`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    return (await response.json()) as IResponse;
  };
}
