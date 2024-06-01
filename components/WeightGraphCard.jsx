"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightGraphCard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Weight",
        data: [],
        backgroundColor: "#7e22ce",
        borderColor: "#7e22ce",
        borderWidth: 1,
        fill: true,
      },
    ],
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/biometrics/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedData = await response.json();

      if (response.ok) {
        const labels = fetchedData.data.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        );
        const data = fetchedData.data.map((entry) => entry.weight);

        setChartData({
          labels,
          datasets: [
            {
              label: "Weight(kg)",
              data,
              borderColor: "#7e22ce",
              backgroundColor: "#7e22ce",
              borderWidth: 2,
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error("catch block executed, Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true,
        text: "Weight Over the Last 6 Months",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        title: {
          display: true,
        },
      },
      y: {
        title: {
          display: true,
          text: "kg",
          maxRotation: 90,
          minRotation: 90,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-4 border-1 border-gray-300 shadow-md">
      <h2 className="text-xl font-bold mb-4">Weight Graph</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeightGraphCard;
