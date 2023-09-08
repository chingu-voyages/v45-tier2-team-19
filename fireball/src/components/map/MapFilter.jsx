import { useState } from "react";
import { createIntervals } from "../../../utils/createIntervals";
import { continents, countries } from "./data";
import mapfilter from "./MapFilter.module.css";
import SelectDemo from "../shared/Select";
import Button from "../shared/Button";

function MapFilter({ data, onDataFiltered }) {
  console.log("MAP FILTER RERENDER");
  const [selectedFilters, setSelectedFilters] = useState({
    Year: "",
    Region: "",
    Mass: "All",
    // Add more filter criteria here
  });
  const [filter, SetFilter] = useState("All");

  // console.log("data inside the filter comonent", data);

  const region = countries.map((country) => country.name).concat(continents);
  const filterOptions = {
    Year: createIntervals(1400, 2000, 50),
    Region: region, // Example countries
    Mass: createIntervals(10000000, 60000000, 5000000).concat("All"), // Example mass categories
    // Add more filter options for other criteria
  };

  const getTop100 = () => {
    const updated = data
      .sort((a, b) => +b["mass (g)"] - +a["mass (g)"])
      .slice(0, 100);
    onDataFiltered(updated, {}, "Top 100");
  };

  const getAll = () => {
    onDataFiltered([], {}, "All");
  };

  // debugger;
  const applyFilter = () => {
    const updated = data.filter((item) => {
      return Object.entries(selectedFilters).every(([key, filterValue]) => {
        if (filterValue === "All") return true;

        // Define filter functions for each criterion
        const filterFunctions = {
          Year: () => {
            const [startYear, endYear] = filterValue.split(" ");
            const itemYear = +item.year;
            return itemYear >= +startYear && itemYear <= +endYear;
          },
          Region: () => {
            return continents.some((continent) => continent === filterValue)
              ? item.continent === filterValue
              : item.country === filterValue;
          },

          Mass: () => {
            if (filterValue === "All") return true;
            const [start, end] = filterValue.split(" ");
            const itemMass = +item["mass (g)"];
            return itemMass >= +start && itemMass <= +end;
          },
        };

        return filterFunctions[key]();
      });
    });
    onDataFiltered(updated, selectedFilters, "Batch");
  };

  const handleFilterChange = (name, value) => {
    setSelectedFilters({ ...selectedFilters, [name]: value });
  };

  const clearFilter = () => {
    onDataFiltered([], selectedFilters, "All");
  };

  return (
    <div data-testid="map-filter" className={mapfilter.container}>
      <div className={mapfilter.batchFilter}>
        {Object.keys(selectedFilters).map((key) => (
          <SelectDemo
            key={key}
            label={key}
            options={filterOptions[key]}
            value={selectedFilters[key]}
            onValueChange={(value) => handleFilterChange(key, value)}
          />
        ))}
        <Button onClick={applyFilter} className={mapfilter.button}>
          Apply
        </Button>
        <Button onClick={clearFilter} className={mapfilter.clearButton}>
          Clear
        </Button>
      </div>
      <Button onClick={getAll} className={mapfilter.button}>
        All
      </Button>
      <Button onClick={getTop100} className={mapfilter.button}>
        Top 100
      </Button>
    </div>
  );
}

export default MapFilter;
