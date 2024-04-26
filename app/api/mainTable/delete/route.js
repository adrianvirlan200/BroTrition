import executeQuery from "@server/db.js";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const data = await request.json();
    console.log(data.foodID);

    const deleteQuery = "DELETE FROM foods WHERE foodID = ?;";
    const result = await executeQuery(deleteQuery, [data.foodID]);

    return new Response(
      JSON.stringify({ message: "Deletion successful.", status: 201 })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
