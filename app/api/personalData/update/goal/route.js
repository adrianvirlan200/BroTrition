import executeQuery from "@server/db.js";
import { authOptions } from "@app/nextauth/NextAuthOptions";
import { getServerSession } from "next-auth";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();

    const goal = data.goal;

    const query = "UPDATE user SET goal = ? WHERE userID = ?;";
    await executeQuery(query, [goal, session.user.id]);

    return new Response(
      JSON.stringify({ message: "Registration successful.", status: 200 })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
