import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = (props) => {
  const new_data = {
    labels: props.data1.map((d) => {
      const dbdate = new Date(d.date);
      return `${dbdate.getHours()}:${dbdate.getMinutes()}:${dbdate.getSeconds()}`;
    }),
    datasets: [
      {
        label: "sensor_1",
        data: props.data1.map((d) => d.temperature),
        borderWidth: 1,
        pointRadius: 1,
        borderColor: "rgb(255, 0, 0)",
      },
      {
        label: "sensor_2",
        data: props.data2.map((d) => d.temperature),
        borderWidth: 1,
        pointRadius: 1,
        borderColor: "rgb(0, 0, 0)",
      },
    ],
  };
  return (
    <div>
      <div className="centered" style={{ width: 900 }}>
        <p style={{ fontSize: 12 }}>Temperature</p>
        <Line data={new_data} />
      </div>
        <p style={{ fontSize: 12 }}>Time</p>
    </div>
  );
};

export default Chart;
