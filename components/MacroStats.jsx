"use client";
import { Progress, Tooltip } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { useEffect, useState } from "react";
ChartJS.register(ArcElement, Legend);

const MacroStats = ({ updateSignal }) => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/macroStats/fetch",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedData = await response.json();

      if (response.ok) {
        setData(fetchedData.data);

        console.log(data);
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

  const data_consumed = {
    // labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [
          data.totalProteinConsumedCalories,
          data.totalCarbohydrateConsumedCalories,
          data.totalLipidConsumedCalories,
        ],
        backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"],
      },
    ],
    responsive: true,
    maintainAspectRatio: false,
  };

  const data_burned = {
    // labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [data.TDEE, data.activity],
        backgroundColor: ["#9333ea", "#0d9488"],
      },
    ],
  };

  // data.caloriesRemaining,
  // Math.abs(data.totalCaloriesConsumed - data.caloriesRemaining),
  let aux1 = 0;
  let aux2 = 0;
  if (data.caloriesRemaining > 0) {
    aux2 = data.totalCaloriesConsumed;
    aux1 = data.caloriesRemaining;
  } else {
    aux2 = data.totalCaloriesConsumed;
    aux1 = 0;
  }

  const data_remaining = {
    // labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [aux1, aux2],
        backgroundColor: ["#a8a29e", "#44403c"],
      },
    ],
  };

  return (
    <div className="p-3 border-gray-200 shadow-sm border-1 rounded-xl grid lg:grid-cols-[10fr_1fr_8fr] sm:grid-cols-1">
      <div className="mb-3">
        <h1 className="text-lg font-semibold mb-4">Energy Summary</h1>

        <div className="grid grid-cols-3 content-center min-w-fit">
          <Tooltip
            placement="top"
            content={
              <div>
                <h1 className="font-bold">
                  Calories consumed: {data.totalCaloriesConsumed} Kcal
                </h1>
                <Divider orientation="horizontal" />
                <p className="text-green-600 font-semibold">
                  Protein: {data.totalProteinConsumedCalories} Kcal
                </p>
                <p className="text-blue-600 font-semibold">
                  Carbs: {data.totalCarbohydrateConsumedCalories} Kcal
                </p>
                <p className="text-red-600 font-semibold">
                  Fat: {data.totalLipidConsumedCalories} Kcal
                </p>
              </div>
            }
          >
            <div className="content-center">
              <Doughnut
                data={data_consumed}
                className="min-w-28 max-w-28 min-h-28 max-h-28 mx-auto"
              />
              <p className="text-center font-bold text-base">Consumed</p>
              <p className="text-center font-semibold text-sm">
                {data.totalCaloriesConsumed} Kcal
              </p>
            </div>
          </Tooltip>

          <Tooltip
            placement="top"
            content={
              <div>
                <h1 className="font-bold">
                  Calories burned: {data.totalCaloriesBurned} Kcal
                </h1>
                <Divider orientation="horizontal" />
                <p className="text-purple-600 font-semibold">
                  BMR: {data.BMR} Kcal
                </p>
                <p className="text-purple-600 font-semibold">
                  Lifestyle Factor({data.lifestyleFactor}):{" "}
                  {data.lifestyleCalories} kcal{" "}
                </p>
                <p className="text-purple-600 font-semibold">
                  {String(data.goal).toUpperCase()} weight calories:{" "}
                  {data.goalCalories} kcal
                </p>
                <p className="text-teal-600 font-semibold">
                  Activity: {data.activity} Kcal
                </p>
              </div>
            }
          >
            <div>
              <Doughnut
                data={data_burned}
                className="min-w-28 max-w-28 min-h-28 max-h-28 mx-auto"
              />
              <p className="text-center font-bold text-base">Burned</p>
              <p className="text-center font-semibold text-sm">
                {data.totalCaloriesBurned} Kcal
              </p>
            </div>
          </Tooltip>

          <Tooltip
            placement="top"
            content={
              <div>
                <h1 className="font-bold">
                  Calories Goal: {data.totalCaloriesBurned} Kcal
                </h1>
                <Divider orientation="horizontal" />
                <p className="text-stone-700 font-semibold">
                  Consumed: {data.totalCaloriesConsumed} Kcal
                </p>
                <p className="text-stone-500 font-semibold">
                  {data.caloriesRemaining > 0 ? "Remaining: " : "Over: "}
                  {Math.trunc(Math.abs(data.caloriesRemaining) * 10) / 10} Kcal
                </p>
              </div>
            }
          >
            <div>
              <Doughnut
                data={data_remaining}
                className="min-w-28 max-w-28 min-h-28 max-h-28 mx-auto"
              />
              <p className="text-center font-bold text-base">
                {data.caloriesRemaining > 0 ? "Remaining: " : "Over: "}
              </p>
              <p className="text-center font-semibold text-sm">
                {Math.trunc(Math.abs(data.caloriesRemaining) * 10) / 10} Kcal
              </p>
            </div>
          </Tooltip>
        </div>
      </div>

      <div>
        <Divider orientation="horizontal" className="lg:hidden" />
        <Divider orientation="vertical" />
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-4">Macronutrients targets</h1>
        <div className="grid grid-cols-[1fr_3fr]">
          <p className="my-2 font-medium text-base">Energy</p>
          <Progress
            label={
              data.totalCaloriesConsumed +
              " kcal / " +
              data.totalCaloriesBurned +
              " kcal"
            }
            color="success"
            value={data.caloriesPercentage}
            size="md"
            aria-label="Energy"
            showValueLabel={true}
            classNames={{
              base: "max-w-lg gap-0",
              track: "drop-shadow-md border-1 border-yellow-500",
              indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
              label: "font-medium text-xs",
              value: "text-foreground/80 text-xs",
            }}
          />
          <p className="my-2 font-medium text-base">Protein</p>
          <Progress
            label={
              data.totalProteinConsumed + " g / " + data.proteinNeeded + " g"
            }
            color="success"
            value={data.proteinPercentage}
            size="md"
            aria-label="Protein"
            showValueLabel={true}
            classNames={{
              base: "max-w-lg gap-0",
              track: "drop-shadow-md border-1 border-green-600",
              indicator: "bg-gradient-to-r from-green-400 to-green-600",
              label: "font-medium text-xs",
              value: "text-foreground/80 text-xs",
            }}
          />
          <p className="my-2 font-medium text-base">Carbs</p>
          <Progress
            label={
              data.totalCarbohydrateConsumed +
              " g / " +
              data.carbohydrateNeeded +
              " g"
            }
            color="primary"
            value={data.carbohydratePercentage}
            size="md"
            aria-label="Carbohydrates"
            showValueLabel={true}
            classNames={{
              base: "max-w-md gap-0",
              track: "drop-shadow-md border-1 border-blue-600",
              indicator: "bg-gradient-to-r from-blue-400 to-blue-600",
              label: "font-medium text-xs",
              value: "text-foreground/80 text-xs",
            }}
          />
          <p className="my-2 font-medium text-md">Fat</p>
          <Progress
            label={data.totalLipidConsumed + " g / " + data.lipidNeeded + " g"}
            color="success"
            value={data.lipidPercentage}
            size="md"
            aria-label="Fat"
            showValueLabel={true}
            classNames={{
              base: "max-w-md gap-0",
              track: "drop-shadow-md border-1 border-red-600",
              indicator: "bg-gradient-to-r from-red-400 to-red-600",
              label: "font-medium text-xs",
              value: "text-foreground/80 text-xs",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MacroStats;
