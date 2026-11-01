"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { properties } from "@/data/properties";
import { categories, locations, testimonials, reasons } from "@/data/content";
import { posts } from "@/data/blogs";
import { useStore } from "@/lib/store";
import PropertyCard from "@/components/properties/PropertyCard";
export default function Home(){
 const {wishlist,toggleWish}=useStore();
 return <>
  <section className="relative flex min-h-[85vh] items-end bg-matte bg-cover bg-center text-ivory" style={{backgroundImage:"linear-gradient(to top,#111 10%,rgba(17,17,17,.35)),url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80)"}}>
   <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.9}} className="mx-auto w-full max-w-7xl px-5 pb-20">
    <h1 className="max-w-3xl font-serif text-5xl leading-tight md:text-7xl">Find Your Perfect Space.</h1>
    <p className="mt-5 max-w-xl text-ivory/80">Verified homes, villas and plots across Gachibowli, Kokapet, Narsingi and beyond, with an assistant that shortlists for you.</p>
    <form action="/properties" className="mt-8 grid max-w-3xl gap-2 bg-white p-2 text-charcoal sm:grid-cols-2 lg:grid-cols-[auto_1.4fr_1fr_1fr_auto]">
     <select name="listing" aria-label="Buy or rent" className="px-3 py-3 text-sm"><option>Buy</option><option>Rent</option></select>
     <input name="q" aria-label="Location" placeholder="Location, e.g. Kokapet" className="px-3 py-3 text-sm"/>
     <select name="category" aria-label="Property type" className="px-3 py-3 text-sm"><option value="">Any type</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
     <select name="maxPrice" aria-label="Maximum budget" className="px-3 py-3 text-sm"><option value="">Any budget</option><option value="5000000">Up to ₹50 L</option><option value="10000000">Up to ₹1 Cr</option><option value="20000000">Up to ₹2 Cr</option><option value="50000000">Up to ₹5 Cr</option></select>
     <button className="bg-matte px-8 py-3 text-sm text-ivory">Search</button></form>
   </motion.div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><h2 className="font-serif text-3xl">Featured properties</h2>
   <div className="mt-8 grid gap-6 md:grid-cols-3">{properties.filter(p=>p.featured).map(p=><PropertyCard key={p.id} p={p} saved={wishlist.includes(p.id)} onToggle={toggleWish}/>)}</div></section>
  <section className="bg-white py-16"><div className="mx-auto max-w-7xl px-5"><h2 className="font-serif text-3xl">Browse by type</h2>
   <ul className="mt-6 flex flex-wrap gap-3">{categories.map(c=><li key={c}><Link href={`/properties?category=${encodeURIComponent(c)}`} className="block border border-line px-5 py-3 text-sm transition hover:border-matte">{c}</Link></li>)}</ul></div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><h2 className="font-serif text-3xl">Where we work</h2>
   <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">{locations.map(([n,d])=><Link key={n} href={`/properties?q=${encodeURIComponent(n)}`} className="bg-ivory p-6 transition hover:bg-white"><p className="font-serif text-xl">{n}</p><p className="mt-1 text-sm text-slate">{d}</p></Link>)}</div></section>
  <section className="bg-matte py-20 text-ivory"><div className="mx-auto max-w-7xl px-5"><h2 className="font-serif text-3xl">Why Skyline Estates</h2>
   <dl className="mt-8 grid gap-8 md:grid-cols-3">{reasons.map(([t,d])=><div key={t} className="border-t border-beige pt-4"><dt className="font-serif text-xl">{t}</dt><dd className="mt-2 text-sm text-ivory/70">{d}</dd></div>)}</dl></div></section>
  <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-5"><h2 className="font-serif text-3xl">How it works</h2>
   <ol className="mt-10 grid gap-8 md:grid-cols-4">{[["Tell us what you need","Set your budget, area and must-haves, or ask the assistant."],["Compare verified homes","Save favourites and compare up to four side by side."],["Visit with an advisor","Book a site visit; an agent confirms your slot."],["Close with clarity","We check documents and costs before you commit."]].map(([t,d],i)=><li key={t} className="border-t border-matte pt-4"><p className="font-serif text-2xl text-beige">{i+1}</p><p className="mt-2 font-medium">{t}</p><p className="mt-1 text-sm text-slate">{d}</p></li>)}</ol></div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><h2 className="font-serif text-3xl">What clients say</h2>
   <div className="mt-8 grid gap-8 md:grid-cols-3">{testimonials.map(([n,t])=><figure key={n}><blockquote className="leading-relaxed text-charcoal/80">{t}</blockquote><figcaption className="mt-3 text-sm font-medium">{n}</figcaption></figure>)}</div></section>
  <section className="bg-white py-16"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2"><div><h2 className="font-serif text-3xl">Builders and agents</h2><ul className="mt-6 divide-y divide-line text-sm">{[["Aurum Developers","Builder, Kokapet"],["Lakshmi Prasad","Senior advisor, Gachibowli"],["Greenfield Homes","Builder, Tellapur"],["Imran Siddiqui","Advisor, Narsingi"]].map(([n,r])=><li key={n} className="flex justify-between py-3"><span>{n}</span><span className="text-slate">{r}</span></li>)}</ul></div>
   <div><h2 className="font-serif text-3xl">Recommended by our assistant</h2><p className="mt-3 text-slate">3 BHK homes under ₹1 Crore near the IT corridor:</p><ul className="mt-4 space-y-2 text-sm">{properties.filter(p=>p.bhk===3&&p.price<10000000&&p.listing==="Buy").map(p=><li key={p.id}><Link className="underline" href={`/property/${p.id}`}>{p.title}</Link></li>)}</ul><Link href="/ai-assistant" className="mt-4 inline-block text-sm underline">Ask your own question</Link></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><h2 className="font-serif text-3xl">Insights</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{posts.slice(0,3).map(p=><Link key={p.slug} href={`/blog/${p.slug}`} className="border-t border-matte pt-3"><p className="text-sm text-slate">{p.category}</p><p className="mt-1 font-serif text-xl">{p.title}</p></Link>)}</div></section>
  <section className="bg-beige py-16 text-center"><h2 className="font-serif text-3xl">Not sure where to start?</h2><p className="mt-2">Tell our assistant your budget and commute.</p>
   <Link href="/ai-assistant" className="mt-6 inline-block bg-matte px-8 py-3 text-sm text-ivory">Ask the assistant</Link></section>
 </>;}
