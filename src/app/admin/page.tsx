"use client";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/lib/toast";
import { downloadCsv } from "@/lib/csv";
import Panel from "@/components/admin/Panel";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useStore } from "@/lib/store";
import { inr } from "@/lib/format";
type St="Pending"|"Approved"|"Rejected";
const chart=[{m:"Jun",leads:42},{m:"Jul",leads:58},{m:"Aug",leads:51},{m:"Sep",leads:77},{m:"Oct",leads:93}];
export default function Admin(){
 const toast=useToast(); const {properties,remove}=useStore(); const [del,setDel]=useState<string|null>(null); const [reason,setReason]=useState("");
 const [st,setSt]=useState<Record<string,St>>(Object.fromEntries(properties.map((p,i)=>[p.id,i%3===0?"Pending":"Approved"])));
 const [q,setQ]=useState(""); const [view,setView]=useState("Property approval"); const [confirm,setConfirm]=useState<string|null>(null);
 const rows=properties.filter(p=>`${p.title} ${p.location}`.toLowerCase().includes(q.toLowerCase()));
 const n=(s:St)=>properties.filter(p=>(st[p.id]??"Pending")===s).length;
 return <div className="min-h-screen bg-white md:grid md:grid-cols-[220px_1fr]">
  <nav aria-label="Dashboard" className="bg-charcoal p-5 text-sm text-ivory/80 md:min-h-screen"><p className="font-serif text-lg text-ivory">Admin</p><ul className="mt-4 flex gap-4 overflow-x-auto md:block md:space-y-3">{["Property approval","Users","Agents","Builders","Leads","Reports","Analytics","Settings"].map(v=><li key={v}><button onClick={()=>setView(v)} aria-current={view===v} className={`whitespace-nowrap ${view===v?"text-beige":""}`}>{v}</button></li>)}</ul></nav>
  <section className="p-6">{view!=="Property approval"?<Panel name={view}/>:<><h1 className="font-serif text-3xl">Property approval</h1>
   <div className="mt-6 grid gap-4 sm:grid-cols-3">{(["Pending","Approved","Rejected"] as St[]).map(s=><div key={s} className="border border-line p-4"><p className="text-sm text-slate">{s}</p><p className="font-serif text-3xl">{n(s)}</p></div>)}</div>
   <div className="mt-8 h-56"><ResponsiveContainer><BarChart data={chart}><XAxis dataKey="m"/><YAxis/><Tooltip/><Bar dataKey="leads" fill="#D8C3A5"/></BarChart></ResponsiveContainer></div>
   <input aria-label="Search properties" placeholder="Search listings" value={q} onChange={e=>setQ(e.target.value)} className="mt-8 w-full max-w-sm border border-line px-4 py-2 text-sm"/><button className="ml-4 text-sm underline" onClick={()=>downloadCsv("properties.csv",[["Property","Location","Price","Status"],...rows.map(p=>[p.title,p.location,String(p.price),st[p.id]??"Pending"])])}>Download CSV</button>
   <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-slate"><tr><th className="py-2">Property</th><th>Price</th><th>Status</th><th>Action</th></tr></thead><tbody>
    {rows.map(p=><tr key={p.id} className="border-t border-line"><td className="py-3">{p.title}</td><td>{inr(p.price)}</td><td>{st[p.id]??"Pending"}</td><td className="space-x-3">{(st[p.id]??"Pending")==="Pending"?<><button className="underline" onClick={()=>{setSt({...st,[p.id]:"Approved"});toast("Listing approved");}}>Approve</button><button className="underline" onClick={()=>setConfirm(p.id)}>Reject</button></>:null}<Link className="underline" href={`/property/${p.id}`}>View</Link><button className="underline" onClick={()=>setDel(p.id)}>Delete</button></td></tr>)}
    {rows.length===0&&<tr><td colSpan={4} className="py-8 text-center text-slate">No listings match your search.</td></tr>}</tbody></table></div>
   {confirm&&<div role="dialog" aria-modal="true" className="fixed inset-0 flex items-center justify-center bg-matte/60"><div className="bg-white p-6"><p>Reject this listing? Add a reason for the owner.</p><textarea aria-label="Rejection reason" value={reason} onChange={e=>setReason(e.target.value)} rows={3} className="mt-3 w-full border border-line p-2 text-sm"/><div className="mt-4 flex gap-4"><button disabled={!reason.trim()} className="bg-matte px-4 py-2 text-ivory disabled:opacity-50" onClick={()=>{setReason("");setSt({...st,[confirm]:"Rejected"});toast("Listing rejected");setConfirm(null);}}>Reject listing</button><button className="underline" onClick={()=>setConfirm(null)}>Cancel</button></div></div></div>}</>}
  {del&&<div role="dialog" aria-modal="true" className="fixed inset-0 flex items-center justify-center bg-matte/60"><div className="bg-white p-6"><p>Delete this listing permanently?</p><div className="mt-4 flex gap-4"><button className="bg-matte px-4 py-2 text-ivory" onClick={()=>{remove(del);setDel(null);toast("Listing deleted");}}>Delete listing</button><button className="underline" onClick={()=>setDel(null)}>Cancel</button></div></div></div>}
  </section></div>;}
