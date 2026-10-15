import "./globals.css";
import { CartProvider } from "../components/CartProvider";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Addis Eats | Ethiopian Kitchen", template: "%s | Addis Eats" },
  description: "Explore Ethiopian meals, juices, coffee, tea, and more with Addis Eats.",
  applicationName: "Addis Eats",
  openGraph: { type: "website", siteName: "Addis Eats", title: "Addis Eats | Ethiopian Kitchen", description: "Explore Ethiopian meals, juices, coffee, tea, and more with Addis Eats.", url: "/", images: [{ url: "/opengraph-image" }] },
  twitter: { card: "summary", title: "Addis Eats | Ethiopian Kitchen", description: "Explore Ethiopian meals, juices, coffee, tea, and more with Addis Eats." },
};
export default function RootLayout({ children }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to main content</a><CartProvider><SiteHeader />{children}<SiteFooter /></CartProvider></body></html>;
}
