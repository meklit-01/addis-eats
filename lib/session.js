import { cookies } from "next/headers";
import { SESSION_COOKIE, createSessionToken, verifySessionToken } from "./session-token";
export { SESSION_COOKIE, createSessionToken, verifySessionToken };
export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
export async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Authentication required.");
  return session;
}
export async function setSessionCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
}
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
}
