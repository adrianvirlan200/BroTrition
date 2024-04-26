import executeQuery from "@server/db.js";
import { data } from "autoprefixer";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const selectFoodQuery = "SELECT * FROM foods WHERE 1;";
    const result = await executeQuery(selectFoodQuery, []);

    if (result.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Fetching successful.",
          data: result,
          status: 200,
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "No entries found.",
          data: [],
          status: 200,
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
