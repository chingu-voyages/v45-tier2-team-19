import { memo } from "react";
import region from "./Region.module.css";
import chart from "../../assets/Chart.svg";

const Region = ({ selectedFilters, flag }) => {
  const { Region } = selectedFilters;
  return (
    <div className={region.region}>
      {Region ? (
        <>
          <h2>Region</h2>
          <div className={region.regionDetails}>
            <span className={region.regionName}>{Region}</span>
            <img
              className={region.flag}
              src={flag[0]}
              // srcSet={`https://flagcdn.com/w40/${code}.png 2x}`}
              width={region === "Switzerland" ? "25" : "37"}
              height="25"
              alt={Region}
            />
          </div>
          <img src={chart} alt="chart" />
        </>
      ) : (
        <div className={region.noRegion}>
          <p>Please select at least a region and a period of time.</p>
        </div>
      )}
    </div>
  );
};

// region.displayName = region;

export default Region;
