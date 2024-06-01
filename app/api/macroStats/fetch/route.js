import executeQuery from "@server/db.js";
import { displayNumberOfCalories, truncMacro } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const params = new URL(request.url).searchParams;
    const date = params.get("date");

    let data = {};

    const userQuery =
      "SELECT goal, lifestyle, birth_year, sex, height, weight\
       FROM user WHERE userID = ?";
    const userResult = await executeQuery(userQuery, [session.user.id]);

    const selectFoodQuery =
      "SELECT Protein, Total_Lipid, Carbohydrate, quantity\
      FROM food_log \
      INNER JOIN nutrition_data ON nutrition_data.Id = food_log.foodID\
      WHERE userID = ? AND DATE(dateCreated) = ?;";
    const foodResult = await executeQuery(selectFoodQuery, [
      session.user.id,
      date,
    ]);

    const selectExerciseQuery =
      "SELECT calories_burned FROM exercise_log WHERE userID = ? AND DATE(created_at) = ?;";
    const exerciseResult = await executeQuery(selectExerciseQuery, [
      session.user.id,
      date,
    ]);

    //Basal metabolic rate (BMR)
    let BMR = 0;
    const currentYear = new Date().getFullYear();

    const weight = parseFloat(userResult[0].weight);
    const height = parseFloat(userResult[0].height);
    const years = currentYear - userResult[0].birth_year;

    //Mifflin-St Jeor Equation
    if (userResult[0].sex == "male") {
      BMR = 10 * weight + 6.5 * height - 5 * years + 5;
    } else if (userResult[0].sex == "female") {
      BMR = 10 * weight + 6.25 * height - 5 * years - 161;
    } else {
      BMR = 10 * weight + 6.35 * height - 5 * years - 78;
    }

    data.BMR = truncMacro(BMR);

    //Total Daily Energy Expenditure (TDEE)
    let TDEE = 0;
    switch (userResult[0].lifestyle) {
      case "sedentary":
        TDEE = BMR * 1.2;
        data.lifestyleFactor = 1.2;
        break;
      case "lightly":
        TDEE = BMR * 1.375;
        data.lifestyleFactor = 1.375;
        break;
      case "moderately":
        TDEE = BMR * 1.55;
        data.lifestyleFactor = 1.55;
        break;
      case "very":
        TDEE = BMR * 1.725;
        data.lifestyleFactor = 1.725;
        break;
      case "extra":
        TDEE = BMR * 1.9;
        data.lifestyleFactor = 1.9;
        break;
    }

    data.lifestyleCalories = truncMacro(TDEE - BMR);

    switch (userResult[0].goal) {
      case "lose":
        TDEE -= 300;
        data.goalCalories = 300;
        data.goal = "lose";
        break;
      case "gain":
        TDEE += 300;
        data.goalCalories = 300;
        data.goal = "gain";
        break;
      case "maintain":
        data.goal = "maintain";
        break;
      default:
        data.goal = "maintain";
    }

    //BMI + lifestyle factor + goal
    data.TDEE = truncMacro(TDEE);

    //add the activity calories to form the total calories burned
    let totalActivity = 0.0;
    for (let i = 0; i < exerciseResult.length; i++) {
      totalActivity += parseFloat(exerciseResult[i].calories_burned);
    }

    data.activity = truncMacro(totalActivity);
    data.totalCaloriesBurned = truncMacro(data.TDEE + data.activity);

    data.totalCaloriesConsumed = 0.0;
    data.totalProteinConsumed = 0.0;
    data.totalCarbohydrateConsumed = 0.0;
    data.totalLipidConsumed = 0.0;
    for (let i = 0; i < foodResult.length; i++) {
      const protein = (foodResult[i].Protein * foodResult[i].quantity) / 100;
      const carbohydrate =
        (foodResult[i].Carbohydrate * foodResult[i].quantity) / 100;
      const lipid = (foodResult[i].Total_Lipid * foodResult[i].quantity) / 100;

      data.totalProteinConsumed += protein;
      data.totalCarbohydrateConsumed += carbohydrate;
      data.totalLipidConsumed += lipid;
    }

    data.totalCaloriesConsumed += displayNumberOfCalories(
      data.totalProteinConsumed,
      data.totalCarbohydrateConsumed,
      data.totalLipidConsumed
    );

    data.totalProteinConsumed = truncMacro(data.totalProteinConsumed);
    data.totalCarbohydrateConsumed = truncMacro(data.totalCarbohydrateConsumed);
    data.totalLipidConsumed = truncMacro(data.totalLipidConsumed);

    data.totalProteinConsumedCalories = truncMacro(
      data.totalProteinConsumed * 4
    );
    data.totalCarbohydrateConsumedCalories = truncMacro(
      data.totalCarbohydrateConsumed * 4
    );
    data.totalLipidConsumedCalories = truncMacro(data.totalLipidConsumed * 9);

    const proteinPercentage = 25;
    const carbohydratePercentage = 50;
    const lipidPercentage = 25;

    data.proteinNeeded = truncMacro(
      (data.totalCaloriesBurned * proteinPercentage) / 100 / 4
    );
    data.carbohydrateNeeded = truncMacro(
      (data.totalCaloriesBurned * carbohydratePercentage) / 100 / 4
    );
    data.lipidNeeded = truncMacro(
      (data.totalCaloriesBurned * lipidPercentage) / 100 / 9
    );

    data.caloriesPercentage =
      (data.totalCaloriesConsumed / data.totalCaloriesBurned) * 100;
    data.proteinPercentage =
      (data.totalProteinConsumed / data.proteinNeeded) * 100;
    data.carbohydratePercentage =
      (data.totalCarbohydrateConsumed / data.carbohydrateNeeded) * 100;
    data.lipidPercentage = (data.totalLipidConsumed / data.lipidNeeded) * 100;

    data.caloriesRemaining =
      data.totalCaloriesBurned - data.totalCaloriesConsumed;

    if (userResult.length > 0) {
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
