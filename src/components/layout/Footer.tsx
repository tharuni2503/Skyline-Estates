"use client";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/lib/toast";
import { categories } from "@/data/content";
const nav=[["Properties","/properties"],["About","/about"],["Services","/services"],["AI Assistant","/ai-assistant"],["Insights","/blog"],["Contact","/contact"]];
export default function Footer(){
 const toast=useToast();const [email,setEmail]=useState("");const [err,setErr]=useState("");
 const sub=(e:React.FormEvent)=>{e.preventDefault();if(!/^\S+@\S+\.\S+$/.test(email)){setErr("Enter a valid email address");return;}setErr("");setEmail("");toast("Thanks. Newsletter sign-up is a demo and nothing was stored.");};
 const h="text-xs uppercase tracking-[.25em] text-beige";
 return <footer className="bg-matte px-5 pb-8 pt-20 text-ivory/70"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
  <div><p className="font-serif text-3xl text-ivory">Skyline Estates</p><p className="mt-2 text-sm">Find your perfect space.</p>
   <form onSubmit={sub} noValidate className="mt-8 max-w-xs"><label className={h} htmlFor="nl">Newsletter</label><div className="mt-3 flex"><input id="nl" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="min-w-0 flex-1 border border-ivory/20 bg-transparent px-3 py-2 text-sm text-ivory"/><button className="bg-beige px-4 text-sm text-matte">Join</button></div>{err&&<p role="alert" className="mt-1 text-xs text-red-300">{err}</p>}</form></div>
  <nav aria-label="Footer"><p className={h}>Explore</p><ul className="mt-4 space-y-2 text-sm">{nav.map(([l,h2])=><li key={h2}><Link href={h2} className="hover:text-beige">{l}</Link></li>)}</ul></nav>
  <div><p className={h}>Properties</p><ul className="mt-4 space-y-2 text-sm">{categories.map(c=><li key={c}><Link href={`/properties?category=${encodeURIComponent(c)}`} className="hover:text-beige">{c}</Link></li>)}</ul></div>
  <div><p className={h}>Visit us</p><address className="mt-4 space-y-1 text-sm not-italic"><p>Financial District, Hyderabad 500032</p><p>hello@skylineestates.in</p><p>+91 40 0000 0000</p></address>
   <p className="mt-6 flex gap-4 text-sm"><a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank" className="hover:text-beige">Instagram</a><a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank" className="hover:text-beige">LinkedIn</a><a href="https://x.com/" rel="noopener noreferrer" target="_blank" className="hover:text-beige">X</a></p></div></div>
  <div className="mx-auto mt-14 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-ivory/10 pt-6 text-xs"><p>© 2026 Skyline Estates. Hyderabad, India.</p><p className="flex gap-4"><Link href="/dashboard">Seller</Link><Link href="/builder">Builder</Link><Link href="/admin">Admin</Link></p></div></footer>;}
