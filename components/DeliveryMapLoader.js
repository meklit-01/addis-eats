"use client";
import dynamic from "next/dynamic";
const DeliveryMap = dynamic(() => import("./DeliveryMap"), { ssr: false, loading: () => <div className="map-placeholder" role="status">Loading delivery map…</div> });
export default function DeliveryMapLoader({ seed }) { return <DeliveryMap seed={seed} />; }
