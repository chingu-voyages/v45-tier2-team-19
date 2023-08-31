const Continents = ({ countries, path }) => {
  return (
    <>
      {countries.features.map((feature) => {
        // console.log(path.centroid(feature));
        return <path fill="#0C164F" d={path(feature)} />;
      })}
    </>
  );
};

export default Continents;
