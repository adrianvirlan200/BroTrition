"use client";
import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";

const NutrientProgress = ({ nutrient, value, recommendedValue, units }) => {
  const percentage = (value / recommendedValue) * 100;

  return (
    <div className="p-2 grid grid-cols-[2fr_1fr_1fr] items-center">
      <h1 className="text-l font-semibold">{nutrient}</h1>
      <Progress color="default" aria-label={nutrient} value={percentage} />
      <p className="mx-2">
        {value} {units}
      </p>
    </div>
  );
};

const MicroStats = ({ updateSignal, currentDate }) => {
  const [data, setData] = useState({
    Id: 0,
    Category: "",
    Description: "",
    Alpha_Carotene: {
      value: 0,
      recommendedValue: "700",
      units: "µg",
    },
    Beta_Carotene: {
      value: 0,
      recommendedValue: "3000-6000",
      units: "µg",
    },
    Beta_Cryptoxanthin: {
      value: 0,
      recommendedValue: "400",
      units: "µg",
    },
    Calcium: {
      value: 0,
      recommendedValue: "1000",
      units: "mg",
    },
    Cholesterol: {
      value: 0,
      recommendedValue: "300",
      units: "mg",
    },
    Choline: {
      value: 0,
      recommendedValue: "550",
      units: "mg",
    },
    Copper: {
      value: 0,
      recommendedValue: "900",
      units: "µg",
    },
    Fiber: {
      value: 0,
      recommendedValue: "25-30",
      units: "g",
    },
    Iron: {
      value: 0,
      recommendedValue: "8-18",
      units: "mg",
    },
    Lutein_and_Zeaxanthin: {
      value: 0,
      recommendedValue: "10000",
      units: "µg",
    },
    Lycopene: {
      value: 0,
      recommendedValue: "10000",
      units: "µg",
    },
    Magnesium: {
      value: 0,
      recommendedValue: "400",
      units: "mg",
    },
    Niacin: {
      value: 0,
      recommendedValue: "16",
      units: "mg",
    },
    Phosphorus: {
      value: 0,
      recommendedValue: "700",
      units: "mg",
    },
    Potassium: {
      value: 0,
      recommendedValue: "4700",
      units: "mg",
    },
    Retinol: {
      value: 0,
      recommendedValue: "900",
      units: "µg",
    },
    Riboflavin: {
      value: 0,
      recommendedValue: "1.3",
      units: "mg",
    },
    Selenium: {
      value: 0,
      recommendedValue: "55",
      units: "µg",
    },
    Sodium: {
      value: 0,
      recommendedValue: "2300",
      units: "mg",
    },
    Sugar_Total: {
      value: 0,
      recommendedValue: "25-37.5",
      units: "g",
    },
    Thiamin: {
      value: 0,
      recommendedValue: "1.2",
      units: "mg",
    },
    Total_Lipid: {
      value: 0,
      recommendedValue: "70",
      units: "g",
    },
    Vitamin_A_RAE: {
      value: 0,
      recommendedValue: "900",
      units: "µg",
    },
    Vitamin_B12: {
      value: 0,
      recommendedValue: "2.4",
      units: "µg",
    },
    Vitamin_B6: {
      value: 0,
      recommendedValue: "1.3",
      units: "mg",
    },
    Vitamin_C: {
      value: 0,
      recommendedValue: "90",
      units: "mg",
    },
    Vitamin_E: {
      value: 0,
      recommendedValue: "15",
      units: "mg",
    },
    Vitamin_K: {
      value: 0,
      recommendedValue: "120",
      units: "µg",
    },
    Water: {
      value: 0,
      recommendedValue: "3700",
      units: "ml",
    },
    Zinc: {
      value: 0,
      recommendedValue: "11",
      units: "mg",
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/microStats/fetch" + "?date=" + currentDate,
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
  }, [updateSignal, currentDate]);

  return (
    <div className="rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div>
        <div className="border-1 border-gray-300 rounded-xl">
          <div className="bg-gray-100 rounded-t-xl p-1 px-4 text-l font-semibold">
            Vitamins
          </div>
          <div className="p-2">
            <NutrientProgress
              nutrient="Vitamin A"
              value={data.Vitamin_A_RAE.value}
              recommendedValue={data.Vitamin_A_RAE.recommendedValue}
              units={data.Vitamin_A_RAE.units}
            />
            <NutrientProgress
              nutrient="Vitamin B12"
              value={data.Vitamin_B12.value}
              recommendedValue={data.Vitamin_B12.recommendedValue}
              units={data.Vitamin_B12.units}
            />
            <NutrientProgress
              nutrient="Vitamin B6"
              value={data.Vitamin_B6.value}
              recommendedValue={data.Vitamin_B6.recommendedValue}
              units={data.Vitamin_B6.units}
            />
            <NutrientProgress
              nutrient="Vitamin C"
              value={data.Vitamin_C.value}
              recommendedValue={data.Vitamin_C.recommendedValue}
              units={data.Vitamin_C.units}
            />
            <NutrientProgress
              nutrient="Vitamin E"
              value={data.Vitamin_E.value}
              recommendedValue={data.Vitamin_E.recommendedValue}
              units={data.Vitamin_E.units}
            />
            <NutrientProgress
              nutrient="Vitamin K"
              value={data.Vitamin_K.value}
              recommendedValue={data.Vitamin_K.recommendedValue}
              units={data.Vitamin_K.units}
            />
          </div>
        </div>
        <div className="border-1 border-gray-300 rounded-xl max-h-fit mt-2">
          <div className="bg-gray-100 rounded-t-xl p-1 px-4 text-l font-semibold">
            Other
          </div>
          <div className="p-2">
            <NutrientProgress
              nutrient="Alpha Carotene"
              value={data.Alpha_Carotene.value}
              recommendedValue={data.Alpha_Carotene.recommendedValue}
              units={data.Alpha_Carotene.units}
            />
            <NutrientProgress
              nutrient="Beta Carotene"
              value={data.Beta_Carotene.value}
              recommendedValue={data.Beta_Carotene.recommendedValue}
              units={data.Beta_Carotene.units}
            />
            <NutrientProgress
              nutrient="Beta Cryptoxanthin"
              value={data.Beta_Cryptoxanthin.value}
              recommendedValue={data.Beta_Cryptoxanthin.recommendedValue}
              units={data.Beta_Cryptoxanthin.units}
            />
            <NutrientProgress
              nutrient="Cholesterol"
              value={data.Cholesterol.value}
              recommendedValue={data.Cholesterol.recommendedValue}
              units={data.Cholesterol.units}
            />
            <NutrientProgress
              nutrient="Choline"
              value={data.Choline.value}
              recommendedValue={data.Choline.recommendedValue}
              units={data.Choline.units}
            />
            <NutrientProgress
              nutrient="Fiber"
              value={data.Fiber.value}
              recommendedValue={data.Fiber.recommendedValue}
              units={data.Fiber.units}
            />
            <NutrientProgress
              nutrient="Lutein and Zeaxanthin"
              value={data.Lutein_and_Zeaxanthin.value}
              recommendedValue={data.Lutein_and_Zeaxanthin.recommendedValue}
              units={data.Lutein_and_Zeaxanthin.units}
            />
            <NutrientProgress
              nutrient="Lycopene"
              value={data.Lycopene.value}
              recommendedValue={data.Lycopene.recommendedValue}
              units={data.Lycopene.units}
            />
            <NutrientProgress
              nutrient="Niacin"
              value={data.Niacin.value}
              recommendedValue={data.Niacin.recommendedValue}
              units={data.Niacin.units}
            />
            <NutrientProgress
              nutrient="Retinol"
              value={data.Retinol.value}
              recommendedValue={data.Retinol.recommendedValue}
              units={data.Retinol.units}
            />
            <NutrientProgress
              nutrient="Riboflavin"
              value={data.Riboflavin.value}
              recommendedValue={data.Riboflavin.recommendedValue}
              units={data.Riboflavin.units}
            />
            <NutrientProgress
              nutrient="Sugar Total"
              value={data.Sugar_Total.value}
              recommendedValue={data.Sugar_Total.recommendedValue}
              units={data.Sugar_Total.units}
            />
            <NutrientProgress
              nutrient="Thiamin"
              value={data.Thiamin.value}
              recommendedValue={data.Thiamin.recommendedValue}
              units={data.Thiamin.units}
            />
            <NutrientProgress
              nutrient="Water"
              value={data.Water.value}
              recommendedValue={data.Water.recommendedValue}
              units={data.Water.units}
            />
            <NutrientProgress
              nutrient="Total Lipid"
              value={data.Total_Lipid.value}
              recommendedValue={data.Total_Lipid.recommendedValue}
              units={data.Total_Lipid.units}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="border-1 border-gray-300 rounded-xl">
          <div className="bg-gray-100 rounded-t-xl p-1 px-4 text-l font-semibold">
            Minerals
          </div>
          <div className="p-2">
            <NutrientProgress
              nutrient="Calcium"
              value={data.Calcium.value}
              recommendedValue={data.Calcium.recommendedValue}
              units={data.Calcium.units}
            />
            <NutrientProgress
              nutrient="Copper"
              value={data.Copper.value}
              recommendedValue={data.Copper.recommendedValue}
              units={data.Copper.units}
            />
            <NutrientProgress
              nutrient="Iron"
              value={data.Iron.value}
              recommendedValue={data.Iron.recommendedValue}
              units={data.Iron.units}
            />
            <NutrientProgress
              nutrient="Magnesium"
              value={data.Magnesium.value}
              recommendedValue={data.Magnesium.recommendedValue}
              units={data.Magnesium.units}
            />
            <NutrientProgress
              nutrient="Phosphorus"
              value={data.Phosphorus.value}
              recommendedValue={data.Phosphorus.recommendedValue}
              units={data.Phosphorus.units}
            />
            <NutrientProgress
              nutrient="Potassium"
              value={data.Potassium.value}
              recommendedValue={data.Potassium.recommendedValue}
              units={data.Potassium.units}
            />
            <NutrientProgress
              nutrient="Sodium"
              value={data.Sodium.value}
              recommendedValue={data.Sodium.recommendedValue}
              units={data.Sodium.units}
            />
            <NutrientProgress
              nutrient="Zinc"
              value={data.Zinc.value}
              recommendedValue={data.Zinc.recommendedValue}
              units={data.Zinc.units}
            />
            <NutrientProgress
              nutrient="Selenium"
              value={data.Selenium.value}
              recommendedValue={data.Selenium.recommendedValue}
              units={data.Selenium.units}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MicroStats;
