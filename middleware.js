export { default } from "next-auth/middleware";

import { NextResponse } from "next/server";
const middleware = async (request) => {
  return NextResponse.redirect(new URL("/api/auth/signin", request.url));
};

export const config = {
  matcher: "/Home:path*",
};

// export { middleware };

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// // This is your secret from NextAuth configuration
// const secret = process.env.NEXTAUTH_SECRET;

// const middleware = async (request) => {
//   const token = await getToken({ req: request, secret });

//   // If no token is found, the user is not logged in.
//   if (!token) {
//     // Redirect to the sign-in page
//     return NextResponse.redirect(new URL("/api/auth/signin", request.url));
//   }

//   // If a token is found, allow the request to proceed
//   return NextResponse.next();
// };

// export const config = {
//   matcher: "/Home/:path*",
// };

// export { middleware };
