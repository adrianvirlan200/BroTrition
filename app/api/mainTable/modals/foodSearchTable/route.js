import executeQuery from "@server/db.js";
import {
  displayNumberOfCalories,
  calculatePercentageOfNutrients,
  truncMacro,
} from "@server/utils";

export async function GET(request) {
  try {
    const params = new URL(request.url).searchParams;
    const searchingParams = params.get("keyword");

    const query =
      " SELECT Id, Category, Description, Carbohydrate, Protein, Total_Lipid\
        FROM brotrition.nutrition_data\
        WHERE MATCH(Category) AGAINST(+? IN BOOLEAN MODE)\
        LIMIT 75";
    const result = await executeQuery(query, [searchingParams]);

    for (let i = 0; i < result.length; i++) {
      result[i].Calories = displayNumberOfCalories(
        result[i].Protein,
        result[i].Carbohydrate,
        result[i].Total_Lipid
      );

      const [prProc, caProc, ftProc] = calculatePercentageOfNutrients(
        result[i].Protein,
        result[i].Carbohydrate,
        result[i].Total_Lipid
      );

      result[i].ProteinPercentage = prProc;
      result[i].CarbohydratePercentage = caProc;
      result[i].Total_LipidPercentage = ftProc;

      result[i].Protein = truncMacro(result[i].Protein);
      result[i].Carbohydrate = truncMacro(result[i].Carbohydrate);
      result[i].Total_Lipid = truncMacro(result[i].Total_Lipid);
    }

    return new Response(JSON.stringify({ data: result, status: 201 }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
