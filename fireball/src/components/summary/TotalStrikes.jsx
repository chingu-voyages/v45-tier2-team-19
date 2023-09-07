import React from "react";
import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

export default function TotalStrikes() {
  const meteorData = useDataContext();
  //   console.log(meteorData); // Returns array with data in another array

  const strikesCount = meteorData.data?.length;
  //   console.log(meteorData.data); // Returns array of data points

  return (
    <div className="total-strikes-container">
      <span>
        <h3 className="title">Total Number of Strikes: </h3>
        <div className="summary-data-text">
          <h4>{strikesCount}</h4>
        </div>
      </span>
    </div>
  );
}
