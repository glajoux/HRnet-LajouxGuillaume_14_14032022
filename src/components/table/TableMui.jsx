import React, { Suspence } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import useTable from "./useTable";
import { columns } from "../../utils/columns";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectEmployee } from "../../redux/selectors/selectors";
import { format } from "date-fns";

/**
 * This function is used to create a table with the data from the redux store
 * @returns The TableMui component is returning the following:
 */
function TableMui() {
  const dataState = useSelector(selectEmployee);

  /* This is a state hook that is used to filter the data. The state is set to an empty object and the
function is set to an empty function. */
  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, dataAfterPagingAndSorting } =
    useTable(dataState, columns, filterFunction);

  /**
   * It takes in a value from the search bar and filters the list of employees based on the value.
   */
  const handleChange = (e) => {
    let target = e.target;
    setFilterFunction({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter(
            (word) =>
              word.firstName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              word.lastName
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              word.startDate.toString().includes(target.value) ||
              word.department
                .toLowerCase()
                .includes(target.value.toLowerCase()) ||
              word.dateOfBirth.toString().includes(target.value) ||
              word.street.toLowerCase().includes(target.value.toLowerCase()) ||
              word.city.toLowerCase().includes(target.value.toLowerCase()) ||
              word.state.toLowerCase().includes(target.value.toLowerCase()) ||
              word.zipCode.includes(target.value)
          );
        }
      },
    });
  };

  return (
    <>
      <Toolbar>
        <TextField
          className="inputSearch"
          name="search"
          label="Search"
          onChange={handleChange}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
          {dataAfterPagingAndSorting().map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>
                {employee.startDate
                  ? format(new Date(employee.startDate), "dd/MM/yyy")
                  : ""}
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                {employee.dateOfBirth
                  ? format(new Date(employee.dateOfBirth), "dd/MM/yyy")
                  : ""}
              </TableCell>
              <TableCell>{employee.street}</TableCell>
              <TableCell>{employee.city}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell>{employee.zipCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default TableMui;
