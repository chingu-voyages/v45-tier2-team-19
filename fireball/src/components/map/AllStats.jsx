import allstats from "./Allstats.module.css";
import chart from "../../assets/Chart.svg";
const AllStats = () => {
  return (
    <div className={allstats.container}>
      <h1 className={allstats.heading}>Statitics</h1>
      <div className={allstats.details}>
        <p>Total landings</p>
        <div className={allstats.numberWrapper}>
          <h2 className={allstats.number}>45,716</h2>
          <span>landings</span>
        </div>
      </div>
      <div className={allstats.illustration}>
        <img src={chart} alt="chart" />
      </div>
    </div>
  );
};

export default AllStats;
