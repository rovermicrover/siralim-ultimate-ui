import { useCallback } from "react";
import { TAllFilters } from "../components/filters/types";

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
} from "./openAPI";

export type TSortDirection = "asc" | "desc";

type IFilters =
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

export interface IQueryParams {
  page: number;
  size: number;
  sort_by: string;
  sort_direction: string;
  filters: IFilters[];
}

export interface ISort {
  sort_by: string;
  sort_direction: string;
}

export interface ISortAction {
  sort_by?: string;
  sort_direction?: string;
}

export function buildQueryParamsMutators<IFilter extends TAllFilters>(
  query: IQueryParams,
  setQuery: (query: IQueryParams) => void
) {
  const pageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setQuery({ ...query, page: newPage });
    },
    [query]
  );

  const sizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery({ ...query, size: parseInt(event.target.value), page: 0 });
    },
    [query]
  );

  const reduceSort = useCallback(
    (sort: ISortAction) => {
      setQuery({ ...query, ...sort });
    },
    [query]
  );

  const updateFilter = useCallback(
    (
      index: number,
      filter: IFilter
    ) => {
      const { filters } = query;
      const newFilters = [...filters];
      newFilters[index] = filter;
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const addFilter = useCallback(
    (filter: IFilter) => {
      const { filters } = query;
      const newFilters = [...filters];
      newFilters.push(filter);
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const removeFilter = useCallback(
    (index: number) => {
      const { filters } = query;
      const newFilters = [
        ...filters.slice(0, index),
        ...filters.slice(index + 1, filters.length),
      ];
      setQuery({ ...query, filters: newFilters });
    },
    [query]
  );

  const clearFilters = useCallback(() => {
    setQuery({ ...query, filters: [] });
  }, [query]);

  return {
    pageChange,
    sizeChange,
    reduceSort,
    updateFilter,
    addFilter,
    removeFilter,
    clearFilters,
  };
}
