"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import NoDataVisChart from "./noDataVisChart";
import styles from "./visChart.module.scss";
import useFnDataQuery, { convertFnData2Table } from "@/query/useFnDataQuery";

const VisChart = () => {
  const query = useFnDataQuery();

  if (!query.data || query.data.length === 0) {
    return <NoDataVisChart />;
  }

  const tableData = convertFnData2Table(query.data);

  const accountName = Object.keys(tableData[0]).filter((key) => key !== "date");

  return (
    <ResponsiveContainer
      height="100%"
      width="100%"
      className={styles.chart_container}
    >
      <BarChart
        data={tableData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={axisFormater} />
        <Tooltip formatter={axisFormater} />
        <Legend />
        {accountName.map((column, i) => (
          <Bar key={column} dataKey={column} fill={colors[i % colors.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisChart;

const colors = [
  "#8884d8",
  "#82ca92",
  "#f8d568",
  "#f76c6c",
  "#6bf7b8",
  "#a678db",
  "#f8b3eb",
];
const axisFormater = (number: number) => {
  const isMinus = number < 0;
  number = Math.abs(number);

  const prefix = isMinus ? "-" : "";

  if (number > 1_000_000_000_000) {
    return prefix + (number / 1_000_000_000_000).toFixed(2) + "조";
  } else if (number > 100_000_000) {
    return prefix + (number / 100_000_000).toFixed(0) + "억";
  } else if (number > 10_000) {
    return prefix + (number / 10_000).toFixed(0) + "만";
  } else {
    return prefix + number.toString();
  }
};
