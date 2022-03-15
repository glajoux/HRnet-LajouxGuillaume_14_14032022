import React from "react";
import {
  Table,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";

function useTable(data, columns, filterFunction) {
  const TblContainer = (props) => {
    return <Table>{props.children}</Table>;
  };

  const TblHead = (props) => {
    return (
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id}>{column.name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return {
    TblContainer,
    TblHead,
  };
}

export default useTable;
