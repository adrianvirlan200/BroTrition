import { Progress } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

const MacroStats = () => {
  return (
    <div className="p-3 border-gray-200 shadow-sm border-1 rounded-xl grid lg:grid-cols-[10fr_1fr_8fr] sm:grid-cols-1">
      <div>
        <h1 className="text-lg font-semibold mb-4">Energy Summary</h1>
      </div>

      <div>
        <Divider orientation="horizontal" className="lg:hidden" />
        <Divider orientation="vertical" />
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-4">Macronutrients targets</h1>
        <div className="grid grid-cols-[1fr_3fr]">
          <p className="my-3 font-medium text-md">Energy</p>
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
          <p className="my-3 font-medium text-md">Protein</p>
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
          <p className="my-3 font-medium text-md">Carbs</p>
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
          <p className="my-3 font-medium text-md">Fat</p>
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
