import { getDishes } from "../lib/dishes";
import MenuExplorer from "../components/MenuExplorer";

export const metadata = {
  title: "Menu",
  description: "Browse Ethiopian meals, sides, juices, soft drinks, coffee, and tea at Addis Eats.",
  alternates: { canonical: "/" },
};
export default function HomePage() {
  const dishes = getDishes();
  return <main id="main-content">
    <section className="hero"><div className="hero-inner">
      <p className="eyebrow">A TASTE OF ETHIOPIA</p>
      <h1>Good food.<br/><span>Good moments.</span></h1>
      <p className="hero-description">From comforting Ethiopian classics to fresh juice and coffee, find something delicious for your next meal.</p>
      <a className="button button-dark" href="#menu">Explore the menu ↓</a>
    </div><div className="hero-art" aria-hidden="true"><div className="hero-circle circle-one"/><div className="hero-circle circle-two"/><div className="hero-stamp"><span>FRESH</span><strong>food</strong><span>DAILY</span></div></div></section>
    <section className="menu-section" id="menu"><div className="section-heading"><div><p className="eyebrow">MADE FOR YOUR CRAVINGS</p><h2>Explore our menu</h2></div><p>{dishes.length} menu items</p></div><MenuExplorer dishes={dishes}/></section>
  </main>;
}
