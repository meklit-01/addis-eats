import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import DeliveryMapLoader from "../../../components/DeliveryMapLoader";
import { getSession } from "../../../lib/session";
import { getOwnedOrder } from "../../../lib/orders";
import { etb, when, relative } from "../../../lib/format";
import { signOutAction, updateOrderNoteAction } from "../../actions/auth";
export async function generateMetadata({ params }) { const { id } = await params; return { title: `Track ${id}`, robots: { index: false, follow: false } }; }
export default async function TrackingPage({ params, searchParams }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const { id } = await params;
  const query = await searchParams;
  const order = getOwnedOrder(id, session);
  if (!order) notFound();
  const seed = { id: order.id, status: order.status, address: order.address, latitude: order.latitude, longitude: order.longitude, total: order.total, updatedAt: order.updatedAt, history: order.history };
  return <main id="main-content" className="standard-page"><section className="protected-page"><Link className="back-link" href="/orders">← My orders</Link><p className="eyebrow">LIVE DELIVERY</p><h1>Track order {order.id}</h1><p className="page-intro">Your delivery details are available as text and on the map.</p><DeliveryMapLoader seed={seed}/><section className="tracking-details" aria-labelledby="delivery-info-title"><h2 id="delivery-info-title">Delivery information</h2><dl><div><dt>Status</dt><dd id="delivery-status">{order.status}</dd></div><div><dt>Address</dt><dd>{order.address}</dd></div><div><dt>Order total</dt><dd>{etb(order.total)}</dd></div><div><dt>Last update</dt><dd>{when(order.updatedAt)} ({relative(order.updatedAt)})</dd></div></dl>{query?.note === "checked" && <p className="success-note" role="status">Server verified your session and order ownership. This demo does not save notes.</p>}<h2>Add an order note</h2><form action={updateOrderNoteAction.bind(null, order.id)} className="checkout-form note-form"><label>Note for this order<input name="note" maxLength={200} required placeholder="e.g. Please call when you arrive"/></label><button className="button button-dark" type="submit">Submit note</button></form><h2>Order history</h2><ol className="timeline">{order.history.map((item, index) => <li key={`${item.status}-${index}`}><strong>{item.status}</strong><span>{when(item.at)}</span></li>)}</ol><a className="button button-outline" href={`/api/orders/${order.id}/export`}>Export order history CSV</a><form action={signOutAction}><button className="button button-outline" type="submit">Sign out</button></form></section></section></main>;
}
