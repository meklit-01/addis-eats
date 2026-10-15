"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { etb, when } from "../lib/format";
const courierIcon = new L.DivIcon({ className: "courier-pin", html: "<span aria-hidden='true'>●</span>", iconSize: [26, 26], iconAnchor: [13, 13] });
export default function DeliveryMap({ seed }) {
 const [delivery, setDelivery] = useState(seed);
 const [streamState, setStreamState] = useState("Connecting to live updates…");
 useEffect(() => {
   const source = new EventSource(`/api/tracking/${encodeURIComponent(seed.id)}`);
   source.onopen = () => setStreamState("Live updates connected");
   source.onmessage = (event) => { try { const next = JSON.parse(event.data); setDelivery((current) => ({ ...current, ...next })); setStreamState("Live updates connected"); } catch { setStreamState("Received an unreadable update"); } };
   source.onerror = () => setStreamState("Live updates unavailable; showing last known details");
   return () => source.close();
 }, [seed.id]);
 return <><p className="stream-state" role="status">{streamState}</p><div className="delivery-map" aria-label="Map showing the delivery address"><MapContainer center={[delivery.latitude, delivery.longitude]} zoom={14} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Marker position={[delivery.latitude, delivery.longitude]} icon={courierIcon}><Popup><strong>{delivery.status}</strong><br/>{delivery.address}<br/>{etb(delivery.total)}<br/>Updated {when(delivery.updatedAt)}</Popup></Marker></MapContainer></div><p className="map-caption">Map marker: {delivery.address}. Status: {delivery.status}. This text is available even if the map cannot be viewed.</p></>;
}
