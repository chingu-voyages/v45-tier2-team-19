import { useEffect, useState, useRef } from "react";
import AverageMass from "./AverageMass";
import TotalStrikes from "./TotalStrikes";
import StrikesByYearFiltered from "./StrikesByYearFiltered";
import StrikesByDecade from "./StrikesByDecade";
import StrikesByCompo from "./StrikesbyCompo";
import MostStrikesByCountry from "./MostStrikesByCountry";

import { useDataContext } from "../../hooks/useDataContext";
import AOS from "aos";
import "aos/dist/aos.css";
import summary from "./Summary.module.css";
import "./summary.css";

const Summary = function () {
  const { data, loading } = useDataContext();
  const [showComponent, setShowComponent] = useState(false);
  const targetRef = useRef(null);
  AOS.init();

  const { IntersectionObserver } = window;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowComponent(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

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
        ) : showComponent ? (
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
        ) : null}
      </div>
    </section>
  );
};
export default Summary;
