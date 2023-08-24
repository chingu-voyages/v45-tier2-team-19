import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useDataContext } from "../../hooks/useDataContext";

//Thanks Alex for your work putting much of this together! Your work is much appreciated! :)
function StrikesByYear() {
  const meteorData = useDataContext().data;
  console.log(meteorData);

  if (meteorData === 0) return;

  const strikesByYear = {};
  // const strikesByDecade = {};

  meteorData.forEach((meteor) => {
    const year = new Date(meteor.year).getFullYear();

    //Filter out empty fields, falsy data, and NaN, filters out data before 1900, after 2012
    if (year < 2013) {
      if (year > 1899) {
        if (!isNaN(year)) {
          if (!strikesByYear[year]) {
            strikesByYear[year] = 0;
          }
        }

        strikesByYear[year]++;
      }
    }
  });

  const years = Object.keys(strikesByYear);

  const strikesCount = years.map((year) => strikesByYear[year]);

  //Group years into 10 year periods -- NOT COMPLETE
  // function groupYearsIntoTenYearGroups(years) {
  //   //Sort years
  //   const sortedYears = years.sort((a, b) => a - b);

  //   const groups = [];
  //   let currentGroup = [];
  //   let startYear = sortedYears[0];

  //   for (const year of sortedYears) {
  //     if (year - startYear <= 9) {
  //       currentGroup.push(year);
  //     } else {
  //       groups.push(currentGroup);
  //       currentGroup = [year];
  //       startYear = year;
  //     }
  //   }

  //   // Push the last group if it's not empty
  //   if (currentGroup.length > 0) {
  //     groups.push(currentGroup);
  //   }

  //   setGroups(groups);
  // }

  // const strikesCount = groups.map((group) => strikesByDecade[group]);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Strikes by Year",
        data: strikesCount,
        backgroundColor: "rgb(12, 22, 79)",
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
          color: "rgb(38,182,183)",
        },
      },
      y: {
        ticks: {
          color: "rgb(38,182,183)",
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
        text: "Meteorite Strikes by Year from 1900-2012",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: 700,
        color: "white",
        marginTop: "0.5rem",
        background: "rgb(229,231,245)",
        margin: "0.5rem",
        // border: "5px solid white",
        borderRadius: "8px",
      }}
    >
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByYear;
