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
      "SELECT exercise_log.id, exerciseID, duration, manual, calories_burned, activity\
      FROM brotrition.exercise_log \
      INNER JOIN exercise_data ON exercise_data.id = exercise_log.exerciseID\
      WHERE userID = ? AND DATE(created_at) = CURRENT_DATE()";
    const exerciseResult = await executeQuery(exerciseQuery, [session.user.id]);

    for (let i = 0; i < exerciseResult.length; i++) {
      data.push({
        index: index++,
        isFood: false,
        activity: exerciseResult[i].activity,
        exerciseLogID: exerciseResult[i].id,
        duration: exerciseResult[i].duration,
        caloriesBurned: exerciseResult[i].calories_burned,
      });
    }

    if (data.length > 0) {
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
