import React from "react";
import BarChart from "./BarChart";
import Piechart from "./PieChart";

function Chart({ originalData }) {
  return (
    <div className="chart-container">
      <div className="pie-chart">
        <Piechart originalData={originalData} />
      </div>
      <div className="bar-chart">
        <BarChart originalData={originalData} />
      </div>
    </div>
  );
}

export default Chart;
