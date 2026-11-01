"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { properties as seed } from "@/data/properties";
import type { Property } from "@/types";
const K={p:"skyline.properties",w:"skyline.wishlist",c:"skyline.compare"};
interface Store{properties:Property[];ready:boolean;wishlist:string[];compare:string[];
 toggleWish:(id:string)=>void;toggleCompare:(id:string)=>void;clearCompare:()=>void;
 add:(p:Omit<Property,"id"|"postedAt">)=>void;update:(id:string,patch:Partial<Property>)=>void;remove:(id:string)=>void}
const Ctx=createContext<Store|null>(null);
export const useStore=()=>{const s=useContext(Ctx);if(!s)throw new Error("useStore must be used inside StoreProvider");return s;};
const read=<T,>(k:string,d:T):T=>{try{const v=window.localStorage.getItem(k);return v?JSON.parse(v) as T:d;}catch{return d;}};
export function StoreProvider({children}:{children:React.ReactNode}){
 const [properties,setProps]=useState<Property[]>(seed);const [wishlist,setW]=useState<string[]>([]);const [compare,setC]=useState<string[]>([]);const [ready,setReady]=useState(false);
 useEffect(()=>{setProps(read(K.p,seed));setW(read(K.w,[]));setC(read(K.c,[]));setReady(true);},[]);
 useEffect(()=>{if(!ready)return;try{window.localStorage.setItem(K.p,JSON.stringify(properties));window.localStorage.setItem(K.w,JSON.stringify(wishlist));window.localStorage.setItem(K.c,JSON.stringify(compare));}catch{}},[properties,wishlist,compare,ready]);
 const toggleWish=useCallback((id:string)=>setW(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]),[]);
 const toggleCompare=useCallback((id:string)=>setC(s=>s.includes(id)?s.filter(x=>x!==id):s.length<4?[...s,id]:s),[]);
 const add=useCallback((p:Omit<Property,"id"|"postedAt">)=>setProps(l=>[{...p,id:`p${Date.now()}`,postedAt:new Date().toISOString().slice(0,10)},...l]),[]);
 const update=useCallback((id:string,patch:Partial<Property>)=>setProps(l=>l.map(p=>p.id===id?{...p,...patch}:p)),[]);
 const remove=useCallback((id:string)=>{setProps(l=>l.filter(p=>p.id!==id));setW(s=>s.filter(x=>x!==id));setC(s=>s.filter(x=>x!==id));},[]);
 return <Ctx.Provider value={{properties,ready,wishlist,compare,toggleWish,toggleCompare,clearCompare:()=>setC([]),add,update,remove}}>{children}</Ctx.Provider>;}
