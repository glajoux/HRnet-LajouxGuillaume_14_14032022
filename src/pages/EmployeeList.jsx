import React from "react";
import { NavLink } from "react-router-dom";

function EmployeeList(props) {
  return (
    <div className="container">
      <h1>Current Employees</h1>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default EmployeeList;
