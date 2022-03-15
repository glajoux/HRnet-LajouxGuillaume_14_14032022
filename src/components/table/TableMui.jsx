import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import useTable from "./useTable";
import { columns } from "../../utils/columns";
import { useSelector } from "react-redux";
import { selectEmployee } from "../../redux/selectors/selectors";

function TableMui(props) {
  const dataState = useSelector(selectEmployee);
  console.log(dataState.employe);

  const { TblContainer, TblHead } = useTable(dataState, columns);

  return (
    <div className="tableau">
      <TblContainer>
        <TblHead />
        <TableBody>
          {dataState.employe.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.dateOfBirth}</TableCell>
              <TableCell>{employee.startDate}</TableCell>
              <TableCell>{employee.street}</TableCell>
              <TableCell>{employee.city}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell>{employee.zipCode}</TableCell>
              <TableCell>{employee.department}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
    </div>
  );
}

export default TableMui;
