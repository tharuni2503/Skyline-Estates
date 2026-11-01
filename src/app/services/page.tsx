import Image from "next/image";
import Link from "next/link";
import { services, serviceImages } from "@/data/services";
export default function Services(){return <div className="mx-auto max-w-6xl px-5 py-14">
 <h1 className="font-serif text-4xl md:text-5xl">Services for every side of a property deal</h1>
 <p className="mt-4 max-w-2xl text-slate">Whether you are buying a first home, selling a villa or launching a project, a Skyline advisor handles the details with you.</p>
 <div className="mt-16 space-y-20">{services.map((s,i)=><section key={s.slug} className="grid items-center gap-8 md:grid-cols-2">
  <div className={`relative aspect-[4/3] overflow-hidden ${i%2?"md:order-2":""}`}><Image src={serviceImages[i]} alt={`${s.title} illustration`} fill sizes="(min-width:768px) 50vw,100vw" className="object-cover"/></div>
  <div><h2 className="font-serif text-3xl">{s.title}</h2><p className="mt-3 text-slate">{s.summary}</p>
   <ul className="mt-5 space-y-2 border-l-2 border-beige pl-4 text-sm">{s.points.slice(0,3).map(p=><li key={p}>{p}</li>)}</ul>
   <div className="mt-6 flex gap-5 text-sm"><Link href={`/services/${s.slug}`} className="bg-matte px-6 py-3 text-ivory">See how it works</Link><Link href="/contact" className="py-3 underline">Talk to an advisor</Link></div></div></section>)}</div></div>;}
