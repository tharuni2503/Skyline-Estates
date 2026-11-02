"use client";
import Link from "next/link";
import { useState } from "react";
import { posts } from "@/data/blogs";
const cats=["All",...Array.from(new Set(posts.map(p=>p.category)))];
export default function Blog(){const [c,setC]=useState("All");const [q,setQ]=useState("");const list=posts.filter(p=>(c==="All"||p.category===c)&&`${p.title} ${p.summary}`.toLowerCase().includes(q.toLowerCase()));const [first,...rest]=list;
 return <div className="mx-auto max-w-4xl px-5 py-14"><h1 className="font-serif text-4xl">Insights</h1>
 <input aria-label="Search articles" placeholder="Search articles" value={q} onChange={e=>setQ(e.target.value)} className="mt-6 w-full max-w-sm border border-line bg-white px-4 py-2 text-sm"/>
 <div className="mt-4 flex flex-wrap gap-2">{cats.map(x=><button key={x} aria-pressed={c===x} onClick={()=>setC(x)} className={`border px-4 py-2 text-sm ${c===x?"border-matte bg-matte text-ivory":"border-line bg-white"}`}>{x}</button>)}</div>
 {list.length===0&&<p className="mt-10 text-slate">No articles match your search.</p>}
 {first&&<Link href={`/blog/${first.slug}`} className="mt-8 block bg-white p-8 hover:shadow"><p className="text-sm text-slate">Featured · {first.category}</p><h2 className="mt-1 font-serif text-3xl">{first.title}</h2><p className="mt-2 text-slate">{first.summary}</p></Link>}
 <div className="mt-8 space-y-8">{rest.map(p=><article key={p.slug} className="border-b border-line pb-8"><p className="text-sm text-slate">{p.category}</p><h2 className="mt-1 font-serif text-2xl"><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2><p className="mt-2 text-slate">{p.summary}</p></article>)}</div></div>;}
