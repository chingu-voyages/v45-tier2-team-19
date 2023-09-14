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

  const clusterIndex = matchedCondition ? matchedCondition.value : -1;

  if (!clusters) {
    return <div>Loading Clusters</div>;
  }

  const cluster = clusters[clusterIndex];
  return (
    <>
      {cluster.map((c, i) => {
        const [lat, long] = projection([c.centroid[1], c.centroid[0]]);
        return (
          <>
            <circle
              key={i}
              className="landing-circle"
              fill="#F2D492"
              r={12 / zoomScale}
              cx={lat}
              cy={long}
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
