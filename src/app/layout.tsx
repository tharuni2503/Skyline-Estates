import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ToastProvider } from "@/lib/toast";
import { StoreProvider } from "@/lib/store";
import Footer from "@/components/layout/Footer";
const playfair=Playfair_Display({subsets:["latin"],variable:"--font-playfair"});
const poppins=Poppins({subsets:["latin"],weight:["300","400","500","600"],variable:"--font-poppins"});
export const metadata:Metadata={title:"Skyline Estates — Find Your Perfect Space",description:"Premium properties across Hyderabad."};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" className={`${playfair.variable} ${poppins.variable}`}><body><ToastProvider><StoreProvider><Navbar/><main>{children}</main><Footer/></StoreProvider></ToastProvider></body></html>;}
