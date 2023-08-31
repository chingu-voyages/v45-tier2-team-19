const Interiors = ({ path, interiors }) => {
  return (
    <>
      <path className="interiors" d={path(interiors)} />
    </>
  );
};

export default Interiors;
