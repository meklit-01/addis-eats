"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
const CartContext = createContext(null);
const KEY = "addis-eats-cart";
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem(KEY); if (raw) { const parsed = JSON.parse(raw); if (Array.isArray(parsed)) setItems(parsed); } } catch { localStorage.removeItem(KEY); } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(items)); }, [items, ready]);
  const addItem = useCallback((dish) => setItems((old) => { const found = old.find((item) => item.id === dish.id); return found ? old.map((item) => item.id === dish.id ? {...item, quantity:item.quantity+1} : item) : [...old,{...dish,quantity:1}]; }), []);
  const removeItem = useCallback((id) => setItems((old) => old.filter((item) => item.id !== id)), []);
  const increaseQuantity = useCallback((id) => setItems((old) => old.map((item) => item.id === id ? {...item,quantity:item.quantity+1} : item)), []);
  const decreaseQuantity = useCallback((id) => setItems((old) => old.flatMap((item) => item.id === id ? (item.quantity > 1 ? [{...item,quantity:item.quantity-1}] : []) : [item])), []);
  const clearCart = useCallback(() => setItems([]), []);
  const totalItems = items.reduce((sum,item) => sum+item.quantity,0);
  const totalPrice = items.reduce((sum,item) => sum+item.price*item.quantity,0);
  const value = useMemo(() => ({items,ready,addItem,removeItem,increaseQuantity,decreaseQuantity,clearCart,totalItems,totalPrice}), [items,ready,addItem,removeItem,increaseQuantity,decreaseQuantity,clearCart,totalItems,totalPrice]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() { const value = useContext(CartContext); if (!value) throw new Error("useCart must be used inside CartProvider"); return value; }
