import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDataContext } from "../../hooks/useDataContext";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StrikesByCompo = () => {
  const meteorData = useDataContext().data;

  if (meteorData === 0) return;

  const strikesByRecclass = {};

  meteorData?.forEach((meteor) => {
    const composition = meteor.recclass;

    // if (composition !== "Unknown") {
    //   if (composition !== undefined) {
    //     if (!strikesByRecclass[composition]) {
    //       strikesByRecclass[composition] = 0;
    //     }
    //     strikesByRecclass[composition]++;
    //   }
    // }

    if (composition && composition !== "Unknown") {
      if (!strikesByRecclass[composition]) {
        strikesByRecclass[composition] = 0;
      }
      strikesByRecclass[composition]++;
    }
  });

  const compositions = Object.keys(strikesByRecclass).slice(0, 10);
  const strikesCount = compositions.map(
    (composition) => strikesByRecclass[composition]
  );

  function compareNumbers(a, b) {
    return b - a;
  }

  strikesCount.sort(compareNumbers);
  const topTenCompositions = strikesCount.slice(0, 10);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        color: "red",
      },
      title: {
        display: true,
        text: "Strikes number by composition",
        color: "#6989A4",
        font: {
          size: 20,
          family: "Plus Jakarta Sans",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#7BA1BF",
          font: {
            size: 14,
            family: "Plus Jakarta Sans",
          },
        },
      },
      y: {
        ticks: {
          color: "#7BA1BF",
          font: {
            size: 14,
            family: "Plus Jakarta Sans",
          },
        },
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: compositions,
    datasets: [
      {
        label: "Number of strikes",
        data: topTenCompositions,
        borderColor: "#F2D492",
        borderWidth: 3,
        backgroundColor: "#F2D492",
        pointBorderWidth: 8,
        pointHoverBorderWidth: 16,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default StrikesByCompo;
