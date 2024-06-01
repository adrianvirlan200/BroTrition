"use server";
import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function POST(request) {
  try {
    const data = await request.json();
    const { wCheck, weight, hCheck, height } = data;

    const session = await getServerSession(authOptions);

    const verifyQuery =
      "SELECT * FROM biometrics WHERE userID = ? AND DATE(date) = CURDATE()";
    const verifyResult = await executeQuery(verifyQuery, [session.user.id]);

    let wQuery;
    let hQuery;

    if (verifyResult.length == 0) {
      wQuery =
        "INSERT INTO biometrics (userID, weight, date) VALUES (?, ?, CURDATE())";
      hQuery =
        "INSERT INTO biometrics (userID, height, date) VALUES (?, ?, CURDATE())";
    } else {
      wQuery =
        "UPDATE biometrics SET weight = ? WHERE userID = ? AND DATE(date) = CURDATE()";
      hQuery =
        "UPDATE biometrics SET height = ? WHERE userID = ? AND DATE(date) = CURDATE()";
    }

    if (wCheck) {
      if (verifyResult.length == 0) {
        await executeQuery(wQuery, [session.user.id, weight]);
      } else {
        await executeQuery(wQuery, [weight, session.user.id]);
      }
    }

    if (hCheck) {
      if (verifyResult.length == 0) {
        await executeQuery(hQuery, [session.user.id, height]);
      } else {
        await executeQuery(hQuery, [height, session.user.id]);
      }
    }

    return new Response(JSON.stringify({ message: "Success", status: 201 }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
