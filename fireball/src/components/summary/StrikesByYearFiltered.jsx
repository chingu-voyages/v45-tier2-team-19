import React from "react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import { useDataContext } from "../../hooks/useDataContext";

function StrikesByYearFiltered() {
  const meteorData = useDataContext().data;
  console.log(meteorData);

  const [sliderValue, setSliderValue] = useState();

  if (meteorData === 0) return;

  const strikesByYear = {};

  meteorData.forEach((meteor) => {
    const year = new Date(meteor.year).getFullYear();

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
    <div className="strikes-by-year-container">
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="mass" value={value} onChange={handleChange} />
      </Stack>
      <Slider disabled defaultValue={30} aria-label="Disabled slider" />
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByYearFiltered;
