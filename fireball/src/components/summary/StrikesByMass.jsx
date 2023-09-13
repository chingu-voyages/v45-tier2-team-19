import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
import summary from "./Summary.module.css";
const StrikesByMass = function () {
  const meteorData = useDataContext().data;

  useEffect(() => {
    console.log("meteorData", meteorData);

    function sort(a, b) {
      return a - b;
    }
  }, []);

  let largestArray = [];
  let smallestArray = [];
  meteorData.forEach((meteor) => {
    if (meteor["mass (g)"] > 500000) {
      largestArray.push(`Name: ${meteor.name} - Mass: ${meteor["mass (g)"]}`);
    }

    if (
      meteor["mass (g)"] < 0.1 &&
      meteor["mass (g)"] &&
      meteor["mass (g)"] != "0"
    ) {
      smallestArray.push(`Name: ${meteor.name} - Mass: ${meteor["mass (g)"]}`);
    }
  });

  largestArray.sort(function sort(a, b) {
    return b - a;
  });
  console.log(largestArray);
  console.log("smallest", smallestArray);

  let topTen = largestArray.slice(0, 10);
  console.log("topTen", topTen);

  const topTenList = topTen.map((meteor, index) => {
    return <p key={index}>{meteor}</p>;
  });

  smallestArray.sort(function (a, b) {
    return a - b;
  });

  let smallestArraySlice = smallestArray.slice(0, 10);
  const bottomTenList = smallestArraySlice.map((meteor, index) => {
    return <p key={index}>{meteor}</p>;
  });

  return (
    <div className="mass-container  ">
      <div className="data-text largest-smallest">
        <div>
          <h1>Largest Meteors</h1>
          {topTenList}
        </div>

        <div>
          <h1>Smallest Meteors</h1>
          {bottomTenList}
        </div>
      </div>
    </div>
  );
};

export default StrikesByMass;
