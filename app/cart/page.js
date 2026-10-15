import CartPageClient from "../../components/CartPageClient";
export const metadata = { title: "Your Cart", robots: { index: false, follow: true } };
export default function CartPage() { return <main id="main-content" className="standard-page"><CartPageClient/></main>; }
