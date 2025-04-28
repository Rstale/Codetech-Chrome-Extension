import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TrendsChart({ timeData }) {
  const data = {
    labels: Object.keys(timeData),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: Object.values(timeData).map((seconds) => Math.round(seconds / 60)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Productivity Trends' },
    },
  };

  return (
    <div className="trends-chart">
      <Bar data={data} options={options} />
    </div>
  );
}

export default TrendsChart;