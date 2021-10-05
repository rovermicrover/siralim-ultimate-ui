import { TablePagination } from "@mui/material";

const TablePaginationGeneric = ({ count, query, pageChange, sizeChange }) => {
  return (
    <TablePagination
      role="presentation"
      count={count}
      page={query.page}
      labelRowsPerPage="Num: "
      onPageChange={pageChange}
      rowsPerPage={query.size}
      onRowsPerPageChange={sizeChange}
    />
  );
};

export default TablePaginationGeneric;
