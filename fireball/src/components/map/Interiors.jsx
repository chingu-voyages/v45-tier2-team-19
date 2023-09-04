import { memo } from "react";

const Interiors = memo(({ path, interiors }) => {
  console.log("interiors rerender");
  return (
    <>
      <path className="interiors" d={path(interiors)} />
    </>
  );
});

Interiors.displayName = Interiors;

export default Interiors;
