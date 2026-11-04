"use client";
import { useStore } from "@/lib/store";
export default function StatsStrip(){
 const {properties}=useStore();
 const areas=new Set(properties.map(p=>p.location.split(",")[0])).size;
 const rows:[string,string][]=[[String(properties.length),"Residences listed"],[String(areas),"Hyderabad localities"],[String(properties.filter(p=>p.verified).length),"Verified listings"],["6","Services under one roof"]];
 return <section aria-label="Skyline Estates in numbers" className="border-y border-ivory/10 bg-matte text-ivory"><dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ivory/10 md:grid-cols-4">{rows.map(([n,l])=><div key={l} className="bg-matte px-5 py-8 text-center"><dt className="font-serif text-4xl text-beige md:text-5xl">{n}</dt><dd className="mt-1 text-xs uppercase tracking-[.2em] text-ivory/60">{l}</dd></div>)}</dl></section>;}
