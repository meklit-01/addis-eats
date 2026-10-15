// Demo identities store salted PBKDF2 hashes, not plaintext passwords. Replace with a real user database before production.
const DEMO_USERS = [
  { id: "user-ada", email: "ada@example.com", salt: "addis-demo-salt-ada-2026", passwordHash: "6w5p_jYHYIciGc96eLC8A9AtQQX5s7zGA0S-pXygnd0", role: "customer", name: "Ada Customer" },
  { id: "user-biru", email: "biru@example.com", salt: "addis-demo-salt-biru-2026", passwordHash: "pzx44-Fx2ldrLtHRyta5XQo7tSIC5um_a2I7huymf6g", role: "customer", name: "Biru Customer" },
  { id: "staff-abel", email: "staff@addiseats.test", salt: "addis-demo-salt-staff-2026", passwordHash: "SXabDVn0L04H8qag0AdL4MtyR4gfrEDzmlTTzWBON3Y", role: "staff", name: "Abel Staff" },
];
function encode(bytes) { let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); }
export async function findDemoUser(email, password) {
  const user = DEMO_USERS.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());
  if (!user || typeof password !== "string") return null;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(user.salt), iterations: 210000, hash: "SHA-256" }, key, 256));
  return encode(derived) === user.passwordHash ? { id: user.id, email: user.email, role: user.role, name: user.name } : null;
}
