import React from "react";
import { NavLink } from "react-router-dom";
import TableMui from "../components/table/TableMui";

/**
 * This function returns a div element with a table inside of it
 * @returns A div with a table and a link to the home page.
 */
function EmployeeList(props) {
  return (
    <div className="table-container">
      <h1>Current Employees</h1>
      <TableMui />
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default EmployeeList;
