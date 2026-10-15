"use client";
import { useMemo, useState } from "react";
import DishCard from "./DishCard";
const labels = {all:"All items",main:"Main dishes",side:"Sides",beverage:"Cold drinks","hot-drink":"Hot drinks",juice:"Juices"};
export default function MenuExplorer({dishes}) {
 const [category,setCategory]=useState("all"); const [search,setSearch]=useState("");
 const categories=useMemo(()=>["all",...new Set(dishes.map(d=>d.category.toLowerCase()))],[dishes]);
 const shown=useMemo(()=>dishes.filter(d=>(category==="all"||d.category.toLowerCase()===category)&&(`${d.name} ${d.description} ${d.category}`.toLowerCase().includes(search.trim().toLowerCase()))),[dishes,category,search]);
 return <div><div className="menu-controls"><div className="category-list" aria-label="Filter by category">{categories.map(c=><button key={c} type="button" className={`category-button ${category===c?"active":""}`} onClick={()=>setCategory(c)} aria-pressed={category===c}>{labels[c]||c}</button>)}</div><label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search menu</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search dishes..."/></label></div><p className="results-count">{shown.length} {shown.length===1?"item":"items"} found</p>{shown.length?<div className="dish-grid">{shown.map(d=><DishCard key={d.id} dish={d}/>)}</div>:<div className="empty-state"><h3>No dishes found</h3><p>Try another search or category.</p><button className="button button-outline" type="button" onClick={()=>{setSearch("");setCategory("all");}}>Clear filters</button></div>}</div>;
}
