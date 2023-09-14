import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
<<<<<<< HEAD
// import StrikesByComposition from "./StrikesByComposition";

=======
>>>>>>> summaryv2
import StrikesByYearFiltered from "./StrikesByYearFiltered";
import StrikesByDecade from "./StrikesByDecade";
import StrikesByCompo from "./StrikesbyCompo";
import MostStrikesByCountry from "./MostStrikesByCountry";

import { useDataContext } from "../../hooks/useDataContext";
import summary from "./Summary.module.css";

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
            <div className={summary.gridItem6}>
              <StrikesByCompo />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Summary;
