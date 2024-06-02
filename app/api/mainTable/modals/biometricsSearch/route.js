import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    const wQuery =
      "SELECT weight\
       FROM biometrics\
       WHERE userID = ?\
       AND weight IS NOT NULL\
       ORDER BY date DESC\
       LIMIT 1;";

    const hQuery =
      "SELECT height\
       FROM biometrics\
       WHERE userID = ?\
       AND height IS NOT NULL\
       ORDER BY date DESC\
       LIMIT 1;";

    const wResult = await executeQuery(wQuery, [session.user.id]);
    const hResult = await executeQuery(hQuery, [session.user.id]);

    const data = {
      weight: wResult[0].weight,
      height: hResult[0].height,
    };

    return new Response(
      JSON.stringify({
        message: "Success",
        data: data,
        status: 201,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "An error occurred.", data: [], status: 500 })
    );
  }
}
