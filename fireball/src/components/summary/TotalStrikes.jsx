import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

export default function TotalStrikes() {
  const meteorData = useDataContext();
  //   console.log(meteorData); // Returns array with data in another array

  const strikesCount = meteorData.data?.length;
  //   console.log(meteorData.data); // Returns array of data points

  return (
    <div className="num-data-container">
      <div className="num-data-container-strike">
        <h3 className="title">Total Number of Strikes: </h3>
        <p className="summary-data-text">{strikesCount}</p>
      </div>
    </div>
  );
}
