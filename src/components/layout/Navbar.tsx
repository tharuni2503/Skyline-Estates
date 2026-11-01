"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { useState } from "react";
import Logo from "./Logo";
import { Menu, X, Bell, Heart } from "lucide-react";
const links=[["Properties","/properties"],["Services","/services"],["AI Assistant","/ai-assistant"],["About","/about"],["Blog","/blog"],["Contact","/contact"],["Dashboard","/admin"]];
export default function Navbar(){
 const path=usePathname();const {wishlist}=useStore();const [open,setOpen]=useState(false);const [bell,setBell]=useState(false);
 return <header className="sticky top-0 z-50 bg-matte text-ivory">
  <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5" aria-label="Main">
   <Link href="/" aria-label="Skyline Estates home"><Logo/></Link>
   <ul className="hidden gap-8 text-sm md:flex">{links.map(([l,h])=><li key={h}><Link href={h} aria-current={path.startsWith(h)?"page":undefined} className={`transition hover:text-beige ${path.startsWith(h)?"text-beige":"text-ivory/80"}`}>{l}</Link></li>)}</ul>
   <Link href="/login" className="hidden text-sm text-ivory/80 hover:text-beige md:block">Log in</Link><Link href="/register" className="hidden bg-beige px-4 py-2 text-sm text-matte md:block">Get started</Link><Link href="/wishlist" aria-label={`Saved properties (${wishlist.length})`} className="relative"><Heart size={18}/>{wishlist.length>0&&<span className="absolute -right-2 -top-2 rounded-full bg-beige px-1.5 text-[10px] text-matte">{wishlist.length}</span>}</Link><div className="relative"><button aria-label="Notifications" aria-expanded={bell} onClick={()=>setBell(!bell)}><Bell size={18}/></button>{bell&&<ul className="absolute right-0 top-8 w-64 bg-white p-3 text-sm text-charcoal shadow"><li className="py-1">New site visit request for Skyline Crest</li><li className="py-1">Your listing was approved</li><li className="py-1">2 new leads this week</li></ul>}</div><button className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
  </nav>
  {open&&<ul className="space-y-1 border-t border-white/10 px-5 pb-4 md:hidden">{[...links,["Log in","/login"],["Get started","/register"]].map(([l,h])=><li key={h}><Link onClick={()=>setOpen(false)} href={h} className="block py-3">{l}</Link></li>)}</ul>}
 </header>;}
