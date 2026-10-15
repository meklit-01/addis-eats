import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
export default function DishCard({dish}) {
 return <article className="dish-card"><Link href={`/menu/${dish.id}`} className="dish-visual" aria-label={`View ${dish.name} details`}><span className="dish-visual-mark">ADDIS<br/>EATS</span><span className="dish-visual-name">{dish.name}</span>{dish.spicy && <span className="dish-badge">🌶 Spicy</span>}</Link><div className="dish-card-body"><div className="dish-card-title-row"><Link href={`/menu/${dish.id}`} className="dish-name">{dish.name}</Link><span className="dish-price">{dish.price} <small>ETB</small></span></div><p>{dish.description}</p><div className="dish-card-bottom"><span className="category-label">{dish.category.replace("-", " ")}</span><AddToCartButton dish={dish}/></div></div></article>;
}
