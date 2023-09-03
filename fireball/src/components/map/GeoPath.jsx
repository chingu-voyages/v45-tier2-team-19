import { geoPath, geoEquirectangular, geoGraticule } from "d3-geo";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";

// import clusterData from './data.json';

import _debounce from "lodash.debounce";
import "./style.css";
import { memo, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { kmeans } from "../../../utils/kmeans";
import Clusters from "./Clusters";
import Continents from "./Continents";
import Graticules from "./Graticules";
import Interiors from "./Interiors";

// import { transition } from "d3-transition";
// import { easeLinear } from "d3-ease";
// import { kmeans } from "../utils/kmeans";

const GeoPath = memo(({ map, data, clusters, onMouseOver, onMouseOut }) => {
  // const [transformGroup, setTransformGroup] = useState({})
  console.log("RERENDER!");
  // console.log("FILTERED DATA", data);

  const [zoomScale, setZoomScale] = useState(1);
  // const [, setZoomComplete] = useState(false);
  const { countries, interiors } = map;
  const projection = useMemo(() => geoEquirectangular(), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  // const { data: clusters, loading } = useGetClusters();

  // const dd = data
  //   .filter((d) => d.reclat)
  //   .map((d) => {
  //     return [+d.reclat, +d.reclong];
  //   });

  // const kmeanscl = kmeans(dd, 130, 50).clusters;
  // console.log("zoomscale", zoomScale);

  // const { clusters } = result;

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

  // const dataWithCoordinates = data.map((d) => {
  //   const [lat, long] = projection([d.reclong, d.reclat]);
  //   return { ...d, lat, long };
  // });

  // console.log("Clusters", clusters);
  // console.log("distance", euclideanDistance());

  const svgRef = useRef(null);

  // const debouncedHandleZoom = useCallback((e) => {
  //   console.log("ZOOM STARTED");
  //   console.log(e);
  //   zoomScaleRef.current = e.transform.k;
  //   const svg = select(svgRef.current);
  //   svg.select("g").attr("transform", e.transform);
  // }, []);
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

    console.log(prevZoomRef.current);
    console.log(currentZoom);
    // Check if the current zoom level is the same as the previous zoom level
    if (currentZoom !== prevZoomRef.current) {
      // Wait for stabilityDelay milliseconds to consider the zoom complete

      prevZoomRef.current = currentZoom;
      zoomCompleteTimeoutRef.current = setTimeout(() => {
        // if (currentZoom !== prevZoomRef.current) {
        console.log("they are equal!!!");
        // Zoom is stable, set the zoomComplete state to true
        // setZoomComplete(true);
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
    <div className="container">
      <button onClick={resetMapZoom}>Reset</button>
      <svg ref={svgRef} viewBox="0 0 950 470">
        <g>
          <path className="sphere" d={path({ type: "Sphere" })} />

          <Graticules path={path} />
          <Continents countries={countries} path={path} />
          <Interiors path={path} interiors={interiors} />
          {data.map((d) => {
            const [lat, long] = projection([d.reclong, d.reclat]);

            return (
              <>
                <circle
                  key={d.id}
                  onMouseOver={(e) => onMouseOver(e, d)}
                  onMouseOut={onMouseOut}
                  className="landing-circle"
                  fill="#28d8da"
                  // stroke="#26ACAD"
                  // strokeWidth={0.1}
                  // r={sizeScale(radiusValue(d))}
                  r={1}
                  cx={lat}
                  cy={long}
                  // style={{
                  //   transform: `translate(${long}px, ${lat}px)`,
                  // }}
                  // opacity={0.5}
                />
              </>
            );
          })}

          {/* {dataWithCoordinates.map((d) => {
            // console.log("jkkk");
            // console.log(path.centroid(d));

            return (
              <>
                {d.GeoLocation && (
                  <circle
                    key={d.id}
                    onMouseOver={(e) => onMouseOver(e, d)}
                    onMouseOut={onMouseOut}
                    className="landing-circle"
                    fill="#28d8da"
                    stroke="#26ACAD"
                    strokeWidth={0.2}
                    r={sizeScale(radiusValue(d))}
                    // cx={lat}
                    // cy={long}
                    style={{
                      transform: `translate(${d.lat}px, ${d.long}px)`,
                    }}
                    // opacity={0.5}
                  />
                )}
              </>
            );
          })} */}
          {/* {cluster.map((c, i) => {
            const [lat, long] = projection([c.centroid[1], c.centroid[0]]);
            // console.log(c.points.length);
            // console.log(sizeScale((c) => c.points.length));
            return (
              <>
                <circle
                  key={i}
                  className="landing-circle"
                  fill="orange"
                  // r={sizeScale2(radiusValue2(c))}
                  r={12 / zoomScale}
                  cx={lat}
                  cy={long}
                  opacity={0.5}
                />
                <text
                  x={lat}
                  y={long}
                  // className="txt"
                  alignmentBaseline="middle"
                  textAnchor="middle"
                  fontSize={10 / zoomScale}
                >
                  {c.points.length}
                </text>
              </>
            );
          })} */}
          {/* <Clusters
            clusters={clusters}
            projection={projection}
            zoomScale={zoomScale}
          /> */}
        </g>
      </svg>
    </div>
  );
});

GeoPath.displayName = GeoPath;

export default GeoPath;
