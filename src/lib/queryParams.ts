export type TSortDirection = 'asc' | 'desc';

export interface IQueryParams {
  page: number;
  size: number;
  sort_by: string;
  sort_direction: string
}

export interface ISort {
  sort_by: string;
  sort_direction: string;
}

export interface ISortAction {
  sort_by?: string;
  sort_direction?: string;
}