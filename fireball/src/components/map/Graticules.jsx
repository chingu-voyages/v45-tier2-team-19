import { geoGraticule } from "d3-geo";
import { memo } from "react";
import { useMemo } from "react";

const Graticules = memo(({ path }) => {
  console.log("graticules rerender");
  // const graticule = useMemo(() => geoGraticule(), []);
  const graticule = () => geoGraticule();
  return (
    <>
      <path className="graticules" d={path(graticule())} />
    </>
  );
});

Graticules.displayName = Graticules;
export default Graticules;
