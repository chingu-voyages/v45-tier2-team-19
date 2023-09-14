import { geoGraticule } from "d3-geo";
import { memo } from "react";
import "./style.css";

const Graticules = ({ path }) => {
  // const graticule = useMemo(() => geoGraticule(), []);
  const graticule = geoGraticule();
  return (
    <>
      <path className="graticules" d={path(graticule())} />
    </>
  );
};

Graticules.displayName = Graticules;
export default Graticules;
