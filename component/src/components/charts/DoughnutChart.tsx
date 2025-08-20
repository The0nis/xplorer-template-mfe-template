// DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

export interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  options?: any;
  width?: string;
  height?: string;
}

// Registering components used in the chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  data,
  options,
  width,
  height,
}) => {
  return (
    <Doughnut
      data={data}
      options={options}
      width={width || "400%"}
      height={height || "200%"}
    />
  );
};

export default DoughnutChart;
