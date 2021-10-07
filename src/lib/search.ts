import { IQueryParams } from "../lib/queryParams";
import { TAllFilters } from "../components/filters/types";

const COMPARATOR_LIKES = ["like", "ilike"];

export function buildSearch<IResponse, IFilter extends TAllFilters>(
  path: string
) {
  return async function ({
    page,
    size,
    sort_by,
    sort_direction,
    q,
    filters,
  }: IQueryParams<IFilter>): Promise<IResponse> {
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
