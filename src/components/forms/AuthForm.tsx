"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchemas, roles, type AuthInput, type Role } from "@/lib/schemas";
import { login, registerUser, forgotPassword } from "@/services/authService";
import { useToast } from "@/lib/toast";
type Mode="login"|"register"|"forgot";
const home:Record<Role,string>={buyer:"/properties",seller:"/dashboard",agent:"/dashboard",builder:"/builder",admin:"/admin"};
const titles={login:"Log in",register:"Create your account",forgot:"Reset your password"};
export default function AuthForm({mode}:{mode:Mode}){
 const router=useRouter();const toast=useToast();const [sent,setSent]=useState(false);
 const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<AuthInput>({resolver:zodResolver(authSchemas[mode]) as unknown as Resolver<AuthInput>,defaultValues:{role:"buyer"}});
 const c="w-full border border-line bg-white px-4 py-3 text-sm";
 const Err=({m}:{m?:string})=>m?<p role="alert" className="mt-1 text-xs text-red-700">{m}</p>:null;
 const submit=async(d:AuthInput)=>{
  if(mode==="forgot"){await forgotPassword(d.email);setSent(true);return;}
  const r=mode==="login"?await login(d):await registerUser(d);
  toast(`Demo mode: opening the ${r.role} view`);router.push(home[r.role]);};
 return <div className="mx-auto max-w-md px-5 py-16"><h1 className="font-serif text-4xl">{titles[mode]}</h1>
  <p className="mt-2 text-sm text-slate">Demo only. No real sign-in happens until the backend is connected.</p>
  {sent?<p role="status" className="mt-8 bg-white p-6 text-sm">If an account exists for that email, a reset link would be sent. Nothing was sent in demo mode.</p>:
  <form onSubmit={handleSubmit(submit)} noValidate className="mt-8 space-y-4">
   {mode==="register"&&<div><input aria-label="Full name" placeholder="Full name" className={c} {...register("name")}/><Err m={errors.name?.message}/></div>}
   <div><input aria-label="Email" placeholder="Email" className={c} {...register("email")}/><Err m={errors.email?.message}/></div>
   {mode!=="forgot"&&<div><input type="password" aria-label="Password" placeholder="Password" className={c} {...register("password")}/><Err m={errors.password?.message}/></div>}
   {mode!=="forgot"&&<div><label className="text-xs text-slate">{mode==="login"?"View the app as":"I am a"}</label><select className={c} {...register("role")}>{roles.map(r=><option key={r} value={r}>{r[0].toUpperCase()+r.slice(1)}</option>)}</select></div>}
   <button disabled={isSubmitting} className="w-full bg-matte py-3 text-sm text-ivory disabled:opacity-60">{isSubmitting?"Please wait…":titles[mode]}</button></form>}
  <p className="mt-6 flex justify-between text-sm">{mode==="login"?<><Link className="underline" href="/register">Create an account</Link><Link className="underline" href="/forgot-password">Forgot password?</Link></>:<Link className="underline" href="/login">Back to log in</Link>}</p></div>;}
