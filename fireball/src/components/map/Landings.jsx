import { max } from "d3-array";
import { scaleSqrt } from "d3-scale";

const Landings = ({ data, projection, onMouseOver, onMouseOut }) => {
  const radiusValue = (d) => +d["mass (g)"];
  const sizeScale = scaleSqrt([0, max(data, radiusValue)], [1, 15]);
  const radius = (d) => (data.length === 100 ? sizeScale(radiusValue(d)) : 0.5);

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
              strokeWidth={0.05}
              r={radius(d)}
              cx={lat}
              cy={long}
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
