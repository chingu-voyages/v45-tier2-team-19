import GeoPath from "./GeoPath";
import { useCallback, useState } from "react";
import _debounce from "lodash.debounce";
import { useGetMapData } from "../../hooks/useGetMapData";
// import { useDataContext } from "../../hooks/useDataContext";
import { useGetClusters } from "../../hooks/useGetClusters";
import useFilterData from "../../hooks/useFilterMap";
import DataFilter from "./MapFilter";

const Map = () => {
  const mapData = useGetMapData().data;
  const { data } = useFilterData(); //data for the map filter component
  const { data: clusters } = useGetClusters();

  const [tooltipData, setTooltipData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  // console.log("wholeDATA", data);

  console.log("tooltip", tooltipData);

  const handleDataFiltered = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleMouseMoveInstant = (e, d) => {
    console.log("hover");
    const toolTipPosition = {
      lat: d.lat,
      long: d.long,
      reclat: d.reclat,
      reclong: d.reclong,
      name: d.name,
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
    <div style={{ position: "relative" }}>
      <DataFilter data={data} onDataFiltered={handleDataFiltered} />
      <GeoPath
        map={mapData}
        data={filteredData}
        clusters={clusters}
        onMouseOver={debouncedHandleMouseOver}
        onMouseOut={debouncedHandleMouseOut}
      />

      {tooltipData && (
        <div
          // className="tooltip"
          style={{
            position: "absolute",
            // zIndex: 50,
            // transformOrigin: "top left",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "12px",
            left: tooltipData.x,
            top: tooltipData.y,
          }}
        >
          <div>Name: {tooltipData.name}</div>
          <div>Latitude: {tooltipData.reclat}</div>
          <div>Longitude: {tooltipData.reclong}</div>
        </div>
      )}
    </div>
  );
};

export default Map;
