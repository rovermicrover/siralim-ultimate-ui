import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQueryParams } from "use-query-params";
import {
  buildQueryParamsMutators,
  QueryParamStructure,
} from "../lib/queryParams";
import { QueryResponseFn } from "../lib/search";
import { TAllFilters, ISearchSchema } from "../components/filters/types";

// checks to see if the `Type` is a promise wrapping an underlying type.
// if so it returns the underlying type. if not, it returns back the type.
// https://www.benmvp.com/blog/extracting-typescript-types-functions-objects-arrays/
type Unwrapped<Type> = Type extends Promise<infer WrappedType>
  ? WrappedType
  : Type;

export function useQuery<
  IFilter extends TAllFilters,
  IResponse extends ISearchSchema
>(fetcher: QueryResponseFn<IResponse>, params: QueryParamStructure<IFilter>) {
  // extract the IModel and ISearchSchema from the fetcher function
  type PromiseType = ReturnType<typeof fetcher>;
  type ISchemaType = Unwrapped<PromiseType>;
  type IModelType = ISchemaType["data"][number];

  const [results, setResults] = useState<IModelType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(params.toConfigMap());
  const [queryDebounced] = useDebounce(query, 200);

  useEffect(() => {
    fetcher(queryDebounced).then((response: ISchemaType) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setResults(data);
        setCount(count);
      } else {
        // TODO: handle validation error
      }
    });
  }, [queryDebounced, fetcher]);

  const queryMutators = buildQueryParamsMutators<IFilter>(query, setQuery);

  return { results, count, query, queryMutators };
}
