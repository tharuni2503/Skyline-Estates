"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
const w=170,d=120,h=90,rh=52;
const L=Math.hypot(d/2,rh),tilt=Math.atan2(d/2,rh)*180/Math.PI;
const edge="1px solid rgba(216,195,165,.35)";
const el=(bg:string,ew:number,eh:number,t:string,extra:React.CSSProperties={}):React.CSSProperties=>({position:"absolute",left:-ew/2,top:-eh/2,width:ew,height:eh,background:bg,border:edge,transform:t,...extra});
const wall="#e9e0d3";
const front=`linear-gradient(#1d1d1d,#1d1d1d) 50% 100%/24px 44px no-repeat,linear-gradient(#9fb4bd,#9fb4bd) 18% 32%/26px 28px no-repeat,linear-gradient(#9fb4bd,#9fb4bd) 82% 32%/26px 28px no-repeat,${wall}`;
const side=`linear-gradient(#9fb4bd,#9fb4bd) 50% 35%/28px 28px no-repeat,#d8cdbd`;
export default function HouseModel(){
 const reduce=useReducedMotion();const ang=useMotionValue(-30);const [auto,setAuto]=useState(true);
 useEffect(()=>{if(reduce)setAuto(false);},[reduce]);const [drag,setDrag]=useState(false);
 useAnimationFrame((_,dt)=>{if(auto&&!drag)ang.set(ang.get()+dt*0.025);});
 return <div className="flex flex-col items-center">
  <div role="img" aria-label="Rotating 3D model of a house" className="relative h-[340px] w-full max-w-md cursor-grab touch-pan-y select-none active:cursor-grabbing" style={{perspective:1300}}
   onPointerDown={e=>{setDrag(true);e.currentTarget.setPointerCapture(e.pointerId);}} onPointerUp={()=>setDrag(false)}
   onPointerMove={e=>{if(drag)ang.set(ang.get()+e.movementX*0.6);}}>
   <motion.div className="absolute left-1/2 top-[62%]" style={{rotateX:-18,rotateY:ang,transformStyle:"preserve-3d"}}>
    <div style={el("rgba(216,195,165,.08)",w+120,d+120,"rotateX(90deg)")}/>
    <div style={el(front,w,h,`translate3d(0,${-h/2}px,${d/2}px)`)}/>
    <div style={el(wall,w,h,`translate3d(0,${-h/2}px,${-d/2}px) rotateY(180deg)`)}/>
    <div style={el(side,d,h,`translate3d(${w/2}px,${-h/2}px,0) rotateY(90deg)`)}/>
    <div style={el(side,d,h,`translate3d(${-w/2}px,${-h/2}px,0) rotateY(-90deg)`)}/>
    <div style={el("#2b2b2b",w+14,L,`translate3d(0,${-h-rh/2}px,${d/4}px) rotateX(${tilt}deg)`)}/>
    <div style={el("#222",w+14,L,`translate3d(0,${-h-rh/2}px,${-d/4}px) rotateX(${-tilt}deg)`)}/>
    <div style={el(wall,d,rh,`translate3d(${w/2}px,${-h-rh/2}px,0) rotateY(90deg)`,{clipPath:"polygon(50% 0,0 100%,100% 100%)",border:"none"})}/>
    <div style={el(wall,d,rh,`translate3d(${-w/2}px,${-h-rh/2}px,0) rotateY(-90deg)`,{clipPath:"polygon(50% 0,0 100%,100% 100%)",border:"none"})}/>
   </motion.div></div>
  <button onClick={()=>setAuto(a=>!a)} aria-pressed={auto} className="mt-2 text-sm underline">{auto?"Pause rotation":"Auto-rotate"}</button>
  <p className="mt-1 text-xs text-ivory/50">Illustrative model, not a specific listing. Drag to turn.</p></div>;}
