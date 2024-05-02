import executeQuery from "@server/db.js";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password, nickname, gender, goal, height, weight, ads } =
      data.data;

    const verifyQuery = "SELECT * FROM user WHERE email = ?;";
    const verifyResult = await executeQuery(verifyQuery, [email]);
    if (verifyResult.length > 0) {
      return new Response(
        JSON.stringify({
          message: "User already exists with that email.",
          status: 501,
        })
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query =
      "INSERT INTO user (email, password, username, goal, sex, height, weight, wantsCustomAds) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    const result = await executeQuery(query, [
      email,
      hashedPassword,
      nickname,
      goal,
      gender,
      height,
      weight,
      ads,
    ]);

    return new Response(
      JSON.stringify({ message: "Registration successful.", status: 201 })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
