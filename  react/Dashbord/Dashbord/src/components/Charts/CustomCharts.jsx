import React from "react";
import styles from "./CustomCharts.module.css";
import { Line } from "react-chartjs-2";
import { plugins } from "chart.js";

const CustomCharts = ({ data, size = "medium" }) => {
  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: false
      }
    }
  };
  return (
    <div className={`${styles.chartContainer} ${styles[size]}`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomCharts;
