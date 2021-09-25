import { IQueryParams } from "../lib/queryParams";

const COMPARATOR_LIKES = ["like", "ilike"];

export function buildSearch<IResponse>(path: string) {
  return async function ({
    page,
    size,
    sort_by,
    sort_direction,
    filters,
  }: IQueryParams): Promise<IResponse> {
    const newFilters = filters.map((f) => {
      const { value, comparator } = f;
      const newValue = COMPARATOR_LIKES.some((c) => c === comparator)
        ? `%${value}%`
        : value;
      return { ...f, value: newValue };
    });
    const body = {
      pagination: { page, size },
      sorting: { by: sort_by, direction: sort_direction },
      filter: { filters: newFilters },
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
