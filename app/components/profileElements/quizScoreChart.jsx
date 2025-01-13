import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

// Rejestracja modułów Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

function QuizScoreChart({ gameResults }) {
  const sortedResults = [...gameResults]
    .sort((a, b) => new Date(a.game.startedAt) - new Date(b.game.startedAt))
    .slice(-10);

  const labels = sortedResults.map((result) =>
    new Date(result.game.startedAt).toLocaleString("pl-PL", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    })
  );

  const scores = sortedResults.map((result) => result.score);

  const data = {
    labels,
    datasets: [
      {
        label: "Uzyskane punkty",
        data: scores,
        fill: false,
        borderColor: "#58cc02",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Data gry",
        },
      },
      y: {
        title: {
          display: false,
          text: "Punkty",
        },
        beginAtZero: false,
      },
    },
  };

  return (
    <div className='w-full h-[280px] flex flex-col gap-2 justify-center items-center bg-background2 rounded-2xl sm:px-2 px-1 py-4'>
      <h4 className='text-sm font-[500] text-descriptionColor'>
        Zdobyte punkty (ostatnie 10 gier)
      </h4>
      <Line data={data} options={options} />
    </div>
  );
}

export default QuizScoreChart;
