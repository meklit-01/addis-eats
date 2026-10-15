"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
export default function ReceiptClient() {
 const [order,setOrder]=useState(null);const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem("addis-eats-last-order");if(raw)setOrder(JSON.parse(raw));}catch{localStorage.removeItem("addis-eats-last-order");}setReady(true);},[]);
 if(!ready)return <p>Loading confirmation...</p>;
 if(!order)return <div className="receipt-container empty-state"><h1>No recent order found</h1><p>Place a demo order to see confirmation here.</p><Link href="/" className="button button-dark">Back to menu</Link></div>;
 return <div className="receipt-container"><div className="receipt-check" aria-hidden="true">✓</div><p className="eyebrow">ORDER RECEIVED</p><h1>Thank you, {order.customer.name}!</h1><p className="page-intro">Your demo order has been recorded in this browser.</p><div className="receipt-panel"><div className="summary-row"><span>Reference</span><strong>{order.reference}</strong></div><div className="summary-row"><span>Status</span><strong>{order.status}</strong></div><div className="summary-row"><span>Delivery area</span><strong>{order.customer.area}</strong></div><hr/>{order.items.map(i=><div className="summary-row" key={i.id}><span>{i.name} × {i.quantity}</span><span>{i.price*i.quantity} ETB</span></div>)}<div className="summary-row summary-total"><span>Total</span><strong>{order.total} ETB</strong></div></div><p className="demo-note">This is a local demo receipt, not a real restaurant order.</p><Link href="/" className="button button-dark">Continue exploring</Link></div>;
}
