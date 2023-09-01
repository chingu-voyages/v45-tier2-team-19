import GeoPath from "./GeoPath";
import { useCallback, useState } from "react";
import _debounce from "lodash.debounce";
import { useGetMapData } from "../../hooks/useGetMapData";
import { useDataContext } from "../../hooks/useDataContext";
import { useGetClusters } from "../../hooks/useGetClusters";

const Map = () => {
  const mapData = useGetMapData().data;
  const data = useDataContext().data;
  const { data: clusters } = useGetClusters();

  const [tooltipData, setTooltipData] = useState(null);
  // console.log("wholeDATA", data);

  const handleMouseMoveInstant = (e, d) => {
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
  }, []);

  const debouncedHandleMouseOut = useCallback(() => {
    // _debounce(handleMouseOut, 300);
    handleMouseOut();
  }, []);

  if (!mapData || !data || !clusters) {
    return <pre>Loading...</pre>;
  }

  const filteredData = data
    .map((d) => {
      return { ...d, lat: +d.reclat };
    })
    .filter((d) => d.reclat && d.lat);

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
    <div id="mapContainer" >
      <GeoPath
        map={mapData}
        data={filteredData}
        clusters={clusters}
        onMouseOver={debouncedHandleMouseOver}
        onMouseOut={debouncedHandleMouseOut}
      // zoomLevel={zoomLevel}
      // setZoomLevel={setZoomLevel}
      />

      {tooltipData && (
        <div id="mapContainer"
          className="tooltip"
          style={{
            position: "absolute",
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
    </div >
  );
};

export default Map;
