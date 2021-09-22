type TSortDirection = 'asc' | 'desc';

export interface ISort {
  by: string;
  direction: TSortDirection;
}

export interface ISortAction {
  by?: string;
  direction?: TSortDirection;
}

export default function sortReducer(state: ISort, action: ISortAction): ISort {
  return { ...state, ...action };
}