import { memo } from "react";

const Continents = memo(({ countries, path }) => {
  console.log("continent rerender");
  return (
    <>
      {countries.features.map((feature) => {
        // console.log(path.centroid(feature));
        return <path fill="#202C39" d={path(feature)} />;
      })}
    </>
  );
});

Continents.displayName = Continents;

export default Continents;
