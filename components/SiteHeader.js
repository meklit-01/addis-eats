"use client";
import Link from "next/link";
import { useCart } from "./CartProvider";
export default function SiteHeader() {
 const {totalItems}=useCart();
 return <header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="Addis Eats home"><span className="brand-mark">A<span>.</span></span><span className="brand-name">addis eats<small>ETHIOPIAN KITCHEN</small></span></Link><nav className="main-nav" aria-label="Main navigation"><Link href="/">Menu</Link><Link href="/cart" className="cart-link">Cart <span className="cart-count">{totalItems}</span></Link><Link href="/orders">My orders</Link><Link href="/login">Sign in</Link><Link href="/staff">Staff</Link></nav></div></header>;
}
