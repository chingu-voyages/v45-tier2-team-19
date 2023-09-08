import { useGetClusters } from "../../hooks/useGetClusters";
import "./style.css";

const Clusters = ({ projection, zoomScale }) => {
  const { data: clusters } = useGetClusters();

  const conditions = [
    { min: 1, max: 2.5, value: 0 },
    { min: 2.5, max: 4, value: 1 },
    { min: 4, max: 5.5, value: 2 },
    { min: 5.5, max: Infinity, value: 3 },
  ];

  const matchedCondition = conditions.find(
    (condition) => zoomScale >= condition.min && zoomScale < condition.max
  );

  // Set clusterIndex based on the matched condition or a default value if none match
  const clusterIndex = matchedCondition ? matchedCondition.value : -1;
  if (!clusters) {
    return <div>Loading Clusters</div>;
  }

  // const clusterIndex = zoomScale < 2.5 ? 0 : 1;
  const cluster = clusters[clusterIndex];
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
              fill="#F2D492"
              // r={sizeScale2(radiusValue2(c))}
              r={12 / zoomScale}
              cx={lat}
              cy={long}
              // opacity={0.5}
            />
            <text
              x={lat}
              y={long}
              className="txt"
              alignmentBaseline="middle"
              textAnchor="middle"
              fontSize={9 / zoomScale}
              fontWeight={700}
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
