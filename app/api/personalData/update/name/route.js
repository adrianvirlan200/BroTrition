import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    const data = await request.json();
    const nickname = data.username;

    session.user.username = nickname;

    console.log(nickname);
    if (!nickname) {
      return new Response(
        JSON.stringify({ message: "Nickname is required", status: 400 }),
        { status: 400 }
      );
    }

    console.log(nickname);

    const query = "UPDATE user SET username = ? WHERE userID = ?";
    await executeQuery(query, [nickname, session.user.id]);

    return new Response(
      JSON.stringify({ message: "Nickname updated successfully", status: 200 })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 }),
      { status: 500 }
    );
  }
}
