import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";

import StrikesByYearFiltered from "./StrikesByYearFiltered";

import StrikesByDecade from "./StrikesByDecade";

import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

const Summary = function () {
  const { data, loading } = useDataContext();

  return (
    <div id="Summary" className="summaryContainer">
      <div>
        {/* <h2>Summary Content</h2> */}

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="summary-container">
            <StrikesByYear />
            <TotalStrikes />
            <StrikesByDecade />
            <AverageMass />

            <StrikesByYearFiltered />
=======            <StrikesByComposition />

          </div>
        )}
      </div>
    </div>
  );
};
export default Summary;
