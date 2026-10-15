// Static seed data for the security and tracking exercises; no database is connected.
export const DEMO_ORDERS = [
  { id: "AE-1042", ownerId: "user-ada", customer: "Ada Customer", address: "Bole, Addis Ababa", latitude: 8.995, longitude: 38.787, status: "Courier on the way", total: 680, updatedAt: "2026-10-15T16:20:00.000Z", history: [{ status: "Order received", at: "2026-10-15T15:40:00.000Z" }, { status: "Preparing food", at: "2026-10-15T15:55:00.000Z" }, { status: "Courier on the way", at: "2026-10-15T16:20:00.000Z" }] },
  { id: "AE-1043", ownerId: "user-biru", customer: "Biru Customer", address: "Kazanchis, Addis Ababa", latitude: 9.015, longitude: 38.764, status: "Preparing food", total: 420, updatedAt: "2026-10-15T16:25:00.000Z", history: [{ status: "Order received", at: "2026-10-15T16:10:00.000Z" }, { status: "Preparing food", at: "2026-10-15T16:25:00.000Z" }] },
];
export function getOwnedOrder(orderId, session) {
  return DEMO_ORDERS.find((order) => order.id === orderId && order.ownerId === session.id) || null;
}
