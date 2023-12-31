import stats from "./Stats.module.css";
import warning from "../../assets/warning.svg";
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
      {filteredData.length ? (
        <>
          <div className={stats.numberWrapper}>
            <h1>{landingsNumber}</h1>
            <span>landing{landingsNumber > 1 ? "s" : ""} between </span>
          </div>
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
        </>
      ) : (
        <div>
          <img src={warning} alt="warning" />
        </div>
      )}
    </div>
  );
};

export default Stats;
