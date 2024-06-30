import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    let data = [];

    const query =
      " SELECT userID, email, username, goal, birth_year, sex \
        FROM \
            brotrition.user \
        WHERE \
            userID = ?;\
        ";
    const result = await executeQuery(query, [session.user.id]);

    return new Response(
      JSON.stringify({
        message: "user",
        data: result[0],
        status: 201,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", data: [], status: 500 })
    );
  }
}
