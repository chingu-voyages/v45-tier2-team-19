import { geoGraticule } from "d3-geo";
import { useMemo } from "react";

const Graticules = ({ path }) => {
  const graticule = useMemo(() => geoGraticule(), []);
  return (
    <>
      <path className="graticules" d={path(graticule())} />
    </>
  );
};

export default Graticules;
