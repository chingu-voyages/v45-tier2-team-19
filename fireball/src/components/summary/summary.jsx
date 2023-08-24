import React from "react";
// import StrikesByYear from "./StrikesByYear";
// import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
// import StrikesByComposition from "./StrikesByComposition";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDataContext } from "../../hooks/useDataContext";

function Summary() {
  const { data, loading } = useDataContext();
  //   const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);

  return (
    <div>
      <h2>Summary Content</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* <StrikesByYear />
          <StrikesByComposition /> */}
          <TotalStrikes />
          {/* <AverageMass /> */}
        </div>
      )}
    </div>
  );
}
export default Summary;
