import { useState } from "react";
import { createIntervals } from "../../../utils/createIntervals";
import { continents, countries } from "./data";
import mapfilter from "./MapFilter.module.css";
import SelectDemo from "../shared/Select";

function MapFilter({ data, onDataFiltered }) {
  console.log("MAP FILTER RERENDER");
  const [selectedFilters, setSelectedFilters] = useState({
    year: "",
    region: "",
    // mass: "",
    // Add more filter criteria here
  });

  // console.log("data inside the filter comonent", data);

  const region = countries.map((country) => country.name).concat(continents);
  const filterOptions = {
    year: createIntervals(1400, 2000, 50),
    region: region, // Example countries
    // mass: createIntervals(10000000, 60000000, 5000000), // Example mass categories
    // Add more filter options for other criteria
  };

  // debugger;
  const applyFilter = () => {
    const updated = data.filter((item) => {
      return Object.entries(selectedFilters).every(([key, filterValue]) => {
        if (filterValue === "All") return true;

        // Define filter functions for each criterion
        const filterFunctions = {
          year: () => {
            const [startYear, endYear] = filterValue.split(" ");
            const itemYear = +item.year;
            return itemYear >= +startYear && itemYear <= +endYear;
          },
          region: () => {
            return continents.some((continent) => continent === filterValue)
              ? item.continent === filterValue
              : item.country === filterValue;
          },

          // mass: () => {
          //   const [start, end] = filterValue.split("-");
          //   const itemYear = +item.year;
          //   return itemYear >= +start && itemYear <= +end;
          // },
          // Add more filter functions for other criteria
        };

        return filterFunctions[key]();
      });
    });
    onDataFiltered(updated, selectedFilters);
  };

  const handleFilterChange = (name, value) => {
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  return (
    <div className={mapfilter.container}>
      {Object.keys(selectedFilters).map((key) => (
        <SelectDemo
          key={key}
          label={key}
          options={filterOptions[key]}
          value={selectedFilters[key]}
          onValueChange={(value) => handleFilterChange(key, value)}
        />
      ))}
      <button onClick={applyFilter}>apply</button>
    </div>
  );
}

export default MapFilter;
