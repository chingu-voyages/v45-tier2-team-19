import GeoPath from "./GeoPath";
import { useState } from "react";

import "./style.css";
import map from "./Map.module.css";
import FilterSummary from "./FilterSummary";
import MapFilter from "./MapFilter";
import { useGetMapData } from "../../hooks/useGetMapData";
import { useGetFilteredMap } from "../../hooks/useGetFilteredMap";
import { useFilterData } from "./hooks/useFilterData";

const Map = () => {
  console.log("MAP RERENDERS");
  const { data } = useGetFilteredMap(); //data for the map filter component
  // const mapl = useGetMapData().data;
  const mapData = useGetMapData().data;
  // const mapData = useGetMapData().data;

  // const [filteredData, setFilteredData] = useState([]);
  // const [selectedFilters, setSelectedFilters] = useState({});
  // const [isAll, setIsAll] = useState(false);

  // const handleDataFiltered = (filteredData, selectedFilters, isAll) => {
  //   setFilteredData(filteredData);
  //   setSelectedFilters(selectedFilters);
  //   setIsAll(isAll);
  // };

  const { handleDataFiltered, filteredData, selectedFilters, filter } =
    useFilterData();

  if (!data || !mapData) {
    return <pre>Loading...</pre>;
  }

  return (
    <div className={map.section}>
      <div className={map.container}>
        <MapFilter data={data} onDataFiltered={handleDataFiltered} />
        <div className={map.details}>
          {/* <GeoPath map={mapData} data={filteredData} isAll={isAll} /> */}
          <GeoPath
            map={mapData}
            data={filteredData}
            filter={filter}
            // clusters={clusters}
            // onMouseOver={debouncedHandleMouseOver}
            // onMouseOut={debouncedHandleMouseOut}
          />
          {
            <FilterSummary
              filteredData={filteredData}
              selectedFilters={selectedFilters}
              filter={filter}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Map;
