import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";

import StrikesByYearFiltered from "./StrikesByYearFiltered";

import StrikesByDecade from "./StrikesByDecade";

import { useDataContext } from "../../hooks/useDataContext";
import AOS from "aos";
import "aos/dist/aos.css";

import "./summary.css";

const Summary = function () {
  AOS.init();
  const { data, loading } = useDataContext();

  return (
    <div id="Summary">
      <div className="summaryContainerWrap">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div
            id="Summary"
            className="summary-container"
            data-aos="fade-up"
            data-aos-duration="2000"
            data-aos-once="true"
          >
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
