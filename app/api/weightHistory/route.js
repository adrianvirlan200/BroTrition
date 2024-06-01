import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    const query =
      "SELECT value, date FROM weight\
      WHERE userID = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)\
      ORDER BY date DESC;";
    const result = await executeQuery(query, [session.user.id]);

    return new Response(
      JSON.stringify({ message: "Success", status: 200, data: result })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
