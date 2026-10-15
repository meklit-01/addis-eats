import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { DEMO_ORDERS } from "../../lib/orders";
import { signOutAction } from "../actions/auth";
export const metadata = { title: "Staff console", robots: { index: false, follow: false } };
export default async function StaffPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Fstaff");
  if (session.role !== "staff") redirect("/orders?error=staff");
  return <main id="main-content" className="standard-page"><section className="protected-page"><p className="eyebrow">STAFF ONLY</p><h1>Staff console</h1><p className="page-intro">Server-side role verification passed for {session.email}. Hiding a link is not the security boundary.</p><div className="protected-grid">{DEMO_ORDERS.map((order) => <article className="protected-card" key={order.id}><p className="eyebrow">{order.id}</p><h2>{order.status}</h2><p>Customer ID: {order.ownerId}</p><p>{order.address}</p></article>)}</div><form action={signOutAction}><button className="button button-outline" type="submit">Sign out</button></form></section></main>;
}
