import React from "react";
import { useDataContext } from "../../hooks/useDataContext";
// import "./mass.css";

export default function TotalStrikes() {
  //   const [meteorData, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const meteorData = useDataContext();

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

  const strikesCount = meteorData.length;

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
