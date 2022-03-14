import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { columns } from "../../utils/columns";
import "./styles.css";

function Table({ data }) {
  const dataTable = {
    columns,
    data,
  };
  return (
    <div className="main">
      <DataTableExtensions {...dataTable}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          striped
        />
      </DataTableExtensions>
    </div>
  );
}

export default Table;
