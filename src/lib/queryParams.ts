import {
  JsonParam,
  NumberParam,
  QueryParamConfig,
  StringParam,
  withDefault,
} from "use-query-params";
import { TAllFilters } from "../components/filters/types";

export type TSortDirection = "asc" | "desc";

export interface IQueryParams<IFilter extends TAllFilters> {
  page: number;
  size: number;
  sort_by: string;
  sort_direction: string;
  q: string;
  filters: IFilter[];
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
  query: IQueryParams<IFilter>,
  setQuery: (query: IQueryParams<IFilter>) => void
) {
  const pageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setQuery({ ...query, page: newPage });
  };

  const sizeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuery({ ...query, size: parseInt(event.target.value), page: 0 });
  };

  const reduceSort = (sort: ISortAction) => {
    setQuery({ ...query, ...sort });
  };

  const qChange = (newQ: string) => {
    setQuery({ ...query, page: 0, q: newQ });
  };

  const updateFilter = (index: number, filter: IFilter) => {
    const { filters } = query;
    const newFilters = [...filters];
    newFilters[index] = filter;
    setQuery({ ...query, page: 0, filters: newFilters });
  };

  const addFilter = (filter: IFilter) => {
    const { filters } = query;
    const newFilters = [...filters];
    newFilters.push(filter);
    setQuery({ ...query, page: 0, filters: newFilters });
  };

  const removeFilter = (index: number) => {
    const { filters } = query;
    const newFilters = [
      ...filters.slice(0, index),
      ...filters.slice(index + 1, filters.length),
    ];
    setQuery({ ...query, page: 0, filters: newFilters });
  };

  const clearFilters = () => {
    setQuery({ ...query, page: 0, filters: [] });
  };

  return {
    pageChange,
    sizeChange,
    reduceSort,
    qChange,
    updateFilter,
    addFilter,
    removeFilter,
    clearFilters,
  };
}

// https://stackoverflow.com/a/37682352
// default class params with simple use new C() or new C({}) or new C({size: 10})
export class QueryParamStructure<IFilter extends TAllFilters> {
  page: QueryParamConfig<number> = withDefault(NumberParam, 0);
  size: QueryParamConfig<number> = withDefault(NumberParam, 25);
  sort_by: QueryParamConfig<string> = withDefault(StringParam, "name");
  sort_direction: QueryParamConfig<string> = withDefault(StringParam, "asc");
  q: QueryParamConfig<string> = withDefault(StringParam, "");
  filters: QueryParamConfig<IFilter[]> = withDefault(JsonParam, []);

  constructor(params?: Partial<QueryParamStructure<IFilter>>) {
    Object.assign(this, params);
  }

  toConfigMap() {
    const { page, size, sort_by, sort_direction, q, filters } = this;
    return { page, size, sort_by, sort_direction, q, filters };
  }
}
