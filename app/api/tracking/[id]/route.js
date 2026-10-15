import { getSession } from "../../../../lib/session";
import { getOwnedOrder } from "../../../../lib/orders";
export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });
  const { id } = await params;
  const order = getOwnedOrder(id, session);
  if (!order) return new Response("Not found", { status: 404 });
  const encoder = new TextEncoder();
  let interval;
  const stream = new ReadableStream({ start(controller) {
    const send = () => { try { controller.enqueue(encoder.encode(`data: ${JSON.stringify({ status: order.status, address: order.address, latitude: order.latitude, longitude: order.longitude, total: order.total, updatedAt: order.updatedAt })}\n\n`)); } catch { clearInterval(interval); } };
    send(); interval = setInterval(send, 15000);
    request.signal.addEventListener("abort", () => { clearInterval(interval); try { controller.close(); } catch {} }, { once: true });
  }, cancel() { clearInterval(interval); } });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive", "X-Accel-Buffering": "no" } });
}
