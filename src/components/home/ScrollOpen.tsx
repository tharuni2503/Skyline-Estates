"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";
import type { Property } from "@/types";
function Facts({p,cls=""}:{p:Property;cls?:string}){return <div className={cls}><p className="font-serif text-3xl">{inr(p.price)}</p><p className="mt-1 text-sm text-slate">{p.location}</p>
 <p className="mt-4 text-sm">{p.bhk?`${p.bhk} BHK · `:""}{p.areaSqft} sq ft · {p.category}</p>
 <p className="mt-3 text-sm text-charcoal/80">{p.description??"A residence chosen for its light, layout and neighbourhood."}</p>
 <p className="mt-3 text-xs text-slate">{p.amenities.slice(0,4).join(" · ")}</p>
 <Link href={`/property/${p.id}`} className="mt-6 inline-block bg-matte px-6 py-3 text-sm text-ivory">Explore property</Link></div>;}
function Pinned({p}:{p:Property}){
 const ref=useRef<HTMLDivElement>(null);
 const {scrollYProgress:s}=useScroll({target:ref,offset:["start start","end end"]});
 const a=useTransform(s,[0,.45],[24,0]),b=useTransform(s,[0,.45],[30,0]);
 const clip=useMotionTemplate`inset(${a}% ${b}% ${a}% ${b}%)`;
 const scale=useTransform(s,[0,.5],[1.25,1]);const title=useTransform(s,[.3,.5],[0,1]);
 const info=useTransform(s,[.62,.8],[0,1]),infoY=useTransform(s,[.62,.8],[40,0]);
 return <section ref={ref} className="relative h-[320vh] bg-matte"><div className="sticky top-0 h-screen overflow-hidden">
  <motion.div style={{clipPath:clip}} className="absolute inset-0"><motion.div style={{scale}} className="absolute inset-0"><Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover"/></motion.div><div className="absolute inset-0 bg-matte/35"/></motion.div>
  <motion.div style={{opacity:title}} className="absolute bottom-20 left-10 max-w-xl text-ivory"><p className="text-xs uppercase tracking-[.3em] text-beige">Featured residence</p><h2 className="mt-2 font-serif text-5xl lg:text-7xl">{p.title}</h2></motion.div>
  <motion.aside style={{opacity:info,y:infoY}} className="absolute right-10 top-1/2 w-96 -translate-y-1/2 bg-ivory/95 p-8 text-charcoal"><Facts p={p}/></motion.aside></div></section>;}
export default function ScrollOpen(){
 const {properties}=useStore();const p=properties.find(x=>x.featured)??properties[0];
 const reduce=useReducedMotion();const [wide,setWide]=useState(false);
 useEffect(()=>{const m=window.matchMedia("(min-width:768px)");const f=()=>setWide(m.matches);f();m.addEventListener("change",f);return ()=>m.removeEventListener("change",f);},[]);
 if(!p)return null;
 if(wide&&!reduce)return <Pinned p={p}/>;
 return <section className="bg-ivory py-16"><div className="mx-auto max-w-3xl px-5"><p className="text-xs uppercase tracking-[.3em] text-slate">Featured residence</p><h2 className="mt-2 font-serif text-4xl">{p.title}</h2><div className="relative mt-6 aspect-[4/3] overflow-hidden"><Image src={p.image} alt={p.title} fill sizes="100vw" className="object-cover"/></div><Facts p={p} cls="mt-6"/></div></section>;}
