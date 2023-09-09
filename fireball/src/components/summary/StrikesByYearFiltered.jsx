import React from "react";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useDataContext } from "../../hooks/useDataContext";
import "../summary/summary.css";

function StrikesByYearFiltered() {
  const meteorData = useDataContext().data;
  const [sliderValue, setSliderValue] = useState([0, 10000]);
  const [strikesCount, setStrikesCount] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    if (!meteorData || meteorData.length === 0) return;

    const massAndYearArray = [];

    meteorData.forEach((meteor) => {
      const massValue = meteor["mass (g)"];
      const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;
      const year = new Date(meteor.year).getFullYear();

      if (!isNaN(mass) && mass > 0 && year >= 1900 && year <= 2012) {
        massAndYearArray.push({ mass, year });
      }
    });

    // Filter the array by mass
    const filteredMassAndYearArray = massAndYearArray.filter(
      (item) => item.mass >= sliderValue[0] && item.mass <= sliderValue[1]
    );

    const strikesByYear = {};

    filteredMassAndYearArray.forEach((item) => {
      const year = item.year;

      if (!strikesByYear[year]) {
        strikesByYear[year] = 0;
      }

      strikesByYear[year]++;
    });

    const years = Object.keys(strikesByYear);
    const strikesCount = years.map((year) => strikesByYear[year]);

    setYears(years);
    setStrikesCount(strikesCount);
  }, [meteorData, sliderValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Strikes by Mass",
        data: strikesCount, // Use the values of the strikesCount object
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
          color: "#F2D492",
        },
        title: {
          display: true,
          text: "Number of Strikes",
          color: "#F2D492",
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
        <Typography>Mass Range:</Typography>
        <Slider

          aria-label="mass"
          step={0.01}
          value={sliderValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} g`}


        />
      </Stack>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

export default StrikesByYearFiltered;
