"use client";
import { Progress, Tooltip } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
ChartJS.register(ArcElement, Legend);

const MacroStats = () => {
  const data_consumed = {
    // labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [300, 50, 100],
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
        data: [2200, 350],
        backgroundColor: ["#9333ea", "#0d9488"],
      },
    ],
  };

  const data_remaining = {
    // labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [3000 - 350, 350],
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
                <h1 className="font-bold">Calories consumed: 2000 Kcal</h1>
                <Divider orientation="horizontal" />
                <p className="text-green-600 font-semibold">
                  Protein: 300 Kcal
                </p>
                <p className="text-blue-600 font-semibold">Carbs: 50 Kcal</p>
                <p className="text-red-600 font-semibold">Fat: 100 Kcal</p>
              </div>
            }
          >
            <div className="content-center">
              <Doughnut
                data={data_consumed}
                className="min-w-28 max-w-28 min-h-28 max-h-28 mx-auto"
              />
              <p className="text-center font-bold text-base">Consumed</p>
              <p className="text-center font-semibold text-sm">2300 Kcal</p>
            </div>
          </Tooltip>

          <Tooltip
            placement="top"
            content={
              <div>
                <h1 className="font-bold">Calories burned: 1800 Kcal</h1>
                <Divider orientation="horizontal" />
                <p className="text-purple-600 font-semibold">BMR: 1500 Kcal</p>
                <p className="text-purple-600 font-semibold">
                  Lifestyle Factor(1.2): 320 kcal
                </p>
                <p className="text-teal-600 font-semibold">
                  Activity: 300 Kcal
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
              <p className="text-center font-semibold text-sm">2300 Kcal</p>
            </div>
          </Tooltip>

          <Tooltip
            placement="top"
            content={
              <div>
                <h1 className="font-bold">Calories Goal: 1800 Kcal</h1>
                <Divider orientation="horizontal" />
                <p className="text-stone-700 font-semibold">
                  Consumed: 1500 Kcal
                </p>
                <p className="text-stone-500 font-semibold">
                  Remaining: 300 Kcal
                </p>
              </div>
            }
          >
            <div>
              <Doughnut
                data={data_remaining}
                className="min-w-28 max-w-28 min-h-28 max-h-28 mx-auto"
              />
              <p className="text-center font-bold text-base">Remaining</p>
              <p className="text-center font-semibold text-sm">2300 Kcal</p>
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
          <p className="my-3 font-medium text-base">Energy</p>
          <Progress
            label="1200 Kcal / 2200 Kcal"
            color="success"
            value={50}
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
            label="20.3g / 120.6g"
            color="success"
            value={65}
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
            label="80.9g / 220.6g"
            color="primary"
            value={85}
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
            label="18.4g / 60.2g"
            color="success"
            value={60}
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
