import { NextResponse } from "next/server";
import executeQuery from "@server/db.js";
import {
  displayNumberOfCalories,
  calculatePercentageOfNutrients,
} from "@server/utils";

export async function POST(request) {
  try {
    const data = await request.json();
    const searchingParams = data.searchBoxValue;

    const query =
      " SELECT\
          Id,\
          Category,\
          Description,\
          Carbohydrate,\
          Protein,\
          Total_Lipid\
        FROM\
          brotrition.nutrition_data\
        WHERE\
          MATCH(Category) AGAINST(+? IN BOOLEAN MODE)\
        LIMIT 75";
    const result = await executeQuery(query, [searchingParams]);

    for (let i = 0; i < result.length; i++) {
      result[i].Calories = displayNumberOfCalories(
        result[i].Protein,
        result[i].Carbohydrate,
        result[i].Total_Lipid
      );

      result[i].Protein = Math.trunc(10 * result[i].Protein) / 10;
      result[i].Carbohydrate = Math.trunc(10 * result[i].Carbohydrate) / 10;
      result[i].Total_Lipid = Math.trunc(10 * result[i].Total_Lipid) / 10;

      const [prProc, caProc, ftProc] = calculatePercentageOfNutrients(
        result[i].Protein,
        result[i].Carbohydrate,
        result[i].Total_Lipid
      );

      result[i].ProteinPercentage = prProc;
      result[i].CarbohydratePercentage = caProc;
      result[i].Total_LipidPercentage = ftProc;
    }

    return new Response(JSON.stringify({ data: result, status: 201 }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
