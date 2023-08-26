import styles from "./DataSets.module.css";

export default function ColumnFilter({ column }) {
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
      />
      <button className={styles.clrBtn} onClick={clearFilter}>
        Clear
      </button>
    </span>
  );
}
