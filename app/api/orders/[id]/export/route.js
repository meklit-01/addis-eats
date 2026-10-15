import { getSession } from "../../../../../lib/session";
import { getOwnedOrder } from "../../../../../lib/orders";
import { ordersToCsv } from "../../../../../lib/format";
export async function GET(request, { params }) {
 const session = await getSession();
 if (!session) return new Response("Unauthorized", { status: 401 });
 const { id } = await params;
 const order = getOwnedOrder(id, session);
 if (!order) return new Response("Not found", { status: 404 });
 const csv = ordersToCsv(order.history.map((event) => ({ id: order.id, status: event.status, address: order.address, total: order.total, updatedAt: event.at })));
 return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${order.id}-history.csv"`, "Cache-Control": "private, no-store" } });
}
