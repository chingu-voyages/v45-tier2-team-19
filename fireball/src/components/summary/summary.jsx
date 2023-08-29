import React from "react";
import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";
import StrikesByMass from "./StrikesByMass";
import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

function Summary() {
  const { data, loading } = useDataContext();

  return (
    <div>
      <h2>Summary Content</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="summary-container">
          <StrikesByYear />
          <TotalStrikes />
          <StrikesByComposition />
          <AverageMass />
          <StrikesByMass />
        </div>
      )}
    </div>
  );
}
export default Summary;
