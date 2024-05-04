import executeQuery from "@server/db.js";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import { displayNumberOfCalories } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    let data = [];
    let index = 0;

    const selectFoodQuery =
      "SELECT food_log.id, foodID, Category, quantity, Protein, Carbohydrate, Total_Lipid\
      FROM brotrition.food_log \
      INNER JOIN nutrition_data ON nutrition_data.Id = food_log.foodID\
      WHERE userID = ? AND DATE(dateCreated) = CURRENT_DATE()";
    const foodResult = await executeQuery(selectFoodQuery, [session.user.id]);

    for (let i = 0; i < foodResult.length; i++) {
      let calories = displayNumberOfCalories(
        parseFloat((foodResult[i].Protein * foodResult[i].quantity) / 100),
        parseFloat((foodResult[i].Carbohydrate * foodResult[i].quantity) / 100),
        parseFloat((foodResult[i].Total_Lipid * foodResult[i].quantity) / 100)
      );

      data.push({
        index: index++,
        isFood: true,
        Category: foodResult[i].Category,
        foodLogID: foodResult[i].id,
        quantity: foodResult[i].quantity,
        calories: calories,
      });
    }

    const exerciseQuery =
      "SELECT exercise_log.id, exerciseID, duration, activity, 125_pound, 155_pound, 185_pound\
      FROM brotrition.exercise_log \
      INNER JOIN exercise_data ON exercise_data.id = exercise_log.exerciseID\
      WHERE userID = ? AND DATE(created_at) = CURRENT_DATE()";
    const exerciseResult = await executeQuery(exerciseQuery, [session.user.id]);

    for (let i = 0; i < exerciseResult.length; i++) {
      let caloriesBurned = 0;

      //save the weight of the user
      const weight = session.user.weight;

      //convert the weight to kg
      const weight125 = 125 * 0.45359237;
      const weight155 = 155 * 0.45359237;
      const weight185 = 185 * 0.45359237;

      //calculate the difference between the user's weight and the standard weights
      const var1 = Math.abs(weight125 - weight);
      const var2 = Math.abs(weight155 - weight);
      const var3 = Math.abs(weight185 - weight);

      //find the closest weight to the user's weight
      //! The calories are calculated for 30 minutes
      if (var1 < var2 && var1 < var3) {
        caloriesBurned =
          (exerciseResult[i]["125_pound"] * exerciseResult[i].duration) / 30;
      } else if (var2 < var1 && var2 < var3) {
        caloriesBurned =
          (exerciseResult[i]["155_pound"] * exerciseResult[i].duration) / 30;
      } else {
        caloriesBurned =
          (exerciseResult[i]["185_pound"] * exerciseResult[i].duration) / 30;
      }

      data.push({
        index: index++,
        isFood: false,
        activity: exerciseResult[i].activity,
        exerciseLogID: exerciseResult[i].id,
        duration: exerciseResult[i].duration,
        caloriesBurned: caloriesBurned,
      });
    }

    if (foodResult.length > 0) {
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
