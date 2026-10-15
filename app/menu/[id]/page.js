import Link from "next/link";
import { notFound } from "next/navigation";
import { getDishes, getDishById } from "../../../lib/dishes";
import AddToCartButton from "../../../components/AddToCartButton";
import Image from "next/image";

export function generateStaticParams() { 
  return getDishes().map((dish) => ({ 

    id: String(dish.id) 

  })); }

export async function generateMetadata({ params }) {

  const { id } = await params;

  const dish = getDishById(id);
  return dish ? {
     title: dish.name, description: dish.description, alternates: { canonical: `/menu/${dish.id}` } } : { title: "Dish not found" };
}
export default async function DishDetailsPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) notFound();

  return <main id="main-content" className="detail-page">
    
    <div className="detail-wrap">
      <Link className="back-link" href="/">← Back to menu</Link>
    <div className="detail-layout"><div className="dish-visual detail-visual"><span className="dish-visual-mark">ADDIS<br/>EATS

    <Image 
        src={dish.image}
        alt={dish.name}
        width={800}
        height={450}
        />
    </span><span className="dish-visual-name">{dish.name}</span></div>
      <div className="detail-copy">
        
        <p className="eyebrow">
          {dish.category.replace("-", " ").toUpperCase()}</p>
          <h1>{dish.name}</h1>
          <p className="detail-description">
            {dish.description}</p>
            
            {dish.spicy && <span 
            className="spicy-label">🌶 Spicy</span>}
            <p className="detail-price">{dish.price} <span>ETB</span></p><AddToCartButton dish={dish} className="button button-dark detail-add"/></div>
    </div></div></main>;
}
