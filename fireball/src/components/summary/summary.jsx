import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";
import StrikesByDecade from "./StrikesByDecade";
import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

const Summary = function () {
  const { data, loading } = useDataContext();

  return (
    <div id="summary" className="summaryContainer">
      <div>
        {/* <h2>Summary Content</h2> */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="summary-container">
            <StrikesByYear />
            <TotalStrikes />
            <StrikesByComposition />
            <AverageMass />
            <StrikesByDecade />
          </div>
        )}
      </div>
    </div>
  );
};
export default Summary;
