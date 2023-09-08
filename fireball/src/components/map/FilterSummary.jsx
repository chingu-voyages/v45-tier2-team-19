import AllStats from "./AllStats";
import Card from "./Card";
import summary from "./FilterSummary.module.css";
import Region from "./Region";
import Stats from "./Stats";
import Top100 from "./Top100";
const FilterSummary = ({ filteredData, selectedFilters, filter }) => {
  console.log(filteredData);

  const flags = filteredData.map((d) => d.flag);
  const flag = [...new Set(flags)];

  return (
    <div className={summary.container}>
      <>
        {filter === "All" ? (
          <Card>
            <AllStats />
          </Card>
        ) : null}
        {filter === "Top 100" ? (
          <Card>
            <Top100 filteredData={filteredData} />
          </Card>
        ) : null}
        {filter === "Batch" ? (
          <>
            <Region selectedFilters={selectedFilters} flag={flag} />
            <Stats
              filteredData={filteredData}
              selectedFilters={selectedFilters}
            />
          </>
        ) : null}
      </>
    </div>
  );
};

export default FilterSummary;
