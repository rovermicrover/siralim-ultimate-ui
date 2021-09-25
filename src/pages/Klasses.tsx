import React, { useCallback, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import {
  useQueryParams,
  StringParam,
  NumberParam,
  withDefault,
} from "use-query-params";
import { ISortAction } from "../lib/queryParams";
import SortedTableHeader from "../components/SortedTableHeader";
import { IKlassModel, IKlassesSearchSchema } from "../lib/openAPI";
import { buildSearch } from "../lib/search";

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 5),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
};

const fetchKlasses = buildSearch<IKlassesSearchSchema>("classes");

export default function Klasses() {
  const [klasses, setKlasses] = useState<IKlassModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchKlasses(query).then(
      ({ data, pagination: { count } }: IKlassesSearchSchema) => {
        setKlasses(data);
        setCount(count);
      }
    );
  }, [query]);

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

  return (
    <TableContainer style={{ maxHeight: "100%" }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TablePagination
              count={count}
              page={query.page}
              onPageChange={pageChange}
              rowsPerPage={query.size}
              onRowsPerPageChange={sizeChange}
              rowsPerPageOptions={[5]}
            />
          </TableRow>
          <TableRow>
            <SortedTableHeader
              field={"name"}
              name={"Name"}
              sort={query}
              reduceSort={reduceSort}
            />
            <TableCell align="center">Icon</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {klasses.map((klass) => (
            <TableRow key={klass.id}>
              <TableCell>{klass.name}</TableCell>
              <TableCell align="center">
                <img src={klass.icon} alt={`Klass Icon ${klass.name}`} />
              </TableCell>
              <TableCell align="right">{klass.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}
              count={count}
              page={query.page}
              onPageChange={pageChange}
              rowsPerPage={query.size}
              onRowsPerPageChange={sizeChange}
              rowsPerPageOptions={[5]}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
