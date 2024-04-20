import executeQuery from "@server/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const data = await request.json();

  // console.log(data);
  // console.log(data.data.email);
  // console.log(data.data.password);

  const verifyQuery = "SELECT * FROM user WHERE email = ?;";
  const verifyResult = await executeQuery(verifyQuery, [data.data.email]);
  if (verifyResult.length > 0) {
    return new Response(
      JSON.stringify({
        message: "User already exists with that email.",
        status: 500,
      })
    );
  }

  //const hashedPassword = await bcrypt.hash(data.data.password);

  const query = "INSERT INTO user (email, password) VALUES (?, ?);";
  const result = await executeQuery(query, [
    data.data.email,
    data.data.password,
  ]);

  return new Response(
    JSON.stringify({ message: "Registration successful.", status: 201 })
  );
}
