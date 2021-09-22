export interface IPagination {
  page: number;
  size: number;
  count: number;
}

export interface IPaginationAction {
  page?: number;
  size?: number;
  count?: number;
}

export default function paginationReducer(state: IPagination, action: IPaginationAction): IPagination {
  return { ...state, ...action };
}