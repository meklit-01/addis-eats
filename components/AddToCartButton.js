"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
export default function AddToCartButton({dish,className="add-button"}) {
 const {addItem}=useCart(); const [added,setAdded]=useState(false);
 function handleAdd(){ addItem(dish); setAdded(true); window.setTimeout(()=>setAdded(false),900); }
 return <button type="button" className={className} onClick={handleAdd}>{added ? "Added ✓" : "Add +"}</button>;
}
