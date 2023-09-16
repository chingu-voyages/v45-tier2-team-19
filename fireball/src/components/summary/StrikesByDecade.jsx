import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useDataContext } from "../../hooks/useDataContext";
import useObserver from "../../hooks/useObserver";
import summary from "./Summary.module.css";

function StrikesByDecade() {
  const meteorData = useDataContext().data;
  console.log(meteorData);

  if (meteorData === 0) return;

  const strikesByDecade = {};

  const [ref, isIntersecting] = useObserver({
    rootMargin: "-2px",
  });

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
  // const decades = Array.from({ length: 12 }, (_, index) => 1895 + index * 10);

  const strikesCount = decades.map((decade) => strikesByDecade[decade]);

  const chartData = {
    labels: decades,
    datasets: [
      {
        label: "Number of Strikes by Decade",
        data: strikesCount,
        backgroundColor: "#F2D492",
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 10,
      },
    ],
  };

  const chartOptions = {
    layout: {
      padding: 20,
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#7BA1BF",
          font: {
            family: "Plus Jakarta Sans",
          },
        },
        title: {
          display: true,
          text: "Decade",
          color: "#7BA1BF",
          font: {
            size: 16,
            family: "Plus Jakarta Sans",
          },
        },
      },
      y: {
        type: "logarithmic",
        ticks: {
          color: "#7BA1BF",
          font: {
            family: "Plus Jakarta Sans",
          },
        },
        title: {
          display: true,
          text: "Number of Strikes",
          color: "#7BA1BF",
          font: {
            size: 16,
            family: "Plus Jakarta Sans",
          },
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
        color: "#7BA1BF",
        font: {
          size: 18,
          family: "Plus Jakarta Sans",
        },
      },
    },
  };

  return (
    <div className={summary.gridItem3} ref={ref}>
      {isIntersecting && <Bar data={chartData} options={chartOptions} />}
    </div>
  );
}

export default StrikesByDecade;
