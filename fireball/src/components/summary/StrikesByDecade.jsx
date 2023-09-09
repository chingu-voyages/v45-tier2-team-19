import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useDataContext } from "../../hooks/useDataContext";

function StrikesByDecade() {
  const meteorData = useDataContext().data;
  console.log(meteorData);

  if (meteorData === 0) return;

  const strikesByDecade = {};

  meteorData.forEach((meteor) => {
    const year = new Date(meteor.year).getFullYear();

    // Filter out empty fields, falsy data, and NaN, and also filter out data before 1900 and after 2012
    if (!isNaN(year) && year >= 1900 && year <= 2012) {
      const decade = Math.floor(year / 10) * 10; // Calculate the decade

      if (!strikesByDecade[decade]) {
        strikesByDecade[decade] = 0;
      }

      strikesByDecade[decade]++;
    }
  });

  const decades = Object.keys(strikesByDecade);

  const strikesCount = decades.map((decade) => strikesByDecade[decade]);

  const chartData = {
    labels: decades,
    datasets: [
      {
        label: "Number of Strikes by Decade",
        data: strikesCount,
        backgroundColor: "#F2D492",
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: 20,
    },
    scales: {
      x: {
        ticks: {
          color: "#E6AF37",
        },
      },
      y: {
        ticks: {
          color: "#E6AF37",
        },
        title: {
          display: true,
          text: "Number of Strikes",
          color: "rgb(12, 22, 79)",
        },
        beginAtZero: true,
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
      title: {
        display: true,
        text: "Meteorite Strikes by Decade",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div
      className="strikes-by-year-container"
    // style={{
    //   width: 700,
    //   color: "white",
    //   marginTop: "0.5rem",
    //   background: "rgb(229,231,245)",
    //   margin: "0.5rem",
    //   // border: "5px solid white",
    //   borderRadius: "8px",
    // }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByDecade;
