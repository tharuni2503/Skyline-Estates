"use client";
import SectionHead from "@/components/common/SectionHead";
import { useState } from "react";
import VisitForm from "@/components/forms/VisitForm";
import ContactForm from "@/components/forms/ContactForm";
export default function Contact(){const [tab,setTab]=useState<"msg"|"visit">("msg");
 return <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2">
 <div><SectionHead as="h1" eyebrow="Contact" title="Talk to an *agent.*"/><p className="mt-4 max-w-md text-slate">Send us a question or book a site visit. Our Hyderabad office is open Monday to Saturday, 10 AM to 7 PM.</p>
  <address className="mt-8 space-y-1 text-sm not-italic"><p>Skyline Estates, Financial District, Hyderabad 500032</p><p>hello@skylineestates.in</p><p>+91 40 0000 0000</p></address>
  <iframe title="Skyline Estates office, Financial District, Hyderabad" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Financial+District,+Hyderabad&output=embed" className="mt-8 aspect-video w-full border-0"/></div>
 <div><div role="tablist" className="mb-4 flex gap-6 border-b border-line">{([["msg","Send an enquiry"],["visit","Book a site visit"]] as const).map(([k,l])=><button key={k} role="tab" aria-selected={tab===k} onClick={()=>setTab(k)} className={`pb-3 text-sm ${tab===k?"border-b-2 border-matte font-medium":"text-slate"}`}>{l}</button>)}</div>
  {tab==="msg"?<ContactForm/>:<VisitForm/>}</div></div>;}
