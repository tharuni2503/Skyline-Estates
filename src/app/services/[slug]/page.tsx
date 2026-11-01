import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/data/services";
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export default function ServicePage({params}:{params:{slug:string}}){const s=services.find(x=>x.slug===params.slug);if(!s)notFound();
 return <div className="mx-auto max-w-3xl px-5 py-14"><Link href="/services" className="text-sm underline">All services</Link><h1 className="mt-6 font-serif text-4xl">{s.title}</h1><p className="mt-3 text-slate">{s.summary}</p>
 <ol className="mt-10 list-decimal space-y-4 pl-5">{s.points.map(p=><li key={p}>{p}</li>)}</ol>
 <Link href="/contact" className="mt-10 inline-block bg-matte px-8 py-3 text-sm text-ivory">Book a consultation</Link></div>;}
