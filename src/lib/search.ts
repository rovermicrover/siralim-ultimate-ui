import { IQueryParams } from '../lib/queryParams';


export function buildSearch<IResponse>(path: string) {
  return async function({ page, size, sort_by, sort_direction }: IQueryParams): Promise<IResponse> {
    const body = { 
      pagination: { page, size }, 
      sorting: { by: sort_by, direction: sort_direction },
      filter: { filters: []},
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return (await response.json()) as IResponse;
  }
}