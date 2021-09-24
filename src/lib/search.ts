import { IQueryParams } from '../lib/queryParams';

export function buildSearch<IRequest, IResponse>(path: str): IResponse {
  return async function({ page, size, sort_by, sort_direction }: IQueryParams) {
    const body: IRequest = { 
      pagination: { page, size }, 
      sorting: { by: sort_by, direction: sort_direction },
      filter: { filters: []},
    } as IRequest;
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return (await response.json()) as IResponse;
  }
}