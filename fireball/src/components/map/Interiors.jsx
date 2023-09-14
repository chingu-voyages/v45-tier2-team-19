import { memo } from "react";

const Interiors = memo(({ path, interiors }) => {
  return (
    <>
      <path className="interiors" d={path(interiors)} />
    </>
  );
});

Interiors.displayName = Interiors;

export default Interiors;
