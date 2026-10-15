export const SESSION_COOKIE = "addis_eats_session";
const secret = process.env.SESSION_SECRET;
const encoder = new TextEncoder();

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
async function signingKey() {
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must be set to a random value of at least 32 characters.");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}
export async function createSessionToken(user) {
  const payload = toBase64Url(encoder.encode(JSON.stringify({ id: user.id, email: user.email, role: user.role, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 })));
  const signature = new Uint8Array(await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(payload)));
  return `${payload}.${toBase64Url(signature)}`;
}
export async function verifySessionToken(token) {
  try {
    if (!token || typeof token !== "string") return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const valid = await crypto.subtle.verify("HMAC", await signingKey(), fromBase64Url(parts[1]), encoder.encode(parts[0]));
    if (!valid) return null;
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(parts[0])));
    if (!session.id || !session.email || !session.role || !Number.isFinite(session.exp) || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return { id: session.id, email: session.email, role: session.role };
  } catch { return null; }
}
