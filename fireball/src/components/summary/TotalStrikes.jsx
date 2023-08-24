import React from "react";
import { useDataContext } from "../../hooks/useDataContext";
import "./summary.css";

export default function TotalStrikes() {
  //   const [meteorData, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const meteorData = useDataContext();
  //   console.log(meteorData); // Returns array with data in another array

  //OLD FETCH
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       let data = await d3Fetch.csv(
  //         "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv"
  //       );

  //       setLoading(false);
  //       setData(data);
  //       return data; //Array of like 45,000 objects
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const strikesCount = meteorData.data.length;
  //   console.log(meteorData.data); // Returns array of data points

  return (
    <div className="mass-container">
      <span>
        <h3 className="title">Total Number of Strikes: </h3>
        <div className="data-text">
          <h4>{strikesCount}</h4>
        </div>
      </span>
    </div>
  );
}
