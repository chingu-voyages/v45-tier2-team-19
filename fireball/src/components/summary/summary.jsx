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
    <div >
      <div className="summaryContainer">
        <h1 id='Summary'>Summary Contents</h1>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="summary-container">


            <div className="small-boxes">
              <TotalStrikes />
              <AverageMass />


            </div>
            <StrikesByYearFiltered />
            <StrikesByDecade />




            <StrikesByDecade />





            <StrikesByComposition />
          </div>
        )}
      </div>
    </div>
  );
};
export default Summary;
