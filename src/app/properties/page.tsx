"use client";
import { useEffect, useState } from "react";
import { filterProperties } from "@/services/propertyService";
import type { Property, PropertyQuery } from "@/types";
import { useStore } from "@/lib/store";
import PropertyCard from "@/components/properties/PropertyCard";
import { inr } from "@/lib/format";
const budgets:[number,string][]=[[0,"Any"],[2500000,"₹25 L"],[5000000,"₹50 L"],[10000000,"₹1 Cr"],[20000000,"₹2 Cr"],[50000000,"₹5 Cr"]];
const cats=["All","Apartment","Villa","Independent House","Residential Plot","Commercial"] as const;
const amen=["Clubhouse","Swimming Pool","Gym","Power Backup","Covered Parking","Security","Landscaped Garden","EV Charging"];
const base:PropertyQuery={category:"All",sort:"latest"};
export default function PropertiesPage(){
 const [f,setF]=useState<PropertyQuery>(base);
 const [items,setItems]=useState<Property[]|null>(null);
 const {properties:propertiesList,ready,wishlist:saved,toggleWish:toggle,compare:cmp,toggleCompare:compare,clearCompare}=useStore(); const [listView,setListView]=useState(false); const [err,setErr]=useState(false); const [drawer,setDrawer]=useState(false);
 useEffect(()=>{const s=new URLSearchParams(window.location.search);const c=s.get("category"),q=s.get("q"),l=s.get("listing"),m=s.get("maxPrice");setF(x=>({...x,...(c&&{category:c as PropertyQuery["category"]}),...(q&&{q}),...(l&&{listing:l as PropertyQuery["listing"]}),...(m&&{maxPrice:+m})}));},[]);
 useEffect(()=>{if(!ready)return;setErr(false);try{setItems(filterProperties(propertiesList,f));}catch{setErr(true);setItems([]);}},[f,propertiesList,ready]);
 const cls="border border-line bg-white px-4 py-3 text-sm";
 const picked=propertiesList.filter(p=>cmp.includes(p.id));
 const sel=`mt-1 w-full ${cls}`;
 const num=(v?:number)=>v===undefined?"":String(v);
 const active=Object.entries(f).filter(([k,v])=>v!==undefined&&v!==""&&v!==false&&!(k==="category"&&v==="All")&&!(k==="sort"&&v==="latest")).length;
 const panel=<div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <label className="text-sm">Type<select className={sel} value={f.category} onChange={e=>setF({...f,category:e.target.value as PropertyQuery["category"]})}>{cats.map(c=><option key={c}>{c}</option>)}</select></label>
    <label className="text-sm">BHK<select className={sel} value={f.bhk??""} onChange={e=>setF({...f,bhk:e.target.value?+e.target.value:undefined})}><option value="">Any</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} BHK</option>)}</select></label>
    <label className="text-sm">Amenity<select className={sel} value={f.amenity??""} onChange={e=>setF({...f,amenity:e.target.value||undefined})}><option value="">Any</option>{amen.map(a=><option key={a}>{a}</option>)}</select></label>
    <label className="text-sm">Min budget<select className={sel} value={f.minPrice??0} onChange={e=>setF({...f,minPrice:+e.target.value||undefined})}>{budgets.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
    <label className="text-sm">Max budget<select className={sel} value={f.maxPrice??0} onChange={e=>setF({...f,maxPrice:+e.target.value||undefined})}>{budgets.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></label>
    <label className="text-sm">Min area (sq ft)<input type="number" min={0} className={sel} value={num(f.minArea)} onChange={e=>setF({...f,minArea:e.target.value?+e.target.value:undefined})}/></label>
    <label className="text-sm">Max area (sq ft)<input type="number" min={0} className={sel} value={num(f.maxArea)} onChange={e=>setF({...f,maxArea:e.target.value?+e.target.value:undefined})}/></label>
    <div className="flex items-end gap-4 pb-3 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={!!f.verified} onChange={e=>setF({...f,verified:e.target.checked||undefined})}/>Verified</label><label className="flex items-center gap-2"><input type="checkbox" checked={!!f.featured} onChange={e=>setF({...f,featured:e.target.checked||undefined})}/>Featured</label></div></div>
   <button className="mt-4 text-sm underline" onClick={()=>setF(base)}>Clear all filters</button></div>;
 return <div className="mx-auto max-w-7xl px-5 py-12">
  <h1 className="font-serif text-4xl">Properties in Hyderabad</h1>
  {items&&<p className="mt-2 text-sm text-slate">{items.length} {items.length===1?"property":"properties"} found. Compare up to 4.</p>}
  <div className="mt-8 flex flex-wrap gap-3">
   <input aria-label="Search by location" placeholder="Search by name or location" className={`min-w-60 flex-1 ${cls}`} value={f.q??""} onChange={e=>setF({...f,q:e.target.value})}/>
   <select aria-label="Buy or rent" className={cls} value={f.listing??""} onChange={e=>setF({...f,listing:(e.target.value||undefined) as PropertyQuery["listing"]})}><option value="">Buy or Rent</option><option>Buy</option><option>Rent</option></select>
   <select aria-label="Sort" className={cls} value={f.sort} onChange={e=>setF({...f,sort:e.target.value as PropertyQuery["sort"]})}><option value="latest">Latest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
   <button className={`${cls} lg:hidden`} onClick={()=>setDrawer(true)}>Filters{active>0?` (${active})`:""}</button>
   <button className={cls} aria-pressed={listView} onClick={()=>setListView(!listView)}>{listView?"Grid view":"List view"}</button></div>
  <div className="mt-3 hidden border border-line bg-white p-4 lg:block">{panel}</div>
  {drawer&&<div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close filters" className="absolute inset-0 bg-matte/60" onClick={()=>setDrawer(false)}/><div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto bg-white p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-serif text-xl">Filters</h2><button className="text-sm underline" onClick={()=>setDrawer(false)}>Close</button></div>{panel}<button className="mt-6 w-full bg-matte py-3 text-sm text-ivory" onClick={()=>setDrawer(false)}>Show {items?.length??0} results</button></div></div>}
  <div className={`mt-8 grid gap-6 ${listView?"max-w-3xl":"sm:grid-cols-2 lg:grid-cols-3"}`}>
   {items===null?Array.from({length:3}).map((_,i)=><div key={i} className="aspect-[4/5] animate-pulse bg-line"/>):items.map(p=><PropertyCard key={p.id} p={p} saved={saved.includes(p.id)} onToggle={toggle} compared={cmp.includes(p.id)} onCompare={compare}/>)}</div>
  {err&&<p role="alert" className="py-16 text-center text-red-700">We couldn't load properties. <button className="underline" onClick={()=>setF({...f})}>Try again</button></p>}
  {!err&&items?.length===0&&<p className="py-16 text-center text-slate">No properties match these filters. Clear them to see all listings.</p>}
  {picked.length>=2&&<section aria-label="Comparison" className="fixed inset-x-0 bottom-0 z-40 max-h-[60vh] overflow-auto border-t border-line bg-white p-4 shadow-lg"><div className="mx-auto flex max-w-7xl items-center justify-between"><h2 className="font-serif text-xl">Comparing {picked.length}</h2><button className="text-sm underline" onClick={clearCompare}>Clear</button></div>
   <table className="mx-auto mt-2 w-full max-w-7xl text-left text-sm"><tbody>{([["Property",(p:Property)=>p.title],["Price",(p:Property)=>inr(p.price)],["Area",(p:Property)=>`${p.areaSqft} sq ft`],["BHK",(p:Property)=>p.bhk?String(p.bhk):"—"]] as [string,(p:Property)=>string][]).map(([k,fn])=><tr key={k} className="border-t border-line"><th className="py-2 pr-4 font-normal text-slate">{k}</th>{picked.map(p=><td key={p.id}>{fn(p)}</td>)}</tr>)}</tbody></table></section>}
 </div>;}
