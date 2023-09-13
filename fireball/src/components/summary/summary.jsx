import StrikesByYear from "./StrikesByYear";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByComposition from "./StrikesByComposition";

import StrikesByYearFiltered from "./StrikesByYearFiltered";

import StrikesByDecade from "./StrikesByDecade";

import { useDataContext } from "../../hooks/useDataContext";
// import "./summary.css";
import summary from "./Summary.module.css";
import MostStrikesByCountry from "./MostStrikesByCountry";

const Summary = function () {
  const { data, loading } = useDataContext();

  return (
    <section className={summary.section} id="Summary">
      <div className={summary.sectionContainer}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="Summary" className={summary.grid}>
            <StrikesByYearFiltered />

            <div className={summary.gridItem2}>
              <TotalStrikes data={data} />
            </div>

            <StrikesByDecade />

            <div className={summary.gridItem4}>
              <MostStrikesByCountry />
            </div>
            <div className={summary.gridItem5}>
              <AverageMass />
            </div>

            {/* <StrikesByComposition /> */}
          </div>
        )}
      </div>
    </section>
  );
};
export default Summary;
