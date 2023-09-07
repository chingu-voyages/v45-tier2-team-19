import { useState } from "react";

export const useFilterData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filter, setFilter] = useState("All");

  const handleDataFiltered = (filteredData, selectedFilters, filter) => {
    setFilteredData(filteredData);
    setSelectedFilters(selectedFilters);
    setFilter(filter);
  };

  return { handleDataFiltered, filteredData, selectedFilters, filter };
};
