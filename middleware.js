export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

const middleware = async (request) => {
  if (url.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/api/auth/signin", request.url));
};

export const config = {
  matcher: ["/Home/:path*"],
};
