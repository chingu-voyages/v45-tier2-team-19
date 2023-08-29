import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import "./summary.css";
import { useDataContext } from "../../hooks/useDataContext";

function StrikesByComposition() {
  const meteorData = useDataContext().data;

  if (meteorData === 0) return;

  const strikesByRecclass = {};

  meteorData.forEach((meteor) => {
    const composition = meteor.recclass;

    if (composition !== "Unknown") {
      if (composition !== undefined) {
        if (!strikesByRecclass[composition]) {
          strikesByRecclass[composition] = 0;
        }
        strikesByRecclass[composition]++;
      }
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

  const chartData = {
    labels: compositions,
    datasets: [
      {
        label: "Number of Strikes",
        data: topTenCompositions,
        fill: false,
        backgroundColor: "rgb(12, 22, 79)",
        borderColor: "rgb(12, 22, 79)",
        pointBackgroundColor: "rgb(12, 22, 79)",
        pointBorderColor: "rgb(38,182,183)",
        pointHoverBackgroundColor: "rgb(38,182,183)",
        pointHoverBorderColor: "rgb(38,182,183)",
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
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        displayColors: false,
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Meteorite Strikes by Composition: Top 10",
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
      <Line data={chartData} options={chartOptions} />
      {/* <div className="learn-more-container">
        <h4 className="title">Learn more about each meteorite type below</h4>
        <div className="types-of-meteorites-grid">
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49702.html">L5 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49619.html">H6 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49813.html">EH4 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49848.html">
              Acapulcoite Meteorites
            </a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">L6 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">LL3-6 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">H5 Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">L Meteorites</a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">
              Diogenite-pm Meteorites
            </a>
          </div>
          <div className="grid-item">
            <a href="https://www.mindat.org/min-49710.html">H4 Meteorites</a>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default StrikesByComposition;
