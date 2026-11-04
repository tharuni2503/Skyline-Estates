"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";
import type { Property } from "@/types";
function Tile({p,cls}:{p:Property;cls:string}){
 const {wishlist,toggleWish}=useStore();const saved=wishlist.includes(p.id);
 return <div className={`group relative shrink-0 overflow-hidden ${cls}`}>
  <Link href={`/property/${p.id}`} className="absolute inset-0"><Image src={p.image} alt={p.title} fill sizes="(min-width:768px) 60vw,85vw" className="object-cover transition duration-1000 group-hover:scale-105"/>
   <span className="absolute inset-0 bg-gradient-to-t from-matte/85 via-transparent to-transparent" aria-hidden="true"/>
   <span className="absolute bottom-6 left-6 right-6 text-ivory"><span className="block text-xs uppercase tracking-[.25em] text-beige">{p.location.split(",")[0]}</span><span className="mt-1 block font-serif text-3xl md:text-4xl">{p.title}</span><span className="mt-1 block text-sm text-ivory/80">{inr(p.price)}{p.bhk?` · ${p.bhk} BHK`:""} · {p.areaSqft} sq ft</span></span></Link>
  <button aria-pressed={saved} aria-label={saved?"Remove from wishlist":"Add to wishlist"} onClick={()=>toggleWish(p.id)} className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2"><Heart size={18} className={saved?"fill-matte":""}/></button></div>;}
function Pinned({items}:{items:Property[]}){
 const ref=useRef<HTMLDivElement>(null);const {scrollYProgress:s}=useScroll({target:ref,offset:["start start","end end"]});
 const x=useTransform(s,[0,1],["0vw",`-${items.length*62-100+8}vw`]);
 return <section ref={ref} style={{height:`${items.length*80}vh`}} className="relative bg-ivory"><div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
  <div className="px-10"><p className="text-xs uppercase tracking-[.3em] text-slate">Selected residences</p><h2 className="mt-2 font-serif text-5xl">Scroll through the collection</h2></div>
  <motion.div style={{x}} className="mt-8 flex gap-[2vw] pl-10">{items.map(p=><Tile key={p.id} p={p} cls="h-[60vh] w-[60vw]"/>)}</motion.div></div></section>;}
export default function Showcase(){
 const {properties}=useStore();const reduce=useReducedMotion();const [wide,setWide]=useState(false);
 useEffect(()=>{const m=window.matchMedia("(min-width:768px)");const f=()=>setWide(m.matches);f();m.addEventListener("change",f);return ()=>m.removeEventListener("change",f);},[]);
 const items=[...properties].sort((a,b)=>Number(b.featured)-Number(a.featured)).slice(0,5);
 if(items.length<2)return null;
 if(wide&&!reduce)return <Pinned items={items}/>;
 return <section className="bg-ivory py-16"><div className="px-5"><p className="text-xs uppercase tracking-[.3em] text-slate">Selected residences</p><h2 className="mt-2 font-serif text-4xl">Swipe through the collection</h2></div>
  <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">{items.map(p=><Tile key={p.id} p={p} cls="h-[60vh] w-[82vw] snap-center"/>)}</div></section>;}
