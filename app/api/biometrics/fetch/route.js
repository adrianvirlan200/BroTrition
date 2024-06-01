import executeQuery from "@server/db.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/nextauth/NextAuthOptions";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(
        JSON.stringify({ message: "Unauthorized", status: 401 }),
        { status: 401 }
      );
    }

    const query =
      "SELECT weight, height, date FROM biometrics\
       WHERE userID = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)\
       ORDER BY date DESC;";
    const result = await executeQuery(query, [session.user.id]);

    // Generate the complete date range for the last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const dateMap = new Map();
    result.forEach((entry) => {
      const date = new Date(entry.date).toISOString().split("T")[0];
      dateMap.set(date, entry);
    });

    let currentDate = new Date(startDate);
    let previousEntry = null;
    const filledResult = [];

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split("T")[0];
      if (dateMap.has(dateStr)) {
        previousEntry = dateMap.get(dateStr);
        filledResult.push(previousEntry);
      } else if (previousEntry) {
        filledResult.push({ ...previousEntry, date: dateStr });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return new Response(
      JSON.stringify({ message: "Success", status: 200, data: filledResult })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 }),
      { status: 500 }
    );
  }
}
