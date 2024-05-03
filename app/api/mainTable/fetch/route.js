import executeQuery from "@server/db.js";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import { displayNumberOfCalories } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    const selectFoodQuery =
      "SELECT food_log.id, foodID, Category, quantity, Protein, Carbohydrate, Total_Lipid\
      FROM brotrition.food_log \
      INNER JOIN nutrition_data ON nutrition_data.Id = food_log.foodID\
      WHERE userID = ? AND DATE(dateCreated) = CURRENT_DATE()";
    const result = await executeQuery(selectFoodQuery, [session.user.id]);

    for (let i = 0; i < result.length; i++) {
      result[i].calories = displayNumberOfCalories(
        parseFloat(result[i].Protein),
        parseFloat(result[i].Carbohydrate),
        parseFloat(result[i].Total_Lipid)
      );
    }

    if (result.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Fetching successful.",
          data: result,
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
