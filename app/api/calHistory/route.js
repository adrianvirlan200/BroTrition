import executeQuery from "@server/db.js";
import { NextResponse } from "next/server";
import { displayNumberOfCalories } from "@server/utils.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    const query =
      "SELECT dateCreated AS date, quantity, Protein, Carbohydrate, Total_Lipid\
    FROM brotrition.food_log\
    JOIN nutrition_data on nutrition_data.Id = foodID\
    WHERE userID = ? AND date(dateCreated) BETWEEN DATE_SUB(CURDATE(), INTERVAL 3 WEEK) AND CURDATE() + 1\
    ORDER BY dateCreated;";
    const result = await executeQuery(query, [session.user.id]);
    let values = [];
    let label = [];
    let dates = [];

    if (result.length > 0) {
      const today = new Date();
      const threeWeeksAgo = new Date();
      const twoWeeksAgo = new Date();
      const oneWeekAgo = new Date();
      threeWeeksAgo.setDate(today.getDate() - 21 + 1);
      twoWeeksAgo.setDate(today.getDate() - 14 + 1);
      oneWeekAgo.setDate(today.getDate() - 7 + 1);

      let aux = {};
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      for (let i = 0; i < 21; i++) {
        const dateString = threeWeeksAgo.toISOString().split("T")[0];
        dates.push(dateString);

        aux[i] = {
          dateStr: dateString,
          protein: 0,
          carbohydrate: 0,
          lipid: 0,
        };
        threeWeeksAgo.setDate(threeWeeksAgo.getDate() + 1);

        label[i] = "";
        if (i == 20)
          label[i] = today.getDate() + " " + months[today.getMonth()];
        if (i == 13)
          label[i] = oneWeekAgo.getDate() + " " + months[oneWeekAgo.getMonth()];
        if (i == 6)
          label[i] =
            twoWeeksAgo.getDate() + " " + months[twoWeeksAgo.getMonth()];
        if (i == 0)
          label[i] =
            threeWeeksAgo.getDate() + " " + months[threeWeeksAgo.getMonth()];
      }

      for (let i = 0; i < result.length; i++) {
        const date = result[i].date.toISOString().split("T")[0];

        for (let j = 0; j < 21; j++) {
          if (aux[j].dateStr === date) {
            aux[j].protein += (result[i].Protein * result[i].quantity) / 100;
            aux[j].carbohydrate +=
              (result[i].Carbohydrate * result[i].quantity) / 100;
            aux[j].lipid += (result[i].Total_Lipid * result[i].quantity) / 100;

            break;
          }
        }
      }

      for (let i = 0; i < 21; i++) {
        aux[i].calories = displayNumberOfCalories(
          aux[i].protein,
          aux[i].carbohydrate,
          aux[i].lipid
        );

        values.push(aux[i].calories);
      }

      const data = { data: values, label: label, dates: dates };

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
