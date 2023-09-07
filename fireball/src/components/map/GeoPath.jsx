import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoPath, geoEquirectangular } from "d3-geo";
import geopath from "./GeoPath.module.css";
// import "./style.css";
import Clusters from "./Clusters";
import Continents from "./Continents";
import Graticules from "./Graticules";
import Interiors from "./Interiors";
import Landings from "./Landings";
import TooltipDemo from "./Tooltip";
import Button from "../shared/Button";
import { useMapZoom } from "./hooks/useMapZoom";
import { useTooltip } from "./hooks/useTooltip";

const GeoPath = memo(({ map, data, filter }) => {
  console.log("RERENDER!");
  // const { data: mapData } = useGetMapData();
  const { countries, interiors } = map;

  // const [zoomScale, setZoomScale] = useState(1);

  const projection = useMemo(() => geoEquirectangular(), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  const { tooltipData, debouncedHandleMouseOver, handleMouseOut } =
    useTooltip();

  const svgRef = useRef(null);

  const { resetMapZoom, zoomScale } = useMapZoom(svgRef);

  // if (!mapData) return <div>Loading</div>;

  return (
    <div className={geopath.container}>
      <Button onClick={resetMapZoom} className={geopath.button}>
        Reset
      </Button>
      <svg ref={svgRef} viewBox="0 0 950 470" overflow={"visible"}>
        <g>
          <path className="sphere" d={path({ type: "Sphere" })} />
          <Graticules path={path} />
          <Continents countries={countries} path={path} />
          <Interiors path={path} interiors={interiors} />
          <Landings
            data={data}
            projection={projection}
            onMouseOver={debouncedHandleMouseOver}
            onMouseOut={handleMouseOut}
          />
          {filter === "All" && (
            <Clusters projection={projection} zoomScale={zoomScale} />
          )}
        </g>
      </svg>
      {tooltipData && <TooltipDemo tooltipData={tooltipData} />}
    </div>
  );
});

GeoPath.displayName = GeoPath;

export default GeoPath;
