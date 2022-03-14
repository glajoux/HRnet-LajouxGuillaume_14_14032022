import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Table from "../components/table/Table";
import { selectEmployee } from "../redux/selectors/selectors";

function EmployeeList(props) {
  const state = useSelector(selectEmployee);
  console.log(state);
  return (
    <div className="container">
      <h1>Current Employees</h1>
      <Table data={state.employe} />
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default EmployeeList;
