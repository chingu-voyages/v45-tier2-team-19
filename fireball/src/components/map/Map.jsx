import GeoPath from "./GeoPath";
import { useCallback, useState } from "react";
import _debounce from "lodash.debounce";
import { useGetMapData } from "../../hooks/useGetMapData";
// import { useDataContext } from "../../hooks/useDataContext";
import { useGetClusters } from "../../hooks/useGetClusters";
import useFilterData from "../../hooks/useFilterMap";
import "./style.css";
import map from "./Map.module.css";
import FilterSummary from "./FilterSummary";
import MapFilter from "./MapFilter";
import TooltipDemo from "./Tooltip";

const Map = () => {
  const mapData = useGetMapData().data;
  const { data } = useFilterData(); //data for the map filter component
  const { data: clusters } = useGetClusters();
  console.log("MAP RERENDERS");

  const [tooltipData, setTooltipData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isAll, setIsAll] = useState(false);

  const handleDataFiltered = (filteredData, selectedFilters, isAll) => {
    setFilteredData(filteredData);
    setSelectedFilters(selectedFilters);
    setIsAll(isAll);
  };

  const handleMouseMoveInstant = (e, d) => {
    console.log("hover");
    const toolTipPosition = {
      reclat: d.reclat,
      reclong: d.reclong,
      name: d.name,
      mass: d["mass (g)"],
      state: d.state,
      x: e.clientX,
      y: e.clientY, //////////////////
    };

    // console.log([d.reclat, d.reclong, d.name]);

    setTooltipData(toolTipPosition);
  };

  const handleMouseOut = () => {
    console.log("leave");
    setTooltipData(null);
  };

  const debouncedHandleMouseOver = useCallback((e, d) => {
    _debounce(handleMouseMoveInstant(e, d), 200);
    console.log("enter");
    // handleMouseMoveInstant(e, d);
  }, []);

  const debouncedHandleMouseOut = useCallback(() => {
    // _debounce(() => handleMouseOut, 200);
    handleMouseOut();
  }, []);

  if (!mapData || !data || !clusters) {
    return <pre>Loading...</pre>;
  }

  // const dd = data
  //   .filter((d) => d.reclat)
  //   .slice(0, 900)
  //   .map((d) => {
  //     return [+d.reclat, +d.reclong];
  //   });
  // console.log(dd);
  // const result = kmeans(dd, 15, 100);
  // console.log("KMEANS", result);

  console.log(data);

  return (
    <div className={map.section}>
      <div className={map.container}>
        <MapFilter data={data} onDataFiltered={handleDataFiltered} />
        <div className={map.details}>
          <GeoPath
            map={mapData}
            data={filteredData}
            clusters={clusters}
            isAll={isAll}
            onMouseOver={debouncedHandleMouseOver}
            onMouseOut={debouncedHandleMouseOut}
          />
          <FilterSummary
            filteredData={filteredData}
            selectedFilters={selectedFilters}
          />
        </div>
        {/* {tooltipData && <TooltipDemo tooltipData={tooltipData} />} */}
      </div>
    </div>
  );
};

export default Map;
