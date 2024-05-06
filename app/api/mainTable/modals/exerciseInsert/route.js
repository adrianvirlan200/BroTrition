"use server";
import { NextResponse } from "next/server";
import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function POST(request) {
  try {
    const data = await request.json();
    const { duration, exerciseID, manual, calories } = data;

    if (duration == 0 || exerciseID == "")
      return new Response(
        JSON.stringify({ message: "Invalid quantity or foodId", status: 400 })
      );
    else {
      const session = await getServerSession(authOptions);

      const query =
        "INSERT INTO exercise_log (userID, exerciseID, duration, manual, calories_burned) VALUES (?, ?, ?, ?, ?)";
      const result = await executeQuery(query, [
        session.user.id,
        exerciseID,
        duration,
        manual,
        calories,
      ]);

      return new Response(JSON.stringify({ message: "Success", status: 201 }));
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
