const Landings = ({ data, projection, onMouseOver, onMouseOut }) => {
  return (
    <>
      {data.map((d) => {
        const [lat, long] = projection([d.reclong, d.reclat]);

        return (
          <>
            <circle
              key={d.id}
              onMouseOver={(e) => onMouseOver(e, d)}
              onMouseOut={onMouseOut}
              className="landing-circle"
              fill="#F2D492"
              // stroke="#26ACAD"
              strokeWidth={0.05}
              // r={sizeScale(radiusValue(d))}
              r={0.5}
              cx={lat}
              cy={long}
              // style={{
              //   transform: `translate(${long}px, ${lat}px)`,
              // }}
              opacity={0.5}
            />
          </>
        );
      })}
    </>
  );
};

// Interiors.displayName = Interiors;

export default Landings;
