import summary from "./FilterSummary.module.css";
const FilterSummary = ({ filteredData, selectedFilters }) => {
  console.log(filteredData);

  const code =
    filteredData[0]?.continent === "Antarctica" && filteredData.length
      ? "aq"
      : filteredData[0]?.countryCode.toLowerCase();
  return (
    <div className={summary.container}>
      {filteredData.length && (
        <>
          <div className={summary.country}>
            <h2>{selectedFilters.region}</h2>
            <img
              className={summary.flag}
              src={`https://flagcdn.com/w80/${code}.png`}
              // srcset="https://flagcdn.com/w40/ua.png 2x"
              width={code === "ch" ? "40" : "60"}
              // width="40"
              height="40"
              alt={filteredData[0].countryCode}
            />
          </div>
          <div className={summary.data}>
            {filteredData.length} landing{filteredData.length > 1 ? "s" : ""}{" "}
            between{" "}
            {selectedFilters.year
              .replace(" ", "-")
              .replace("Infinity", "2023")
              .replace("-Infinity", "...")}
          </div>
        </>
      )}
    </div>
  );
};

export default FilterSummary;
