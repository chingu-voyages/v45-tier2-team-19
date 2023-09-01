import React from "react";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useDataContext } from "../../hooks/useDataContext";

function StrikesByYearFiltered() {
  const meteorData = useDataContext().data;
  console.log(meteorData);

  const [sliderValue, setSliderValue] = useState([0, 10000]);

  if (meteorData === 0) return;

  const massAndYearArray = [];

  meteorData.forEach((meteor) => {
    const massValue = meteor["mass (g)"];
    const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;
    const year = new Date(meteor.year).getFullYear();

    if (!isNaN(mass) && mass > 0 && year >= 1900 && year <= 2012) {
      massAndYearArray.push({ mass, year });
    }
  });
  console.log(massAndYearArray);

  //Filter array by mass
  massAndYearArray.sort((a, b) => a.mass - b.mass);

  const filteredMassAndYearArray = massAndYearArray.filter(
    (item) => item.mass >= sliderValue
  );

  const strikesByYear = {};

  filteredMassAndYearArray.forEach((item) => {
    const year = item.year;

    if (!strikesByYear[year]) {
      strikesByYear[year] = 0;
    }

    strikesByYear[year]++;
  });
  console.log(sliderValue);
  const years = Object.keys(strikesByYear);
  const strikesCount = years.map((year) => strikesByYear[year]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

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
        <Slider
          aria-label="mass"
          step={0.01}
          value={sliderValue}
          onChange={handleChange}
        />
      </Stack>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByYearFiltered;
