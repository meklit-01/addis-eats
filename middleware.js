import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "./lib/session-token";

export async function middleware(request) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const path = request.nextUrl.pathname;
  if (!session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", `${path}${request.nextUrl.search}`);
    return NextResponse.redirect(login);
  }
  if (path.startsWith("/staff") && session.role !== "staff") return NextResponse.redirect(new URL("/orders?error=staff", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/orders/:path*", "/staff/:path*", "/tracking/:path*"] };
