import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "./types/enum";

export default withAuth(
  function middleware(req) {
    if(req.nextauth?.token?.role == null) 
      return NextResponse.rewrite(new URL("/denied", req.url));

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role != Role.ADMIN
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token.role != Role.USER
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
console.log("middleware");
export const config = { matcher: ["/admin/:path*","/user/:path*"] };