"use client";
import { useState } from "react";
import VisitForm from "@/components/forms/VisitForm";
import ContactForm from "@/components/forms/ContactForm";
export default function Contact(){const [tab,setTab]=useState<"msg"|"visit">("msg");
 return <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2">
 <div><h1 className="font-serif text-4xl">Talk to an agent</h1><p className="mt-4 max-w-md text-slate">Send us a question or book a site visit. Our Hyderabad office is open Monday to Saturday, 10 AM to 7 PM.</p>
  <address className="mt-8 space-y-1 text-sm not-italic"><p>Skyline Estates, Financial District, Hyderabad 500032</p><p>hello@skylineestates.in</p><p>+91 40 0000 0000</p></address>
  <div className="mt-8 flex aspect-video items-center justify-center bg-line text-sm text-slate">Map placeholder: add a Google Maps embed here</div></div>
 <div><div role="tablist" className="mb-4 flex gap-6 border-b border-line">{([["msg","Send an enquiry"],["visit","Book a site visit"]] as const).map(([k,l])=><button key={k} role="tab" aria-selected={tab===k} onClick={()=>setTab(k)} className={`pb-3 text-sm ${tab===k?"border-b-2 border-matte font-medium":"text-slate"}`}>{l}</button>)}</div>
  {tab==="msg"?<ContactForm/>:<VisitForm/>}</div></div>;}
