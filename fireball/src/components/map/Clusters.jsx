const Clusters = ({ cluster, projection, zoomScale }) => {
  return (
    <>
      {cluster.map((c, i) => {
        const [lat, long] = projection([c.centroid[1], c.centroid[0]]);
        // console.log(c.points.length);
        // console.log(sizeScale((c) => c.points.length));
        return (
          <>
            <circle
              key={i}
              className="landing-circle"
              fill="orange"
              // r={sizeScale2(radiusValue2(c))}
              r={12 / zoomScale}
              cx={lat}
              cy={long}
              opacity={0.5}
            />
            <text
              x={lat}
              y={long}
              // className="txt"
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={10 / zoomScale}
            >
              {c.points.length}
            </text>
          </>
        );
      })}
    </>
  );
};

export default Clusters;
