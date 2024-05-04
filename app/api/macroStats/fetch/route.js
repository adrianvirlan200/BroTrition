import executeQuery from "@server/db.js";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";
import { displayNumberOfCalories, truncMacro } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    let data = {};

    const userQuery =
      "SELECT goal, lifestyle, birth_year, sex, height, weight\
       FROM user WHERE userID = ?";
    const userResult = await executeQuery(userQuery, [session.user.id]);

    const selectFoodQuery =
      "SELECT Protein, Total_Lipid, Carbohydrate, quantity\
      FROM food_log \
      INNER JOIN nutrition_data ON nutrition_data.Id = food_log.foodID\
      WHERE userID = ? AND DATE(dateCreated) = CURRENT_DATE();";
    const foodResult = await executeQuery(selectFoodQuery, [session.user.id]);

    //Basal metabolic rate (BMR)
    let BMR = 0;
    const currentYear = new Date().getFullYear();

    if (userResult[0].sex == "male") {
      BMR =
        88.362 +
        13.397 * userResult[0].weight +
        4.799 * userResult[0].height -
        5.677 * (currentYear - userResult[0].birth_year);
    } else if (userResult[0].sex == "female") {
      BMR =
        447.593 +
        9.247 * userResult[0].weight +
        3.098 * userResult[0].height -
        4.33 * (currentYear - userResult[0].birth_year);
    } else {
      BMR =
        (447.593 + 88.362) / 2 +
        ((9.247 + 13.397) / 2) * userResult[0].weight +
        ((3.098 + 4.799) / 2) * userResult[0].height -
        ((4.33 + 5.677) / 2) * (currentYear - userResult[0].birth_year);
    }

    data.BMR = BMR;

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

    data.lifestyleCalories = TDEE - BMR;

    switch (userResult[0].goal) {
      case "lose":
        TDEE -= 300;
        data.goal = "lose";
        break;
      case "gain":
        TDEE *= 1.1;
        data.goal = "gain";
        break;
      case "maintain":
        data.goal = "maintain";
        break;
      default:
        data.goal = "maintain";
    }

    data.TDEE = TDEE;

    data.totalCalories = 0;
    data.totalProtein = 0;
    data.totalCarbohydrate = 0;
    data.totalLipid = 0;
    for (let i = 0; i < foodResult.length; i++) {
      const protein = foodResult[i].Protein * foodResult[i].quantity;
      const carbohydrate = foodResult[i].Carbohydrate * foodResult[i].quantity;
      const lipid = foodResult[i].Total_Lipid * foodResult[i].quantity;

      data.totalCalories += displayNumberOfCalories(
        protein,
        carbohydrate,
        lipid
      );

      data.totalProtein += truncMacro(protein);
      data.totalCarbohydrate += truncMacro(carbohydrate);
      data.totalLipid += truncMacro(lipid);
    }

    const proteinPercentage = 30;
    const carbohydratePercentage = 50;
    const lipidPercentage = 20;

    data.proteinNeeded = (TDEE * proteinPercentage) / 100 / 4;
    data.carbohydrateNeeded = (TDEE * carbohydratePercentage) / 100 / 4;
    data.lipidNeeded = (TDEE * lipidPercentage) / 100 / 9;

    data.caloriesPercentage = data.totalCalories / TDEE;
    data.proteinPercentage = data.totalProtein / data.proteinNeeded;
    data.carbohydratePercentage =
      data.totalCarbohydrate / data.carbohydrateNeeded;
    data.lipidPercentage = data.totalLipid / data.lipidNeeded;

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
