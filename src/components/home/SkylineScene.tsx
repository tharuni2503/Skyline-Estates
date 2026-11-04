"use client";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
interface T{w:number;d:number;h:number;x:number;z:number}
const towers:T[]=[{w:60,d:60,h:200,x:-95,z:-40},{w:50,d:50,h:310,x:0,z:0},{w:70,d:50,h:140,x:95,z:30},{w:44,d:44,h:90,x:-40,z:85},{w:40,d:60,h:175,x:65,z:-85}];
const win=(c:string)=>`repeating-linear-gradient(0deg,rgba(216,195,165,.32) 0 2px,transparent 2px 16px),${c}`;
const edge="1px solid rgba(216,195,165,.28)";
function Tower({w,d,h,x,z}:T){
 const face=(bg:string,s:React.CSSProperties):React.CSSProperties=>({position:"absolute",background:bg,border:edge,...s});
 return <div style={{position:"absolute",left:"50%",top:"50%",width:w,height:h,marginLeft:-w/2,marginTop:-h,transformStyle:"preserve-3d",transform:`translate3d(${x}px,0,${z}px)`}}>
  <div style={face(win("#242424"),{width:w,height:h,transform:`translateZ(${d/2}px)`})}/>
  <div style={face(win("#1c1c1c"),{width:w,height:h,transform:`rotateY(180deg) translateZ(${d/2}px)`})}/>
  <div style={face(win("#191919"),{width:d,height:h,left:(w-d)/2,transform:`rotateY(90deg) translateZ(${w/2}px)`})}/>
  <div style={face(win("#2a2a2a"),{width:d,height:h,left:(w-d)/2,transform:`rotateY(-90deg) translateZ(${w/2}px)`})}/>
  <div style={face("#3a3a3a",{width:w,height:d,top:(h-d)/2,transform:`rotateX(90deg) translateZ(${h/2}px)`})}/></div>;}
export default function SkylineScene(){
 const reduce=useReducedMotion();
 return <div aria-hidden="true" className="pointer-events-none absolute bottom-24 right-6 hidden h-[460px] w-[460px] lg:block xl:right-16" style={{perspective:1400}}>
  <motion.div className="absolute inset-0" style={{rotateX:-22,transformStyle:"preserve-3d"}} initial={{rotateY:-30}} animate={reduce?{rotateY:-30}:{rotateY:[-35,35,-35]}} transition={{duration:20,repeat:Infinity,ease:"easeInOut"}}>
   <div style={{position:"absolute",left:"50%",top:"50%",width:380,height:380,marginLeft:-190,marginTop:-190,transform:"rotateX(90deg)",border:edge,background:"rgba(216,195,165,.05)"}}/>
   {towers.map((t,i)=><Tower key={i} {...t}/>)}
  </motion.div></div>;}
