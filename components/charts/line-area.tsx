"use client";

import dynamic from "next/dynamic";
import React, { FC } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LineAreaChart: FC<TChartProps> = ({ chartData, chartOptions }) => {
  return (
    <Chart
      options={chartOptions}
      series={chartData}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineAreaChart;
