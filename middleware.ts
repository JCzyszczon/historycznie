import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const unprotectedPaths = [
    "/",
    "/auth",
    "/auth2",
    "/auth/rejestracja",
    "/auth/logowanie",
    "/api/auth",
  ];
  const pathname = req.nextUrl.pathname;

  if (unprotectedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/logowanie", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
