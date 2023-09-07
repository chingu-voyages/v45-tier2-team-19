import { useCallback, useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";

export const useMapZoom = (ref) => {
  console.log("zoom!!");
  const [zoomScale, setZoomScale] = useState(1);
  const prevZoomRef = useRef(null);
  const zoomCompleteTimeoutRef = useRef(null);

  const debouncedHandleZoom = useCallback((e) => {
    console.log("ZOOM STARTED!!!!");
    // Your zoom handling logic...
    const svg = select(ref.current);
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
    const svg = select(ref.current);
    const zoomed = zoom()
      .scaleExtent([1.1, 40])
      .translateExtent([
        [0, 0],
        [960, 460],
      ])
      .on("zoom", debouncedHandleZoom);
    svg.call(zoomed);
  }, [debouncedHandleZoom]);

  const resetMapZoom = () => {
    const svg = select(ref.current);

    const zoomed = zoom()
      .scaleExtent([1.1, 40])
      .translateExtent([
        [0, 0],
        [960, 450],
      ])
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
    svg.call(zoomed.transform, zoomIdentity.scale(1.1).translate(-100, 0));
  };

  return { resetMapZoom, zoomScale };
};
