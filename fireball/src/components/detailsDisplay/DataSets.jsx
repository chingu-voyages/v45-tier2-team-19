import styles from "./DataSets.module.css";
import { useMemo } from "react";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useDataContext } from "../../hooks/useDataContext";

import { COLUMNS } from "./columns";
import { ColumnFilter } from "./ColumnFilter";

function DataSets() {
  const data = useDataContext().data;

  return <div className={styles.datasetsContainer}>DataSets</div>;
}

export default DataSets;
