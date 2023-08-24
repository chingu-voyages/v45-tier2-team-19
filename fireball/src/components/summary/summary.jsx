import React from "react";
import { useState, useEffect } from "react";
// import StrikesByYear from "./StrikesByYear";
// import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
// import StrikesByComposition from "./StrikesByComposition";
// import * as d3Fetch from "d3-fetch";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

function Summary() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
