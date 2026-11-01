import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/blogs";
export function generateStaticParams(){return posts.map(p=>({slug:p.slug}));}
export default function Post({params}:{params:{slug:string}}){const p=posts.find(x=>x.slug===params.slug);if(!p)notFound();
 return <article className="mx-auto max-w-2xl px-5 py-14"><Link href="/blog" className="text-sm underline">All insights</Link><p className="mt-6 text-sm text-slate">{p.category}</p><h1 className="mt-1 font-serif text-4xl">{p.title}</h1>
 <div className="mt-8 space-y-5 leading-relaxed text-charcoal/80">{p.body.map((t,i)=><p key={i}>{t}</p>)}</div></article>;}
