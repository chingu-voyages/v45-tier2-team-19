import { useState } from "react";
import { createIntervals } from "../../../utils/createIntervals";
import { continents, countries } from "./data";

function DataFilter({ data, onDataFiltered }) {
  const [selectedFilters, setSelectedFilters] = useState({
    year: "",
    region: "",
    // mass: "",
    // continent: "",
    // Add more filter criteria here
  });
  // const [filteredData, setFilteredData] = useState(data);

  // console.log("data inside the filter comonent", data);

  const region = countries.map((country) => country.name).concat(continents);
  const filterOptions = {
    year: createIntervals(1400, 2000, 50),
    // country: countries.map((country) => country.name), // Example countries
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
          // continent: () => {
          //   return item.continent === filterValue;
          // },
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
    onDataFiltered(updated);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  // console.log("map fitler data", filteredData);

  return (
    <div>
      {Object.keys(selectedFilters).map((key) => (
        <div key={key}>
          <label>
            Select {key} Interval:
            <select
              name={key}
              value={selectedFilters[key]}
              onChange={handleFilterChange}
            >
              {filterOptions[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}
      <button onClick={applyFilter}>apply</button>
    </div>
  );
}

export default DataFilter;
