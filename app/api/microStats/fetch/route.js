import executeQuery from "@server/db.js";
import { displayNumberOfCalories, truncMacro } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const params = new URL(request.url).searchParams;
    const date = params.get("date");

    const dailyRecommendedDoses = {
      Alpha_Carotene: { value: "700", units: "µg" },
      Beta_Carotene: { value: "3000-6000", units: "µg" },
      Beta_Cryptoxanthin: { value: "400", units: "µg" },
      Cholesterol: { value: "300", units: "mg" },
      Choline: { value: "550", units: "mg" },
      Fiber: { value: "25-30", units: "g" },
      Lutein_and_Zeaxanthin: { value: "10000", units: "µg" },
      Lycopene: { value: "10000", units: "µg" },
      Niacin: { value: "16", units: "mg" },
      Retinol: { value: "900", units: "µg" },
      Riboflavin: { value: "1.3", units: "mg" },
      Selenium: { value: "55", units: "µg" },
      Sugar_Total: { value: "25-37.5", units: "g" },
      Thiamin: { value: "1.2", units: "mg" },
      Water: { value: "3700", units: "ml" },
      Total_Lipid: { value: "70", units: "g" },
      Calcium: { value: "1000", units: "mg" },
      Copper: { value: "900", units: "µg" },
      Iron: { value: "8-18", units: "mg" },
      Magnesium: { value: "400", units: "mg" },
      Phosphorus: { value: "700", units: "mg" },
      Potassium: { value: "4700", units: "mg" },
      Sodium: { value: "2300", units: "mg" },
      Zinc: { value: "11", units: "mg" },
      Vitamin_A_RAE: { value: "900", units: "µg" },
      Vitamin_B12: { value: "2.4", units: "µg" },
      Vitamin_B6: { value: "1.3", units: "mg" },
      Vitamin_C: { value: "90", units: "mg" },
      Vitamin_E: { value: "15", units: "mg" },
      Vitamin_K: { value: "120", units: "µg" },
    };

    const query = `
      SELECT 
        nutrition_data.Id, 
        nutrition_data.Category, 
        nutrition_data.Description, 
        nutrition_data.Alpha_Carotene, 
        nutrition_data.Beta_Carotene, 
        nutrition_data.Beta_Cryptoxanthin, 
        nutrition_data.Cholesterol, 
        nutrition_data.Choline, 
        nutrition_data.Fiber, 
        nutrition_data.Lutein_and_Zeaxanthin, 
        nutrition_data.Lycopene, 
        nutrition_data.Niacin, 
        nutrition_data.Retinol, 
        nutrition_data.Riboflavin, 
        nutrition_data.Selenium, 
        nutrition_data.Sugar_Total, 
        nutrition_data.Thiamin, 
        nutrition_data.Water, 
        nutrition_data.Total_Lipid, 
        nutrition_data.Calcium, 
        nutrition_data.Copper, 
        nutrition_data.Iron, 
        nutrition_data.Magnesium, 
        nutrition_data.Phosphorus, 
        nutrition_data.Potassium, 
        nutrition_data.Sodium, 
        nutrition_data.Zinc, 
        nutrition_data.Vitamin_A_RAE, 
        nutrition_data.Vitamin_B12, 
        nutrition_data.Vitamin_B6, 
        nutrition_data.Vitamin_C, 
        nutrition_data.Vitamin_E, 
        nutrition_data.Vitamin_K, 
        food_log.quantity
      FROM 
        food_log
      INNER JOIN 
        nutrition_data ON nutrition_data.Id = food_log.foodID
      WHERE 
        food_log.userID = ? AND DATE(food_log.dateCreated) = ?;
    `;
    const nutrients = await executeQuery(query, [session.user.id, date]);

    const totalNutrients = {
      Alpha_Carotene: 0,
      Beta_Carotene: 0,
      Beta_Cryptoxanthin: 0,
      Cholesterol: 0,
      Choline: 0,
      Fiber: 0,
      Lutein_and_Zeaxanthin: 0,
      Lycopene: 0,
      Niacin: 0,
      Retinol: 0,
      Riboflavin: 0,
      Selenium: 0,
      Sugar_Total: 0,
      Thiamin: 0,
      Water: 0,
      Total_Lipid: 0,
      Calcium: 0,
      Copper: 0,
      Iron: 0,
      Magnesium: 0,
      Phosphorus: 0,
      Potassium: 0,
      Sodium: 0,
      Zinc: 0,
      Vitamin_A_RAE: 0,
      Vitamin_B12: 0,
      Vitamin_B6: 0,
      Vitamin_C: 0,
      Vitamin_E: 0,
      Vitamin_K: 0,
    };

    nutrients.forEach((result) => {
      totalNutrients.Alpha_Carotene += result.Alpha_Carotene;
      totalNutrients.Beta_Carotene += result.Beta_Carotene;
      totalNutrients.Beta_Cryptoxanthin += result.Beta_Cryptoxanthin;
      totalNutrients.Cholesterol += result.Cholesterol;
      totalNutrients.Choline += result.Choline;
      totalNutrients.Fiber += result.Fiber;
      totalNutrients.Lutein_and_Zeaxanthin += result.Lutein_and_Zeaxanthin;
      totalNutrients.Lycopene += result.Lycopene;
      totalNutrients.Niacin += result.Niacin;
      totalNutrients.Retinol += result.Retinol;
      totalNutrients.Riboflavin += result.Riboflavin;
      totalNutrients.Selenium += result.Selenium;
      totalNutrients.Sugar_Total += result.Sugar_Total;
      totalNutrients.Thiamin += result.Thiamin;
      totalNutrients.Water += result.Water;
      totalNutrients.Total_Lipid += result.Total_Lipid;
      totalNutrients.Calcium += result.Calcium;
      totalNutrients.Copper += result.Copper;
      totalNutrients.Iron += result.Iron;
      totalNutrients.Magnesium += result.Magnesium;
      totalNutrients.Phosphorus += result.Phosphorus;
      totalNutrients.Potassium += result.Potassium;
      totalNutrients.Sodium += result.Sodium;
      totalNutrients.Zinc += result.Zinc;
      totalNutrients.Vitamin_A_RAE += result.Vitamin_A_RAE;
      totalNutrients.Vitamin_B12 += result.Vitamin_B12;
      totalNutrients.Vitamin_B6 += result.Vitamin_B6;
      totalNutrients.Vitamin_C += result.Vitamin_C;
      totalNutrients.Vitamin_E += result.Vitamin_E;
      totalNutrients.Vitamin_K += result.Vitamin_K;
    });

    const data = {
      Alpha_Carotene: {
        value: truncMacro(totalNutrients.Alpha_Carotene),
        recommendedValue: truncMacro(
          dailyRecommendedDoses.Alpha_Carotene.value
        ),
        units: dailyRecommendedDoses.Alpha_Carotene.units,
      },
      Beta_Carotene: {
        value: truncMacro(totalNutrients.Beta_Carotene),
        recommendedValue: truncMacro(dailyRecommendedDoses.Beta_Carotene.value),
        units: dailyRecommendedDoses.Beta_Carotene.units,
      },
      Beta_Cryptoxanthin: {
        value: truncMacro(totalNutrients.Beta_Cryptoxanthin),
        recommendedValue: truncMacro(
          dailyRecommendedDoses.Beta_Cryptoxanthin.value
        ),
        units: dailyRecommendedDoses.Beta_Cryptoxanthin.units,
      },
      Cholesterol: {
        value: truncMacro(totalNutrients.Cholesterol),
        recommendedValue: truncMacro(dailyRecommendedDoses.Cholesterol.value),
        units: dailyRecommendedDoses.Cholesterol.units,
      },
      Choline: {
        value: truncMacro(totalNutrients.Choline),
        recommendedValue: truncMacro(dailyRecommendedDoses.Choline.value),
        units: dailyRecommendedDoses.Choline.units,
      },
      Fiber: {
        value: truncMacro(totalNutrients.Fiber),
        recommendedValue: truncMacro(dailyRecommendedDoses.Fiber.value),
        units: dailyRecommendedDoses.Fiber.units,
      },
      Lutein_and_Zeaxanthin: {
        value: truncMacro(totalNutrients.Lutein_and_Zeaxanthin),
        recommendedValue: truncMacro(
          dailyRecommendedDoses.Lutein_and_Zeaxanthin.value
        ),
        units: dailyRecommendedDoses.Lutein_and_Zeaxanthin.units,
      },
      Lycopene: {
        value: truncMacro(totalNutrients.Lycopene),
        recommendedValue: truncMacro(dailyRecommendedDoses.Lycopene.value),
        units: dailyRecommendedDoses.Lycopene.units,
      },
      Niacin: {
        value: truncMacro(totalNutrients.Niacin),
        recommendedValue: truncMacro(dailyRecommendedDoses.Niacin.value),
        units: dailyRecommendedDoses.Niacin.units,
      },
      Retinol: {
        value: truncMacro(totalNutrients.Retinol),
        recommendedValue: truncMacro(dailyRecommendedDoses.Retinol.value),
        units: dailyRecommendedDoses.Retinol.units,
      },
      Riboflavin: {
        value: truncMacro(totalNutrients.Riboflavin),
        recommendedValue: truncMacro(dailyRecommendedDoses.Riboflavin.value),
        units: dailyRecommendedDoses.Riboflavin.units,
      },
      Selenium: {
        value: truncMacro(totalNutrients.Selenium),
        recommendedValue: truncMacro(dailyRecommendedDoses.Selenium.value),
        units: dailyRecommendedDoses.Selenium.units,
      },
      Sugar_Total: {
        value: truncMacro(totalNutrients.Sugar_Total),
        recommendedValue: truncMacro(dailyRecommendedDoses.Sugar_Total.value),
        units: dailyRecommendedDoses.Sugar_Total.units,
      },
      Thiamin: {
        value: truncMacro(totalNutrients.Thiamin),
        recommendedValue: truncMacro(dailyRecommendedDoses.Thiamin.value),
        units: dailyRecommendedDoses.Thiamin.units,
      },
      Water: {
        value: truncMacro(totalNutrients.Water),
        recommendedValue: truncMacro(dailyRecommendedDoses.Water.value),
        units: dailyRecommendedDoses.Water.units,
      },
      Total_Lipid: {
        value: truncMacro(totalNutrients.Total_Lipid),
        recommendedValue: truncMacro(dailyRecommendedDoses.Total_Lipid.value),
        units: dailyRecommendedDoses.Total_Lipid.units,
      },
      Calcium: {
        value: truncMacro(totalNutrients.Calcium),
        recommendedValue: truncMacro(dailyRecommendedDoses.Calcium.value),
        units: dailyRecommendedDoses.Calcium.units,
      },
      Copper: {
        value: truncMacro(totalNutrients.Copper),
        recommendedValue: truncMacro(dailyRecommendedDoses.Copper.value),
        units: dailyRecommendedDoses.Copper.units,
      },
      Iron: {
        value: truncMacro(totalNutrients.Iron),
        recommendedValue: truncMacro(dailyRecommendedDoses.Iron.value),
        units: dailyRecommendedDoses.Iron.units,
      },
      Magnesium: {
        value: truncMacro(totalNutrients.Magnesium),
        recommendedValue: truncMacro(dailyRecommendedDoses.Magnesium.value),
        units: dailyRecommendedDoses.Magnesium.units,
      },
      Phosphorus: {
        value: truncMacro(totalNutrients.Phosphorus),
        recommendedValue: truncMacro(dailyRecommendedDoses.Phosphorus.value),
        units: dailyRecommendedDoses.Phosphorus.units,
      },
      Potassium: {
        value: truncMacro(totalNutrients.Potassium),
        recommendedValue: truncMacro(dailyRecommendedDoses.Potassium.value),
        units: dailyRecommendedDoses.Potassium.units,
      },
      Sodium: {
        value: truncMacro(totalNutrients.Sodium),
        recommendedValue: truncMacro(dailyRecommendedDoses.Sodium.value),
        units: dailyRecommendedDoses.Sodium.units,
      },
      Zinc: {
        value: truncMacro(totalNutrients.Zinc),
        recommendedValue: truncMacro(dailyRecommendedDoses.Zinc.value),
        units: dailyRecommendedDoses.Zinc.units,
      },
      Vitamin_A_RAE: {
        value: truncMacro(totalNutrients.Vitamin_A_RAE),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_A_RAE.value),
        units: dailyRecommendedDoses.Vitamin_A_RAE.units,
      },
      Vitamin_B12: {
        value: truncMacro(totalNutrients.Vitamin_B12),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_B12.value),
        units: dailyRecommendedDoses.Vitamin_B12.units,
      },
      Vitamin_B6: {
        value: truncMacro(totalNutrients.Vitamin_B6),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_B6.value),
        units: dailyRecommendedDoses.Vitamin_B6.units,
      },
      Vitamin_C: {
        value: truncMacro(totalNutrients.Vitamin_C),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_C.value),
        units: dailyRecommendedDoses.Vitamin_C.units,
      },
      Vitamin_E: {
        value: truncMacro(totalNutrients.Vitamin_E),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_E.value),
        units: dailyRecommendedDoses.Vitamin_E.units,
      },
      Vitamin_K: {
        value: truncMacro(totalNutrients.Vitamin_K),
        recommendedValue: truncMacro(dailyRecommendedDoses.Vitamin_K.value),
        units: dailyRecommendedDoses.Vitamin_K.units,
      },
    };

    console.log(data);

    if (nutrients.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Fetching successful.",
          data: data,
          status: 201,
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "No entries found.",
          data: [],
          status: 201,
        })
      );
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", data: [], status: 500 })
    );
  }
}
