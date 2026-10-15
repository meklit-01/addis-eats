import Link from "next/link";
import { signInAction } from "../actions/auth";
import { getSession } from "../../lib/session";
import { redirect } from "next/navigation";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }) {
  const session = await getSession();
  if (session) redirect("/orders");
  const params = await searchParams;
  const next = typeof params?.next === "string" ? params.next : "/orders";
  return <main id="main-content" className="standard-page"><section className="auth-panel"><p className="eyebrow">WELCOME BACK</p><h1>Sign in</h1><p className="page-intro">Use a demo account to explore protected order pages and tracking.</p>{params?.error === "invalid" && <p className="form-error" role="alert">Email or password is incorrect.</p>}{params?.signedout && <p role="status">You have signed out.</p>}<form action={signInAction} className="checkout-form"><input type="hidden" name="next" value={next}/><label>Email address<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label><button className="button button-dark button-full" type="submit">Sign in</button></form><div className="demo-credentials"><h2>Demo accounts</h2><p><strong>Customer A:</strong> ada@example.com / EatsDemo2026!</p><p><strong>Customer B:</strong> biru@example.com / EatsDemo2026!</p><p><strong>Staff:</strong> staff@addiseats.test / StaffDemo2026!</p></div><p><Link href="/">Return to menu</Link></p></section></main>;
}
