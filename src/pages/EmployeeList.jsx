import React from "react";
import { NavLink } from "react-router-dom";
import TableMui from "../components/table/TableMui";

function EmployeeList(props) {
  return (
    <div className="container">
      <h1>Current Employees</h1>
      <TableMui />
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default EmployeeList;
