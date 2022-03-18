import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

/**
 * It returns a table component that can be used in a React application.
 * @returns The `useTable` function returns an object with three properties: `TblContainer`, `TblHead`,
 * and `TblPagination`.
 */
function useTable(data, columns, filterFunction) {
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => <Table>{props.children}</Table>;

  /**
   * It creates the table head for the table.
   * @returns The TableHead component is being returned.
   */
  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell
              key={column.id}
              sortDirection={orderBy === column.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={() => {
                  handleSortRequest(column.id);
                }}
              >
                {column.name}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  /**
   * It sets the number of rows per page and the page number to 0.
   */
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  /* A function that returns a table pagination component. */
  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={data.employe.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  /**
   * Stable sort an array using a comparator function
   * @returns The original array, sorted by the comparator.
   */
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  /**
   * Given an order and orderBy, return a function that can be used to compare two objects
   * @returns A function that takes in two values and returns a negative or positive value depending on
   * the order.
   */
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  /**
   * *This function is used to sort the data in descending order.*
   * @returns The function is being returned.
   */
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  /**
   * * Filter the data based on the filter function.
   * * Sort the data based on the order and orderBy.
   * * Slice the data based on the page and rowsPerPage
   * @returns The data after paging and sorting.
   */

  const dataAfterPagingAndSorting = () => {
    return stableSort(
      filterFunction.fn(data.employe),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    dataAfterPagingAndSorting,
  };
}

export default useTable;
