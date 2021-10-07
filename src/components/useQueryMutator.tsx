import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";
import { useQueryParams } from "use-query-params";
import {DecodedValueMap, QueryParamConfigMap } from 'serialize-query-params';
import { buildQueryParamsMutators, IQueryParams } from "../lib/queryParams";
import { ICreatureIntFilterSchema, ICreatureModel, ICreaturesSearchSchema, ICreatureStrFilterSchema } from "../lib/openAPI";
import FilterDrawer from "./filters/FilterDrawer";
import FilterButtons from "./filters/FilterButtons";
import SearchInput from "./SearchInput";
import { TablePagination } from "@mui/material";
import { IField } from "./filters/types";


// Returning a component from a hook to reduce repetitive code
// https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh

export default function useQueryParamMutator(QPCMap, filterFields: Record<string, IField>, fetcher: (arg0: IQueryParams) => Promise<any>) {
    const [results, setResults] = useState<ICreatureModel[]>([]);
    const [count, setCount] = useState<number>(0);
  
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
    const [query, setQuery] = useQueryParams(QPCMap);
    const [queryDebounced] = useDebounce(query, 200);

    useEffect(() => {
        fetcher(queryDebounced).then((response: ICreaturesSearchSchema) => {
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
      }, [queryDebounced]);

      const filterProps = buildQueryParamsMutators<
        ICreatureStrFilterSchema | ICreatureIntFilterSchema
      >(query, setQuery);

      const filterButtonsProps = {
        hasFilters: query.filters.length ? true : false,
        setIsFilterDrawerOpen: setIsFilterDrawerOpen,
        clearFilters: filterProps.clearFilters,
      };

      const searchInputProps = {
        q: query.q,
        qChange: filterProps.qChange,
      }

      const filterDrawerProps = {
          ...filterProps,
          isFilterDrawerOpen,
          filters: query.filters,
          fields: filterFields,
          setIsFilterDrawerOpen,
      }

      const tablePaginationProps = {
            role: "presentation",
            count: count,
            page: query.page,
            labelRowsPerPage: "Num: ",
            onPageChange: filterProps.pageChange,
            rowsPerPage: query.size,
            onRowsPerPageChange: filterProps.sizeChange,
      };


      return {results, query, filterButtonProps: filterButtonsProps, FilterButtons, filterProps, filterDrawerProps,FilterDrawer,
        searchProps: searchInputProps, SearchInput, tablePaginationProps, TablePagination
    };
    
}