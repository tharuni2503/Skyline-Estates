"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";
import type { Property } from "@/types";
const Scene=dynamic(()=>import("./Scene"),{ssr:false,loading:()=><div className="flex h-full items-center justify-center text-sm text-ivory/70">Building the Skyline world…</div>});
const LABELS:[number,string][]=[[0,"City overview"],[.15,"Approaching the neighbourhood"],[.3,"Luxury villa"],[.45,"Architectural close-up"],[.65,"Premium apartments"],[.8,"Property discovery"],[.93,"Skyline Estates"]];
export default function ExploreClient(){
 const {properties}=useStore();const reduce=useReducedMotion();
 const [mode,setMode]=useState<"checking"|"3d"|"static">("checking");const [lite,setLite]=useState(false);
 const [sel,setSel]=useState<string|null>(null);const [label,setLabel]=useState(LABELS[0][1]);const [started,setStarted]=useState(false);
 const ref=useRef<HTMLDivElement>(null);
 const {scrollYProgress}=useScroll({target:ref,offset:["start start","end end"]});
 useMotionValueEvent(scrollYProgress,"change",v=>{setStarted(v>.02);setLabel([...LABELS].reverse().find(([t])=>v>=t)![1]);});
 useEffect(()=>{let gl=false;try{const c=document.createElement("canvas");gl=!!(c.getContext("webgl2")||c.getContext("webgl"));}catch{}
  setLite(window.innerWidth<768||(navigator.hardwareConcurrency??8)<=4);setMode(gl&&!reduce?"3d":"static");},[reduce]);
 const v=properties.find(p=>p.category==="Villa"),a=properties.find(p=>p.category==="Apartment");
 const items=[v,a,...properties.filter(p=>p!==v&&p!==a)].filter((p):p is Property=>!!p).slice(0,6);
 const cur=items.find(p=>p.id===sel);
 return <div className="bg-matte text-ivory">
  {mode==="3d"&&<div ref={ref} style={{height:"600vh"}} className="relative"><div className="sticky top-0 h-screen overflow-hidden">
   <Scene items={items} progress={scrollYProgress} selected={sel} onSelect={setSel} lite={lite}/>
   <div className="pointer-events-none absolute left-5 top-24 md:left-10"><p className="text-xs uppercase tracking-[.3em] text-beige">Skyline world</p><p aria-live="polite" className="mt-1 font-serif text-2xl md:text-4xl">{label}</p></div>
   <div className="pointer-events-none absolute right-5 top-1/2 h-40 w-px -translate-y-1/2 bg-ivory/20 md:right-10"><motion.div style={{scaleY:scrollYProgress}} className="h-full origin-top bg-beige"/></div>
   {!started&&!cur&&<p className="pointer-events-none absolute inset-x-0 bottom-10 text-center text-xs uppercase tracking-[.4em] text-ivory/80">Scroll to explore</p>}
   {cur&&<aside className="absolute inset-x-4 bottom-4 max-w-sm bg-ivory p-5 text-charcoal md:inset-x-auto md:bottom-10 md:right-20"><div className="relative mb-3 aspect-video overflow-hidden"><Image src={cur.image} alt={cur.title} fill sizes="400px" className="object-cover"/></div>
    <p className="text-xs uppercase tracking-[.2em] text-slate">{cur.category}</p><h2 className="font-serif text-2xl">{cur.title}</h2><p className="text-sm text-slate">{cur.location}</p>
    <p className="mt-2 font-serif text-xl">{inr(cur.price)}</p><p className="text-sm">{cur.bhk?`${cur.bhk} BHK · `:""}{cur.areaSqft} sq ft</p>
    <div className="mt-4 flex gap-3 text-sm"><Link href={`/property/${cur.id}`} className="bg-matte px-5 py-2 text-ivory">View details</Link><Link href="/contact" className="border border-matte px-5 py-2">Contact agent</Link><button onClick={()=>setSel(null)} className="underline">Close</button></div></aside>}
   <p className="pointer-events-none absolute bottom-4 left-5 hidden text-xs text-ivory/60 md:block">Click a building to open it</p></div></div>}
  {mode==="checking"&&<div className="flex h-[60vh] items-center justify-center text-sm text-ivory/70">Preparing…</div>}
  {mode==="static"&&<div className="mx-auto max-w-4xl px-5 pb-10 pt-32"><h1 className="font-serif text-4xl">The Skyline world</h1><p className="mt-3 text-ivory/70">The interactive 3D city needs WebGL and motion enabled. Browse every residence below instead.</p></div>}
  <section className="bg-ivory px-5 py-16 text-charcoal"><div className="mx-auto max-w-4xl"><h2 className="font-serif text-3xl">All residences in the world</h2>
   <ul className="mt-6 divide-y divide-line">{items.map(p=><li key={p.id} className="flex justify-between gap-4 py-3"><Link href={`/property/${p.id}`} className="underline">{p.title}</Link><span className="text-sm text-slate">{p.category} · {inr(p.price)}</span></li>)}</ul>
   <Link href="/properties" className="mt-6 inline-block text-sm underline">Browse all properties</Link></div></section></div>;}
