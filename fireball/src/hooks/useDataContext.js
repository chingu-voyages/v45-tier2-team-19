import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export function useDataContext() {
  return useContext(DataContext);
}
