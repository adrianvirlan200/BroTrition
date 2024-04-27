import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();

    const query = data.query;

    const url = "https://api.api-ninjas.com/v1/nutrition?query=" + query;
    const apiKey = process.env.NINJA_API_KEY;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    const fetchedData = await response.json();

    return new Response(JSON.stringify({ data: fetchedData, status: 201 }));
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "An error occurred.", status: 500 })
    );
  }
}
