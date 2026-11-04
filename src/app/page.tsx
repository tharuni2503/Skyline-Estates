"use client";
import Link from "next/link";
import DepthReveal from "@/components/common/DepthReveal";
import Categories from "@/components/home/Categories";
import WordReveal from "@/components/common/WordReveal";
import AnimatedChat from "@/components/home/AnimatedChat";
import HorizontalShowcase from "@/components/home/HorizontalShowcase";
import AIShowcase from "@/components/home/AIShowcase";
import Fade from "@/components/common/Fade";
import ToneSection from "@/components/common/ToneSection";
import SectionHead from "@/components/common/SectionHead";
import BgVideo from "@/components/home/BgVideo";
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import PropertyStories from "@/components/home/PropertyStories";
import Image from "next/image";
import PropertyCard from "@/components/properties/PropertyCard";
import { useStore } from "@/lib/store";
import { properties } from "@/data/properties";
import { categories, locations, testimonials, reasons } from "@/data/content";
import { posts } from "@/data/blogs";
import { inr } from "@/lib/format";
export default function Home(){
 const {wishlist,toggleWish}=useStore();
 const featured=properties.filter(p=>p.featured).slice(0,3);
 const picks=properties.filter(p=>p.bhk===3&&p.price<10000000&&p.listing==="Buy").slice(0,3);
 return <>
  <Hero/>
  <StatsStrip/>
  <section className="flex items-center justify-center bg-matte px-5 py-28 text-center text-ivory md:py-44"><WordReveal text="Every home begins as a feeling." className="max-w-4xl font-serif text-4xl leading-tight md:text-7xl"/></section>
  <PropertyStories/>
  <section aria-label="Featured properties" className="mx-auto max-w-7xl px-5 py-20"><SectionHead eyebrow="Featured properties" title="Hand-picked, *verified* homes."/>
   <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{featured.map(p=><PropertyCard key={p.id} p={p} saved={wishlist.includes(p.id)} onToggle={toggleWish}/>)}</div>
   <Link href="/properties" className="mt-8 inline-block border-b border-matte pb-1 text-sm">View all properties</Link></section>
  <Categories/>
  <HorizontalShowcase/>
  <ToneSection from="#111111" to="#111111" textFrom="#F8F5F0" textTo="#F8F5F0" className="py-24 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2"><WordReveal text="More than a property. A place to belong." className="font-serif text-4xl leading-tight md:text-6xl"/><div className="self-end"><p className="leading-relaxed opacity-80">Skyline Estates curates verified homes across Hyderabad's most sought-after neighbourhoods, and pairs each with an advisor who knows the street, the builder and the paperwork.</p><Link href="/about" className="mt-6 inline-block border-b border-beige pb-1 text-sm text-beige">Read our story</Link></div></div></ToneSection>
  <AnimatedChat/>
  <Fade from="matte" to="ivory"/>
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-6"><SectionHead eyebrow="Premium locations" title="Neighbourhoods we *know by heart.*"/>
   <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">{locations.map(([n,d])=><Link key={n} href={`/properties?q=${encodeURIComponent(n)}`} className="bg-ivory p-6 transition hover:bg-white"><p className="font-serif text-xl">{n}</p><p className="mt-1 text-sm text-slate">{d}</p></Link>)}</div></section>
  <Fade from="ivory" to="matte"/>
  <section className="bg-matte pb-20 pt-4 text-ivory"><div className="mx-auto max-w-7xl px-5"><SectionHead eyebrow="Why Skyline Estates" title="Advice that *answers to you.*" dark/>
   <dl className="mt-8 grid gap-8 md:grid-cols-3">{reasons.map(([t,d])=><div key={t} className="border-t border-beige pt-4"><dt className="font-serif text-xl">{t}</dt><dd className="mt-2 text-sm text-ivory/70">{d}</dd></div>)}</dl></div></section>
  <Fade from="matte" to="white"/>
  <section className="bg-white pb-20 pt-6"><DepthReveal><div className="mx-auto max-w-7xl px-5"><SectionHead eyebrow="The process" title="From first look to *front door.*"/>
   <ol className="mt-10 grid gap-8 md:grid-cols-4">{[["Tell us what you need","Set your budget, area and must-haves, or ask the assistant."],["Compare verified homes","Save favourites and compare up to four side by side."],["Visit with an advisor","Book a site visit; an agent confirms your slot."],["Close with clarity","We check documents and costs before you commit."]].map(([t,d],i)=><li key={t} className="border-t border-matte pt-4"><p className="font-serif text-2xl text-beige">{i+1}</p><p className="mt-2 font-medium">{t}</p><p className="mt-1 text-sm text-slate">{d}</p></li>)}</ol></div></DepthReveal></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><DepthReveal><SectionHead eyebrow="Client notes" title="In their *own words.*"/>
   <div className="mt-8 grid gap-8 md:grid-cols-3">{testimonials.map(([n,t])=><figure key={n} className="border-t border-matte pt-5"><span className="font-serif text-5xl leading-none text-beige" aria-hidden="true">&ldquo;</span><blockquote className="mt-1 leading-relaxed text-charcoal/80">{t}</blockquote><figcaption className="mt-4 flex items-center gap-3 text-sm font-medium"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-matte text-xs text-ivory" aria-hidden="true">{n.split(" ").map(w=>w[0]).join("")}</span>{n}</figcaption></figure>)}</div></DepthReveal></section>
  <section className="bg-white py-16"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2"><div><SectionHead eyebrow="Our people" title="Builders and *agents.*"/><ul className="mt-6 grid gap-4 text-sm sm:grid-cols-2">{[["Aurum Developers","Builder","Kokapet"],["Lakshmi Prasad","Senior advisor","Gachibowli"],["Greenfield Homes","Builder","Tellapur"],["Imran Siddiqui","Advisor","Narsingi"]].map(([n,r,a])=><li key={n} className="flex items-center gap-3 bg-ivory p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-matte font-serif text-ivory" aria-hidden="true">{n.split(" ").map(w=>w[0]).slice(0,2).join("")}</span><span><span className="block font-medium">{n}</span><span className="block text-slate">{r}, {a}</span></span></li>)}</ul></div>
   <div><h2 className="font-serif text-3xl">Recommended by our assistant</h2><p className="mt-1 text-xs text-slate">Rule-based matching on our listings, not a trained AI model.</p><p className="mt-3 text-slate">3 BHK homes under ₹1 Crore near the IT corridor:</p><ul className="mt-4 space-y-3 text-sm">{picks.map(p=><li key={p.id}><Link href={`/property/${p.id}`} className="flex items-center gap-4 bg-ivory p-3 transition hover:shadow"><span className="relative h-16 w-24 shrink-0 overflow-hidden"><Image src={p.image} alt="" fill sizes="96px" className="object-cover"/></span><span><span className="block font-serif text-lg">{p.title}</span><span className="block text-slate">{p.location.split(",")[0]} · {inr(p.price)}</span></span></Link></li>)}{picks.length===0&&<li className="text-slate">No matches right now.</li>}</ul><Link href="/ai-assistant" className="mt-4 inline-block text-sm underline">Ask your own question</Link></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-20"><SectionHead eyebrow="Insights and journal" title="Reading for *better decisions.*"/><div className="mt-8 grid gap-6 md:grid-cols-3">{posts.slice(0,3).map(p=><Link key={p.slug} href={`/blog/${p.slug}`} className="border-t border-matte pt-3"><p className="text-sm text-slate">{p.category}</p><p className="mt-1 font-serif text-xl">{p.title}</p><p className="mt-2 text-sm text-slate">{p.summary}</p><span className="mt-3 inline-block text-sm underline underline-offset-4">Read article</span></Link>)}</div></section>
  <Fade from="ivory" to="matte"/>
  <section className="flex items-center justify-center bg-matte px-5 pb-28 pt-12 text-center text-ivory md:pb-44 md:pt-20"><WordReveal text="Then it finds you a place to belong." className="max-w-4xl font-serif text-4xl leading-tight md:text-7xl"/></section>
  <AIShowcase/>
  <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden text-center text-ivory"><BgVideo src="/videos/hero.mp4" lite="/videos/hero-720.mp4" poster="/videos/hero-poster.jpg"/><span className="absolute inset-0 bg-matte/65" aria-hidden="true"/><span className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-matte to-transparent" aria-hidden="true"/><div className="relative px-5"><h2 className="font-serif text-4xl md:text-7xl">YOUR NEXT CHAPTER STARTS HERE.</h2><Link href="/properties" className="mt-8 inline-block bg-beige px-10 py-4 text-sm font-medium text-matte transition hover:bg-ivory">Explore Skyline Estates</Link></div></section>
 </>;}
