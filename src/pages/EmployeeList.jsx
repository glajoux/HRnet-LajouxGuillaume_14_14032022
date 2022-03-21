import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";
// import TableMui from "../components/table/TableMui";

const TableMui = React.lazy(() => import("../components/table/TableMui"));

/**
 * This function returns a div element with a table inside of it
 * @returns A div with a table and a link to the home page.
 */
function EmployeeList(props) {
  return (
    <div className="table-container">
      <h1>Current Employees</h1>
      <Suspense fallback={<div>Chargement...</div>}>
        <TableMui />
      </Suspense>
      <NavLink to="/">Home</NavLink>
    </div>
  );
}

export default EmployeeList;
