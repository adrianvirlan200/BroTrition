import { NextResponse } from "next/server";
import executeQuery from "@server/db.js";
import { authOptions } from "@app/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const dataReceived = await request.json();
    const searchingParams = dataReceived.searchBoxValue;

    const session = await getServerSession(authOptions);

    const userQuery =
      "SELECT weight\
     FROM biometrics\
     WHERE userID = ?\
     AND weight IS NOT NULL\
     ORDER BY date DESC\
     LIMIT 1;";
    const userResult = await executeQuery(userQuery, [session.user.id]);

    const weight = userResult[0].weight;

    const exercisesQuery =
      " SELECT id, activity, 125_pound, 155_pound, 185_pound\
        FROM brotrition.exercise_data\
        WHERE MATCH(activity) AGAINST(+? IN BOOLEAN MODE)\
        LIMIT 75";
    const exercisesResult = await executeQuery(exercisesQuery, [
      searchingParams,
    ]);

    //convert weight to kg
    const w1 = 125 * 0.45359237;
    const w2 = 155 * 0.45359237;
    const w3 = 185 * 0.45359237;

    for (let i = 0; i < exercisesResult.length; i++) {
      const var1 = Math.abs(w1 - weight);
      const var2 = Math.abs(w2 - weight);
      const var3 = Math.abs(w3 - weight);

      if (var1 < var2 && var1 < var3) {
        var cal = exercisesResult[i]["125_pound"];
      } else if (var2 < var1 && var2 < var3) {
        var cal = exercisesResult[i]["155_pound"];
      } else {
        var cal = exercisesResult[i]["185_pound"];
      }

      exercisesResult[i].calories = cal;

      delete exercisesResult[i]["125_pound"];
      delete exercisesResult[i]["155_pound"];
      delete exercisesResult[i]["185_pound"];
    }

    return new Response(
      JSON.stringify({ data: exercisesResult, userWeight: weight, status: 201 })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
