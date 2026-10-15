import Link from "next/link";
export default function NotFound() { return <main id="main-content" className="standard-page"><div className="empty-state"><p className="eyebrow">404 — NOT ON THE MENU</p><h1>We couldn't find that page.</h1><p>Let's get you back to something delicious.</p><Link href="/" className="button button-dark">Back to menu</Link></div></main>; }
