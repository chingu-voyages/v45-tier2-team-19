import { memo } from "react";
import stats from "./Stats.module.css";
import chart from "../../assets/Chart.svg";

const string2 = "-Infinity 1400";

const replacement = "..."; // Replace with your desired value

const updatedString2 = string2.replace(
  /(Infinity)\s+(\d+)/g,
  `${replacement}-$2`
);

const Stats = ({ filteredData, selectedFilters }) => {
  const landingsNumber = filteredData.length;

  const { Year, Mass } = selectedFilters;
  return (
    <div className={stats.data}>
      <div className={stats.numberWrapper}>
        <h1>{landingsNumber}</h1>
        <span>landings</span>
      </div>
      {/* {landingsNumber} landing{landingsNumber > 1 ? "s" : ""} between{" "} */}
      <p>
        During{" "}
        {selectedFilters?.Year === string2
          ? updatedString2
          : selectedFilters?.Year?.replace(" ", "-")}
      </p>
      {Mass !== "All" && (
        <p>
          Mass:
          {selectedFilters?.Mass}
        </p>
      )}
    </div>
  );
};

export default Stats;
