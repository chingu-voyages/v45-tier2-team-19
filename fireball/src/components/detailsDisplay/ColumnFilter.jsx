import "./table.css";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const clearFilter = () => {
    setFilter("");
  };

  return (
    <span>
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={`Filter by ${column.Header}`}
        className="filterInput"
      />
      <button className="clrBtn" onClick={clearFilter}>
        Clear
      </button>
    </span>
  );
};
