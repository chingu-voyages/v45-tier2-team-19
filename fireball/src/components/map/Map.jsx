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
import { formatLocale } from "d3-format";

const Map = () => {
  const mapData = useGetMapData().data;
  const { data } = useFilterData(); //data for the map filter component
  const { data: clusters } = useGetClusters();

  const [tooltipData, setTooltipData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  // console.log("wholeDATA", data);

  const locale = formatLocale({
    decimal: ",",
    thousands: "\u00a0",
    grouping: [3],
    currency: ["", " g"],
    minus: "\u2212",
    percent: "\u202f%",
  });

  const fformat = locale.format("$,");

  const handleDataFiltered = (filteredData, selectedFilters) => {
    setFilteredData(filteredData);
    setSelectedFilters(selectedFilters);
  };

  const handleMouseMoveInstant = (e, d) => {
    console.log("hover");
    const toolTipPosition = {
      lat: d.lat,
      long: d.long,
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

  // console.log("filtered in MAP component", filteredData);
  // const filteredData = data
  //   .map((d) => {
  //     return { ...d, lat: +d.reclat };
  //   })
  //   .filter((d) => d.reclat && d.lat);

  // const dd = data
  //   .filter((d) => d.reclat)
  //   .slice(0, 900)
  //   .map((d) => {
  //     return [+d.reclat, +d.reclong];
  //   });
  // console.log(dd);
  // const result = kmeans(dd, 15, 100);
  // console.log("KMEANS", result);

  return (
    <div className="container">
      <MapFilter data={data} onDataFiltered={handleDataFiltered} />
      <div className={map.details}>
        <GeoPath
          map={mapData}
          data={filteredData}
          clusters={clusters}
          onMouseOver={debouncedHandleMouseOver}
          onMouseOut={debouncedHandleMouseOut}
        />
        <FilterSummary
          filteredData={filteredData}
          selectedFilters={selectedFilters}
        />
      </div>

      {tooltipData && (
        <div
          // className="tooltip"
          style={{
            position: "fixed",
            // zIndex: 50,
            // transformOrigin: "top left",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "12px",
            // transform: "transform: translate(50%, 18px)",
            left: tooltipData.x + 10,
            top: tooltipData.y + 10,
            // left: 0,
            // top: 0,
          }}
        >
          <div>Name: {tooltipData.name}</div>
          <div>Latitude: {tooltipData.reclat}</div>
          <div>Longitude: {tooltipData.reclong}</div>
          <div>State: {tooltipData.state}</div>
          <div>Mass: {fformat(tooltipData.mass)}</div>
        </div>
      )}
    </div>
  );
};

export default Map;
