import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";

import {
  useQueryParams,
  StringParam,
  NumberParam,
  JsonParam,
  withDefault,
} from "use-query-params";
import { buildQueryParamsMutators } from "../lib/queryParams";
import SortedTableHeader from "../components/SortedTableHeader";
import { IKlassModel, IKlassesSearchSchema } from "../lib/openAPI";
import { buildSearch } from "../lib/search";

const queryParamsStructure = {
  page: withDefault(NumberParam, 0),
  size: withDefault(NumberParam, 5),
  sort_by: withDefault(StringParam, "name"),
  sort_direction: withDefault(StringParam, "asc"),
  q: withDefault(StringParam, ""),
  filters: withDefault(JsonParam, []),
};

const fetchKlasses = buildSearch<IKlassesSearchSchema>("classes");

export default function Klasses() {
  const [klasses, setKlasses] = useState<IKlassModel[]>([]);
  const [count, setCount] = useState<number>(0);
  const [query, setQuery] = useQueryParams(queryParamsStructure);

  useEffect(() => {
    fetchKlasses(query).then((response: IKlassesSearchSchema) => {
      if (response.pagination) {
        const {
          data,
          pagination: { count },
        } = response;
        setKlasses(data);
        setCount(count);
      } else {
        // TODO: handle validation error
      }
    });
  }, [query]);

  const { pageChange, sizeChange, reduceSort } = buildQueryParamsMutators(
    query,
    setQuery
  );

  return (
    <TableContainer sx={{ maxHeight: "100%" }} component={Paper}>
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
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {klasses.map((klass) => (
            <TableRow key={klass.id}>
              <TableCell>
                <img
                  src={klass.icon}
                  width="32"
                  alt={`Klass Icon ${klass.name}`}
                  aria-hidden="true"
                />
                <Typography variant="subtitle2" gutterBottom component="div">
                  {klass.name}
                </Typography>
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
