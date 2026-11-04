"use client";
import { useState } from "react";
const layers=Array.from({length:7},(_,i)=>i);
function Plan({beds,top}:{beds:number;top:boolean}){
 const box=(label:string,cls:string)=><div className={`flex items-center justify-center border-2 border-beige text-[11px] text-ivory ${cls}`} style={{background:top?"rgba(216,195,165,.18)":"transparent"}}>{top?label:""}</div>;
 return <div className="flex h-full w-full flex-col"><div className="flex h-1/2">{box("Living","w-[55%]")}{box("Kitchen","flex-1")}</div>
  <div className="flex flex-1">{Array.from({length:beds},(_,i)=><div key={i} className="flex-1">{box(`Bed ${i+1}`,"h-full w-full")}</div>)}{box("Bath","w-[16%]")}</div></div>;}
export default function FloorPlan3D({bhk}:{bhk:number}){
 const [rot,setRot]=useState(35);const beds=Math.max(1,Math.min(bhk||1,4));
 return <div><h2 className="mt-14 border-t border-line pt-6 font-serif text-3xl">Floor plan</h2>
  <div className="mt-6 bg-matte p-6"><div className="relative mx-auto h-[300px] w-full max-w-xl" style={{perspective:1100}}>
   <div className="absolute left-1/2 top-1/2 h-[200px] w-[340px] -translate-x-1/2 -translate-y-1/2" style={{transformStyle:"preserve-3d",transform:`rotateX(58deg) rotateZ(${rot}deg)`}}>
    {layers.map(i=><div key={i} className="absolute inset-0" style={{transform:`translateZ(${i*5}px)`}}><Plan beds={beds} top={i===layers.length-1}/></div>)}</div></div>
   <label className="mt-2 block text-center text-sm text-ivory/80">Rotate<input type="range" min={0} max={360} value={rot} onChange={e=>setRot(+e.target.value)} className="ml-3 w-48 align-middle accent-beige"/></label></div>
  <p className="mt-1 text-xs text-slate">Indicative layout generated from the BHK count. Final plans are shared by the agent.</p></div>;}
