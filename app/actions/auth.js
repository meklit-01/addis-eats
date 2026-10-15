"use server";
import { redirect } from "next/navigation";
import { findDemoUser } from "../../lib/demo-users";
import { createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "../../lib/session";

export async function signInAction(formData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeNext(String(formData.get("next") || "/orders"));
  const user = await findDemoUser(email, password);
  if (!user) redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`);
  await setSessionCookie(await createSessionToken(user));
  redirect(next);
}
function safeNext(value) {
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\") || /[\r\n]/.test(value)) return "/orders";
  try { const parsed = new URL(value, "https://local.invalid"); if (parsed.origin !== "https://local.invalid") return "/orders"; return `${parsed.pathname}${parsed.search}${parsed.hash}`; } catch { return "/orders"; }
}
export async function signOutAction() {
  await clearSessionCookie();
  redirect("/login?signedout=1");
}
export async function updateOrderNoteAction(orderId, formData) {
  const session = await getSession();
  if (!session) throw new Error("Authentication required.");
  // Ownership is verified inside the write action. The demo data is static, so no mutation is persisted.
  const { getOwnedOrder } = await import("../../lib/orders");
  const order = getOwnedOrder(String(orderId), session);
  if (!order) throw new Error("Order not found for this account.");
  const note = String(formData.get("note") || "").slice(0, 200);
  if (!note.trim()) throw new Error("A note is required.");
  redirect(`/tracking/${encodeURIComponent(orderId)}?note=checked`);
}
export async function staffAction() {
  const session = await getSession();
  if (!session) throw new Error("Authentication required.");
  if (session.role !== "staff") throw new Error("Staff access required.");
  return { ok: true };
}
