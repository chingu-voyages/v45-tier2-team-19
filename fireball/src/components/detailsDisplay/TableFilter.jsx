import { useState } from "react";
import TableSelect from "./TableSelect";
import filter from "./TableFilter.module.css";
import { LuFilter } from "react-icons/lu";

const TableFilter = ({ options, setFilter }) => {
  const [tableFilter, setTableFilter] = useState("name");
  console.log(tableFilter);
  return (
    <div className={filter.container}>
      {/* <LuFilter /> */}
      <input
        className={filter.input}
        type="text"
        placeholder={`Filter by ${tableFilter}`}
        onChange={(e) => {
          const value = e.target.value || undefined;
          setFilter(tableFilter, value); // Replace 'columnName' with the column you want to filter
        }}
      />
      <TableSelect
        onValueChange={setTableFilter}
        options={options}
        tableFilter={tableFilter}
      />
    </div>
  );
};

export default TableFilter;
