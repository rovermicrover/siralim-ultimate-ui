import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IGetSchema, GetResourceResponseFn } from "./getResource";

// checks to see if the `Type` is a promise wrapping an underlying type.
// if so it returns the underlying type. if not, it returns back the type.
// https://www.benmvp.com/blog/extracting-typescript-types-functions-objects-arrays/
type Unwrapped<Type> = Type extends Promise<infer WrappedType>
  ? WrappedType
  : Type;

export function useResource<IResponse extends IGetSchema>(
  fetcher: GetResourceResponseFn<IResponse>
) {
  // extract the IModel and ISearchSchema from the fetcher function
  type PromiseType = ReturnType<typeof fetcher>;
  type ISchemaType = Unwrapped<PromiseType>;
  type IModelType = ISchemaType["data"];

  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<IModelType>();

  useEffect(() => {
    fetcher(id).then((response: ISchemaType) => {
      if (response.data) {
        const { data } = response;
        setResult(data);
      } else {
        // TODO: handle validation error
      }
    });
  }, [id, fetcher]);

  return { result };
}
