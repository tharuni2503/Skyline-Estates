"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";
import type { Property } from "@/types";
export const SLOTS:[number,number][]=[[-8,2],[10,-6],[-2,-12],[4,8],[-14,-8],[16,6]];
type K=[number,number[],number[]];
const KEYS:K[]=[[0,[0,42,52],[0,0,0]],[.15,[-4,22,30],[-6,0,2]],[.3,[-3,6,14],[-8,2,2]],[.45,[-18,5,5],[-8,2,2]],[.58,[-6,6,-9],[-8,2,2]],[.7,[4,10,10],[10,6,-6]],[.82,[16,12,6],[10,4,-2]],[1,[0,60,64],[0,0,0]]];
function sample(p:number,pos:THREE.Vector3,look:THREE.Vector3){
 let i=0;while(i<KEYS.length-2&&p>KEYS[i+1][0])i++;
 const [t0,a0,l0]=KEYS[i],[t1,a1,l1]=KEYS[i+1];const k=THREE.MathUtils.smoothstep((p-t0)/(t1-t0),0,1);
 pos.set(a0[0]+(a1[0]-a0[0])*k,a0[1]+(a1[1]-a0[1])*k,a0[2]+(a1[2]-a0[2])*k);
 look.set(l0[0]+(l1[0]-l0[0])*k,l0[1]+(l1[1]-l0[1])*k,l0[2]+(l1[2]-l0[2])*k);}
function Rig({progress,target}:{progress:MotionValue<number>;target:[number,number]|null}){
 const pos=useRef(new THREE.Vector3(0,42,52)),look=useRef(new THREE.Vector3()),wantP=useRef(new THREE.Vector3()),wantL=useRef(new THREE.Vector3());
 useFrame(({camera},dt)=>{
  if(target){wantP.current.set(target[0]+9,7,target[1]+11);wantL.current.set(target[0],3,target[1]);}
  else sample(progress.get(),wantP.current,wantL.current);
  const a=1-Math.pow(0.002,dt);pos.current.lerp(wantP.current,a);look.current.lerp(wantL.current,a);
  camera.position.copy(pos.current);camera.lookAt(look.current);});
 return null;}
const M=({c,e=0}:{c:string;e?:number})=><meshStandardMaterial color={c} roughness={0.7} emissive={e?"#D8C3A5":"#000000"} emissiveIntensity={e}/>;
function Building({p,at,selected,onSelect}:{p:Property;at:[number,number];selected:boolean;onSelect:(id:string)=>void}){
 const tower=p.category==="Apartment"||p.category==="Commercial";
 const hot=selected?0.35:0;
 return <group position={[at[0],0,at[1]]} onClick={e=>{e.stopPropagation();onSelect(p.id);}} onPointerOver={()=>{document.body.style.cursor="pointer";}} onPointerOut={()=>{document.body.style.cursor="";}}>
  {p.category==="Villa"&&<><mesh position={[0,1,0]} castShadow receiveShadow><boxGeometry args={[5,2,4]}/><M c="#F1EBE0" e={hot}/></mesh><mesh position={[-.6,2.9,0]} castShadow><boxGeometry args={[3,1.8,3]}/><M c="#E6DCCB" e={hot}/></mesh><mesh position={[-.6,4.7,0]} rotation={[0,Math.PI/4,0]} castShadow><coneGeometry args={[2.8,1.4,4]}/><M c="#2a2a2a"/></mesh><mesh position={[1.4,1.1,2.01]}><boxGeometry args={[2,1.2,.05]}/><M c="#D8C3A5" e={.6}/></mesh><mesh position={[-.6,2.9,1.52]}><boxGeometry args={[2.4,.9,.05]}/><M c="#D8C3A5" e={.5}/></mesh><mesh position={[-.6,2.07,0]} castShadow><boxGeometry args={[5.6,.14,4.6]}/><M c="#2a2a2a"/></mesh><mesh position={[-1.6,.6,2.02]}><boxGeometry args={[1.6,1.1,.05]}/><M c="#cfc6b8"/></mesh><mesh position={[1.1,5.1,-.6]} castShadow><boxGeometry args={[.5,1.2,.5]}/><M c="#6b4a38"/></mesh>{[-1.1,1.1].map(x=><mesh key={x} position={[x,1.3,1.72]}><boxGeometry args={[.8,.8,.05]}/><M c="#D8C3A5" e={.5}/></mesh>)}<mesh position={[0,.8,1.72]}><boxGeometry args={[.7,1.4,.05]}/><M c="#3e2d22"/></mesh></>}
  {tower&&<><mesh position={[0,5,0]} castShadow receiveShadow><boxGeometry args={[3,10,3]}/><M c="#2b2d31" e={hot}/></mesh>{Array.from({length:7},(_,i)=><mesh key={i} position={[0,1.2+i*1.3,0]}><boxGeometry args={[3.06,.2,3.06]}/><M c="#D8C3A5" e={.7}/></mesh>)}<mesh position={[0,.6,0]} castShadow><boxGeometry args={[4.6,1.2,4.6]}/><M c="#3a3c41"/></mesh><mesh position={[0,10.3,0]} castShadow><boxGeometry args={[2.2,.6,2.2]}/><M c="#1a1a1a"/></mesh><mesh position={[0,11.6,0]}><cylinderGeometry args={[.04,.04,2,6]}/><M c="#D8C3A5" e={1}/></mesh></>}
  {p.category==="Independent House"&&<><mesh position={[0,1.2,0]} castShadow receiveShadow><boxGeometry args={[4,2.4,3.4]}/><M c="#EDE4D4" e={hot}/></mesh><mesh position={[0,3.1,0]} rotation={[0,Math.PI/4,0]} castShadow><coneGeometry args={[3.1,1.5,4]}/><M c="#6b4a38"/></mesh></>}
  {p.category==="Residential Plot"&&<><mesh position={[0,.08,0]} receiveShadow><boxGeometry args={[6,.16,6]}/><M c="#D8C3A5" e={hot}/></mesh>{[[-3,-3],[3,-3],[-3,3],[3,3]].map(([x,z],i)=><mesh key={i} position={[x,.6,z]}><boxGeometry args={[.15,1.2,.15]}/><M c="#111111"/></mesh>)}</>}
  {selected&&<mesh position={[0,.12,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[4.2,4.5,48]}/><meshBasicMaterial color="#D8C3A5"/></mesh>}
 </group>;}
function Landscape(){
 const trees=useMemo(()=>{const o:[number,number][]=[];for(let gx=-3;gx<=3;gx++)for(let gz=-3;gz<=3;gz++){const x=gx*7+2.3,z=gz*7+.4;if(SLOTS.some(([sx,sz])=>Math.hypot(sx-x,sz-z)<7.5))continue;o.push([x,z]);}return o;},[]);
 const lamps=useMemo(()=>{const o:[number,number][]=[];for(let gx=-3;gx<=3;gx++)for(let gz=-3;gz<=3;gz+=2)o.push([gx*7-2.4,gz*7+3.6]);return o;},[]);
 return <>{trees.map(([x,z],i)=><group key={i} position={[x,0,z]}><mesh position={[0,.7,0]} castShadow><cylinderGeometry args={[.1,.14,1.4,6]}/><M c="#5a4636"/></mesh><mesh position={[0,1.9,0]} castShadow><sphereGeometry args={[.85,10,8]}/><M c={i%2?"#587a4f":"#4a6b45"}/></mesh></group>)}
  {lamps.map(([x,z],i)=><group key={i} position={[x,0,z]}><mesh position={[0,1.6,0]}><cylinderGeometry args={[.05,.06,3.2,6]}/><M c="#1a1a1a"/></mesh><mesh position={[0,3.3,0]}><sphereGeometry args={[.2,8,8]}/><M c="#D8C3A5" e={1.2}/></mesh></group>)}
  <mesh rotation={[-Math.PI/2,0,0]} position={[-8,.04,2]} receiveShadow><planeGeometry args={[11,10]}/><meshStandardMaterial color="#6f8a5f" roughness={1}/></mesh>
  <mesh position={[-8,.1,7.4]}><boxGeometry args={[4,.12,2]}/><meshStandardMaterial color="#5aa7bd" metalness={.3} roughness={.15}/></mesh>
  {[-12,-4].map(x=><mesh key={x} position={[x,.4,-2.6]} castShadow><boxGeometry args={[2.6,.8,.5]}/><M c="#3e5a3a"/></mesh>)}</>;}
function City(){
 const cells=useMemo(()=>{const out:{x:number;z:number;h:number}[]=[];for(let gx=-4;gx<=4;gx++)for(let gz=-4;gz<=4;gz++){const x=gx*7,z=gz*7;if(SLOTS.some(([sx,sz])=>Math.hypot(sx-x,sz-z)<7.5))continue;out.push({x,z,h:1.2+(Math.abs(gx*37+gz*17+gx*gz*7)%9)*.9});}return out;},[]);
 return <>{cells.map((c,i)=><group key={i} position={[c.x,0,c.z]}><mesh position={[0,c.h/2,0]} castShadow receiveShadow><boxGeometry args={[3.4,c.h,3.4]}/><M c={i%3?"#cfc6b8":"#bdb3a3"}/></mesh>{i%4===0&&<mesh position={[2.4,.7,2.4]} castShadow><coneGeometry args={[.7,1.4,7]}/><M c="#4f6b4a"/></mesh>}</group>)}
  {[-3,-2,-1,0,1,2,3,4].map(g=><group key={g}><mesh rotation={[-Math.PI/2,0,0]} position={[g*7-3.5,.02,0]}><planeGeometry args={[1.6,70]}/><meshStandardMaterial color="#2a2a2a"/></mesh><mesh rotation={[-Math.PI/2,0,0]} position={[0,.02,g*7-3.5]}><planeGeometry args={[70,1.6]}/><meshStandardMaterial color="#2a2a2a"/></mesh></group>)}
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,.03,36]}><planeGeometry args={[80,12]}/><meshStandardMaterial color="#6fa8b8" metalness={.4} roughness={.2} transparent opacity={.85}/></mesh></>;}
export default function Scene({items,progress,selected,onSelect,lite}:{items:Property[];progress:MotionValue<number>;selected:string|null;onSelect:(id:string|null)=>void;lite:boolean}){
 const sel=items.findIndex(p=>p.id===selected);
 return <Canvas shadows={!lite} dpr={lite?[1,1.25]:[1,2]} camera={{position:[0,42,52],fov:45,near:.5,far:260}} onPointerMissed={()=>onSelect(null)}>
  <color attach="background" args={["#111111"]}/><fog attach="fog" args={["#111111",55,150]}/>
  <hemisphereLight args={["#F8F5F0","#2a2a2a",.7]}/>
  <directionalLight position={[25,35,15]} intensity={1.5} color="#fff1dc" castShadow={!lite} shadow-mapSize={[1024,1024]} shadow-camera-left={-45} shadow-camera-right={45} shadow-camera-top={45} shadow-camera-bottom={-45}/>
  <mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[220,220]}/><meshStandardMaterial color="#9d9486"/></mesh>
  <City/><Landscape/>
  {items.map((p,i)=><Building key={p.id} p={p} at={SLOTS[i]} selected={p.id===selected} onSelect={onSelect}/>)}
  <Sparkles count={lite?40:120} scale={[90,30,90]} size={3} speed={.3} color="#D8C3A5"/>
  <Rig progress={progress} target={sel>=0?SLOTS[sel]:null}/>
 </Canvas>;}
