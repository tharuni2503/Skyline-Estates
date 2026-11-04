"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, Share2, GitCompare } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import { inr } from "@/lib/format";
import { PHONE } from "@/lib/contact";
import Gallery from "@/components/properties/Gallery";
import FloorPlan from "@/components/properties/FloorPlan";
import Extras from "@/components/properties/Extras";
import VisitForm from "@/components/forms/VisitForm";
import PropertyCard from "@/components/properties/PropertyCard";
import InsightCard from "@/components/properties/InsightCard";
export default function PropertyPage(){
 const {id}=useParams<{id:string}>();const {properties,ready,wishlist,toggleWish,compare,toggleCompare}=useStore();const toast=useToast();
 if(!ready)return <div className="mx-auto max-w-7xl px-5 py-10"><div className="aspect-[16/10] animate-pulse bg-line"/></div>;
 const p=properties.find(x=>x.id===id);
 if(!p)return <div className="mx-auto max-w-xl px-5 py-24 text-center"><h1 className="font-serif text-3xl">Property not found</h1><p className="mt-2 text-slate">It may have been removed.</p><Link href="/properties" className="mt-6 inline-block underline">Back to properties</Link></div>;
 const similar=properties.filter(x=>x.id!==p.id&&x.category===p.category).slice(0,3);
 const specs:[string,string][]=[["Configuration",p.bhk?`${p.bhk} BHK`:"n/a"],["Area",`${p.areaSqft} sq ft`],["Type",p.category],["Listing",p.listing==="Buy"?"For sale":"For rent"],...(p.furnishing?[["Furnishing",p.furnishing] as [string,string]]:[]),...(p.parking?[["Parking",p.parking] as [string,string]]:[]),...(p.bathrooms?[["Bathrooms",String(p.bathrooms)] as [string,string]]:[])];
 const share=async()=>{try{await navigator.clipboard.writeText(window.location.href);toast("Link copied");}catch{toast("Copy failed. Copy the address bar link instead.");}};
 const btn="flex items-center gap-2 border border-line bg-white px-4 py-2 text-sm";
 return <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 lg:grid-cols-[1fr_380px]">
  <div>
   <Gallery main={p.image} title={p.title} seed={properties.indexOf(p)}/>
   <p className="mt-10 text-xs uppercase tracking-[.3em] text-slate">{p.category} · {p.listing==="Buy"?"For sale":"For rent"}</p>
   <h1 className="mt-2 font-serif text-4xl md:text-6xl">{p.title}</h1>
   <p className="mt-1 text-slate">{p.location}</p>
   <p className="mt-4 font-serif text-3xl">{inr(p.price)}{p.listing==="Rent"&&<span className="text-base text-slate"> /month</span>}</p>
   <div className="mt-4 flex flex-wrap gap-2">
    <button className={btn} aria-pressed={wishlist.includes(p.id)} onClick={()=>toggleWish(p.id)}><Heart size={16} className={wishlist.includes(p.id)?"fill-matte":""}/>{wishlist.includes(p.id)?"Saved":"Save"}</button>
    <button className={btn} aria-pressed={compare.includes(p.id)} onClick={()=>toggleCompare(p.id)}><GitCompare size={16}/>{compare.includes(p.id)?"In comparison":"Compare"}</button>
    <button className={btn} onClick={share}><Share2 size={16}/>Copy link</button></div>
   <dl className="mt-8 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">{specs.map(([k,v])=><div key={k} className="bg-white p-4"><dt className="text-xs text-slate">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>)}</dl>
   <InsightCard p={p} all={properties}/>
   <h2 className="mt-14 border-t border-line pt-6 font-serif text-3xl">About this property</h2>
   {p.description&&<p className="mt-3 max-w-2xl leading-relaxed text-charcoal/80">{p.description}</p>}
   {!p.description&&<p className="mt-3 max-w-2xl leading-relaxed text-charcoal/80">A {p.bhk?`${p.bhk}-bedroom `:""}{p.category.toLowerCase()} of {p.areaSqft} sq ft in {p.location.split(",")[0]}, close to the IT corridor, schools and the Outer Ring Road.</p>}
   <h2 className="mt-14 border-t border-line pt-6 font-serif text-3xl">Amenities</h2>
   <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">{p.amenities.map(a=><li key={a} className="border-b border-line py-2">{a}</li>)}</ul>
   <Extras location={p.location}><FloorPlan bhk={p.bhk} areaSqft={p.areaSqft}/></Extras>
   <h2 className="mt-14 border-t border-line pt-6 font-serif text-3xl">Similar properties</h2>
   <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{similar.length?similar.map(s=><PropertyCard key={s.id} p={s} saved={wishlist.includes(s.id)} onToggle={toggleWish}/>):<p className="text-sm text-slate">No similar listings right now.</p>}</div>
  </div>
  <aside id="visit" className="scroll-mt-20 pb-20 lg:pb-0 lg:sticky lg:top-24 lg:self-start"><h2 className="mb-3 font-serif text-2xl">Schedule a site visit</h2><VisitForm propertyId={p.id}/></aside>
  <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white p-3 lg:hidden"><a href="#visit" className="flex-1 bg-matte py-3 text-center text-sm text-ivory">Schedule visit</a>{PHONE&&<a href={`tel:${PHONE}`} className="flex-1 border border-matte py-3 text-center text-sm">Call agent</a>}</div>
 </div>;}
