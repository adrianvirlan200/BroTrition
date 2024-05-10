"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CalHistory = ({ updateSignal }) => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/calHistory/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedData = await response.json();

      if (response.ok) {
        setData(fetchedData.data);
      }

      if (fetchedData.status === 500) {
        console.log("Fatal Error;");
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateSignal]);

  console.log(data.data);

  const data_chart = {
    labels: data.label,
    datasets: [
      {
        label: "",
        data: data.data,
        backgroundColor: "#6b21a8",
        borderRadius: 10,
      },
    ],
    responsive: true,
    maintainAspectRatio: false,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Calories consumed over last 3 weeks",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${data.dates[tooltipItem.dataIndex]}: ${
              tooltipItem.raw
            } kcal`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar
      data={data_chart}
      options={options}
      className="max-w-64 max-h-72 border-gray-200 border-1 rounded-2xl mt-4"
    />
  );
};

export default CalHistory;
