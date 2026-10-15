import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { DEMO_ORDERS } from "../../lib/orders";
import { signOutAction } from "../actions/auth";
export const metadata = { title: "My orders", robots: { index: false, follow: false } };
export default async function OrdersPage({ searchParams }) {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Forders");
  const orders = DEMO_ORDERS.filter((order) => order.ownerId === session.id);
  const params = await searchParams;
  return <main id="main-content" className="standard-page"><section className="protected-page"><p className="eyebrow">YOUR ACCOUNT</p><h1>My orders</h1><p className="page-intro">Signed in as {session.email}. The list is filtered by your session ID.</p>{params?.error === "staff" && <p role="alert" className="form-error">That page is reserved for staff.</p>}<form action={signOutAction}><button className="button button-outline" type="submit">Sign out</button></form><div className="protected-grid">{orders.length ? orders.map((order) => <article className="protected-card" key={order.id}><p className="eyebrow">ORDER {order.id}</p><h2>{order.status}</h2><p>{order.address}</p><p><strong>{order.total} ETB</strong></p><Link className="button button-dark" href={`/tracking/${order.id}`}>Track delivery</Link></article>) : <div className="empty-state"><h2>No demo orders for this account</h2><p>Sign in as Customer A to see the seeded tracking example.</p><Link className="button button-dark" href="/">Browse menu</Link></div>}</div></section></main>;
}
