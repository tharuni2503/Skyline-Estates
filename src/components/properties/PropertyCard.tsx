"use client";
import { motion } from "framer-motion";
import Tilt from "@/components/common/Tilt";
import Image from "next/image";
import Link from "next/link";
import { Heart, BedDouble, Ruler, BadgeCheck } from "lucide-react";
import type { Property } from "@/types";
import { inr } from "@/lib/format";
export default function PropertyCard({p,saved,onToggle,compared=false,onCompare,list=false}:{p:Property;saved:boolean;onToggle:(id:string)=>void;compared?:boolean;onCompare?:(id:string)=>void;list?:boolean}){
 return <Tilt className="h-full"><motion.article initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}} whileHover={{y:-4}} className={`group h-full overflow-hidden bg-white shadow-sm ${list?"md:flex":""}`}>
  <div className={`relative aspect-[4/3] overflow-hidden ${list?"md:aspect-auto md:min-h-60 md:w-80 md:shrink-0":""}`}><Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 33vw,100vw" className="object-cover transition duration-700 group-hover:scale-105"/>
   {p.verified&&<span className="absolute left-3 top-3 flex items-center gap-1 bg-matte/80 px-2 py-1 text-xs text-ivory"><BadgeCheck size={14}/>Verified</span>}
   <button aria-pressed={saved} aria-label={saved?"Remove from wishlist":"Add to wishlist"} onClick={()=>onToggle(p.id)} className="absolute right-3 top-3 rounded-full bg-white/90 p-2"><Heart size={18} className={saved?"fill-matte":""}/></button></div>
  <div className="space-y-2 p-5"><p className="text-sm text-slate">{p.category} · {p.location}</p>
   <h3 className="font-serif text-xl">{p.title}</h3>
   <div className="flex gap-4 text-sm text-slate"><span className="flex items-center gap-1"><BedDouble size={15}/>{p.bhk?`${p.bhk} BHK`:p.category}</span><span className="flex items-center gap-1"><Ruler size={15}/>{p.areaSqft} sq ft</span></div>
   <p className="pt-1 text-lg font-medium">{inr(p.price)}{p.listing==="Rent"&&<span className="text-sm text-slate"> /month</span>}</p>{onCompare&&<label className="flex items-center gap-2 pt-2 text-sm"><input type="checkbox" checked={compared} onChange={()=>onCompare(p.id)}/>Compare</label>}<Link href={`/property/${p.id}`} className="inline-block pt-2 text-sm font-medium underline underline-offset-4">View details</Link></div></motion.article></Tilt>;}
