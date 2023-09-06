import { geoPath, geoEquirectangular } from "d3-geo";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import geopath from "./GeoPath.module.css";
import _debounce from "lodash.debounce";
import "./style.css";
import { memo, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { kmeans } from "../../../utils/kmeans";
import Clusters from "./Clusters";
import Continents from "./Continents";
import Graticules from "./Graticules";
import Interiors from "./Interiors";
import Landings from "./Landings";
import TooltipDemo from "./Tooltip";

// import { transition } from "d3-transition";
// import { easeLinear } from "d3-ease";
// import { kmeans } from "../utils/kmeans";

const GeoPath = memo(
  ({ map, data, clusters, isAll, onMouseOver, onMouseOut }) => {
    // const [transformGroup, setTransformGroup] = useState({})
    console.log("RERENDER!");
    // console.log("FILTERED DATA", data);

    const [zoomScale, setZoomScale] = useState(1);
    const [tooltipData, setTooltipData] = useState(null);
    // const [, setZoomComplete] = useState(false);
    const { countries, interiors } = map;
    const projection = useMemo(() => geoEquirectangular(), []);
    const path = useMemo(() => geoPath(projection), [projection]);

    console.log("tooltip", tooltipData);

    // const { data: clusters, loading } = useGetClusters();

    // const dd = data
    //   .filter((d) => d.reclat)
    //   .map((d) => {
    //     return [+d.reclat, +d.reclong];
    //   });

    // const kmeanscl = kmeans(dd, 130, 50).clusters;
    // console.log("zoomscale", zoomScale);

    // const { clusters } = result;

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

      // handleMouseMoveInstant(e, d);
    }, []);

    const debouncedHandleMouseOut = useCallback(() => {
      // _debounce(() => handleMouseOut, 200);
      handleMouseOut();
    }, []);

    const radiusValue = (d) => +d["mass (g)"];
    const radiusValue2 = (d) => d.points.length;
    const sizeScale = useMemo(
      () => scaleSqrt([0, max(data, radiusValue)], [1, 15]),
      []
    );

    // const sizeScale2 = useMemo(
    //   () =>
    //     scaleSqrt(
    //       [0, max(clusters, radiusValue2)],
    //       [1, 15 / (Math.floor(zoomScale) - 1 || 1) + 3]
    //     ),
    //   [clusters, zoomScale]
    // );

    const svgRef = useRef(null);

    const prevZoomRef = useRef(null);
    const zoomCompleteTimeoutRef = useRef(null);

    const debouncedHandleZoom = useCallback((e) => {
      console.log("ZOOM STARTED!!!!");
      // Your zoom handling logic...
      const svg = select(svgRef.current);
      svg.select("g").attr("transform", e.transform);
      // Define a delay in milliseconds to wait for stability
      const stabilityDelay = 1000; // Adjust as needed
      if (zoomCompleteTimeoutRef.current) {
        clearTimeout(zoomCompleteTimeoutRef.current);
      }
      // Get the current zoom level
      const currentZoom = e.transform.k;

      // Store the previous zoom level in a ref

      // If the previous zoom level is not set, set it and return
      if (prevZoomRef.current === null) {
        prevZoomRef.current = currentZoom;
        return;
      }
      // Check if the current zoom level is the same as the previous zoom level
      if (currentZoom !== prevZoomRef.current) {
        // Wait for stabilityDelay milliseconds to consider the zoom complete

        prevZoomRef.current = currentZoom;
        zoomCompleteTimeoutRef.current = setTimeout(() => {
          setZoomScale(e.transform.k);
          // }
        }, stabilityDelay);
      } else {
        // Zoom level changed, update the previous zoom level
      }
    }, []);

    useEffect(() => {
      const svg = select(svgRef.current);
      const zoomed = zoom()
        .scaleExtent([1, 30])
        .translateExtent([
          [0, 0],
          [960, 470],
        ])
        .on("zoom", debouncedHandleZoom);
      svg.call(zoomed);
    }, [debouncedHandleZoom]);

    const resetMapZoom = () => {
      const svg = select(svgRef.current);

      const zoomed = zoom()
        .scaleExtent([1, 40])
        // .translateExtent([
        //   [marginLeft, -Infinity],
        //   [width - marginRight, Infinity],
        // ])

        .on(
          "zoom",
          debouncedHandleZoom
          // (event) => {
          //   // setZoomScale(event.transform.k);
          //   // zoomScaleRef.current = event.transform.k;
          //   console.log(event.transform);
          //   svg.select("g").attr("transform", event.transform);
          // }
        );
      svg.call(zoomed.transform, zoomIdentity);
    };

    // console.log("ONLINE clusterrs", kmeanscl);

    // console.log("countries", countries);
    // console.log("landing data", data);
    return (
      <div className={geopath.container}>
        {/* <button onClick={resetMapZoom}>Reset</button> */}
        <svg ref={svgRef} viewBox="0 0 950 440" overflow={"visible"}>
          <g>
            <path className="sphere" d={path({ type: "Sphere" })} />

            <Graticules path={path} />
            <Continents countries={countries} path={path} />
            <Interiors path={path} interiors={interiors} />
            <Landings
              data={data}
              projection={projection}
              onMouseOver={debouncedHandleMouseOver}
              onMouseOut={debouncedHandleMouseOut}
            />
            {isAll && (
              <Clusters
                clusters={clusters}
                projection={projection}
                zoomScale={zoomScale}
              />
            )}
          </g>
        </svg>
        {tooltipData && <TooltipDemo tooltipData={tooltipData} />}
      </div>
    );
  }
);

GeoPath.displayName = GeoPath;

export default GeoPath;
