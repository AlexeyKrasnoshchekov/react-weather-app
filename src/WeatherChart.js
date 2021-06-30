import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ xlabels, ytemps }) => {
  // let timeFormat = (new Date(time * 1000)).getHours();
  

  
  
  const data = {
    labels: xlabels,
    datasets: [
      {
        label: "degrees",
        data: ytemps,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0)",
        borderColor: "rgba(255, 255, 255)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
