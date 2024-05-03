import executeQuery from "@server/db.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await request.json();

    const deleteQuery =
      "DELETE FROM food_log WHERE id = ? AND userID = ?;";
    const result = await executeQuery(deleteQuery, [
      data.foodID,
      session.user.id,
    ]);

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
