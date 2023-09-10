import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";
import StrikesByMass from "./StrikesByMass";

import StrikesByYearFiltered from "./StrikesByYearFiltered";

import StrikesByDecade from "./StrikesByDecade";

import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

const Summary = function () {
  const { data, loading } = useDataContext();



  return (
    <div id="Summary" >
      <div className="summaryContainerWrap">


        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="Summary" className="summary-container">


            <div className="small-boxes">
              <TotalStrikes />
              <AverageMass />


            </div>
            <StrikesByYearFiltered />
            <StrikesByDecade />

            <StrikesByYear />
            <StrikesByMass />


            <StrikesByDecade />





            <StrikesByComposition />

          </div>
        )}
      </div>
    </div>
  );
};
export default Summary;
