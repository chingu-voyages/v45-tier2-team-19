import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useDataContext } from "../../hooks/useDataContext";
import useObserver from "../../hooks/useObserver";
// import "../summary/summary.css";
import summary from "./Summary.module.css";
import SliderDemo from "./Slider";

function StrikesByYearFiltered() {
  const meteorData = useDataContext().data;
  const [sliderValue, setSliderValue] = useState([0, 60000000]);
  const [strikesCount, setStrikesCount] = useState([]);
  const [years, setYears] = useState([]);

  const [ref, isIntersecting] = useObserver({
    rootMargin: "-2px",
  });

  useEffect(() => {
    if (!meteorData || meteorData.length === 0) return;

    const massAndYearArray = [];

    meteorData.forEach((meteor) => {
      const massValue = meteor["mass (g)"];
      const mass = massValue ? parseFloat(massValue.split(",").join("")) : 0;
      const year = new Date(meteor.year).getFullYear();

      if (!isNaN(mass) && mass > 0 && year >= 1900 && year <= 2013) {
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

  const handleChange = (newValue) => {
    setSliderValue(newValue);
  };

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Number of Strikes by Mass",
        data: strikesCount, // Use the values of the strikesCount object
        backgroundColor: "#F2D492",
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 5,
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
          callback: function (value, index) {
            if (index % 2 === 0) {
              return years[index];
            }
            return "";
          },
        },
        title: {
          display: true,
          text: "Year",
          color: "#7BA1BF",
          font: {
            size: 18,
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
            size: 18,
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
        text: "Meteorite Strikes by Year from 1900-2012",
        color: "#7BA1BF",
        font: {
          size: 18,
          family: "Plus Jakarta Sans",
        },
      },
    },
  };

  return (
    <div className={summary.gridItem1}>
      {/* <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Typography>Mass Range:</Typography>
        <Slider
          aria-label="mass"
          step={1}
          value={sliderValue}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value} g`}
        />
      </Stack> */}
      <div className={summary.sliderContainer}>
        <div className={summary.slider}>
          <span>Mass range</span>
          <SliderDemo value={sliderValue} onValueChange={handleChange} />
        </div>
        <div className={summary.sliderValue}>
          <span>{sliderValue.join("-")} kg</span>
        </div>
      </div>
      <div className={summary.chartContainer} ref={ref}>
        {isIntersecting && <Bar data={chartData} options={chartOptions} />}
      </div>
    </div>
  );
}

export default StrikesByYearFiltered;
