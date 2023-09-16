import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByYearFiltered from "./StrikesByYearFiltered";
import StrikesByDecade from "./StrikesByDecade";
import StrikesByCompo from "./StrikesbyCompo";
import MostStrikesByCountry from "./MostStrikesByCountry";

import { useDataContext } from "../../hooks/useDataContext";
import AOS from "aos";
import "aos/dist/aos.css";

import useObserver from "../../hooks/useObserver";

import summary from "./Summary.module.css";
import "./summary.css";

const Summary = function () {
  const { data, loading } = useDataContext();

  const [ref, isIntersecting] = useObserver({
    rootMargin: "-2px",
  });

  AOS.init();

  return (
    <section className={summary.section} id="Summary">
      <div
        className={summary.sectionContainer}
        data-aos="fade-up"
        data-aos-duration="3500"
        data-aos-once="true"
        ref={targetRef}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="Summary" className={summary.grid}>
            <StrikesByYearFiltered />

            <div className={summary.gridItem2}>
              <TotalStrikes data={data} />
            </div>

            <StrikesByDecade />

            <div className={summary.gridItem4} ref={ref}>
              {isIntersecting && <MostStrikesByCountry />}
            </div>

            <div className={summary.gridItem5}>
              <AverageMass />
            </div>

            <div className={summary.gridItem6} ref={ref}>
              {isIntersecting && <StrikesByCompo />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default Summary;
