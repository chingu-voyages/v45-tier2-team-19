import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useGetFilteredMap } from "../../hooks/useGetFilteredMap";

ChartJS.register(ArcElement, Tooltip, Legend);

const MostStrikesByCountry = () => {
  const { data: myData } = useGetFilteredMap();

  if (!myData) {
    return <div>Loading</div>;
  }

  const countryCounts = myData.reduce((acc, obj) => {
    const country = obj.country || obj.continent;

    if (!acc[country]) {
      acc[country] = 1;
    } else {
      acc[country]++;
    }

    return acc;
  }, {});

  const resultArray = Object.entries(countryCounts)
    .map(([country, count]) => ({
      country,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const data = {
    labels: resultArray.map((r) => r.country),
    datasets: [
      {
        label: "Number of Strikes",
        data: resultArray.map((r) => r.count),
        backgroundColor: ["rgba(242, 212, 146, 0.2)"],
        borderColor: ["rgba(242, 212, 146, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // layout: {
    //   padding: 40,
    // },
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        padding: { top: 10, bottom: 10 },
        text: "Top 6 Regions with the most meteorite landings",
        color: "#7BA1BF",
        font: {
          size: 18,
          family: "Plus Jakarta Sans",
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default MostStrikesByCountry;
