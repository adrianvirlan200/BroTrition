import executeQuery from "@server/db.js";
import { authOptions } from "@app/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";
const bcrypt = require("bcrypt");

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();

    const password = data.password;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = "UPDATE user SET password = ? WHERE userID = ?;";
    await executeQuery(query, [hashedPassword, session.user.id]);

    return new Response(
      JSON.stringify({ message: "Registration successful.", status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
