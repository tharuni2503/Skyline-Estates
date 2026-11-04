"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import AutoVideo from "@/components/common/AutoVideo";
import { useIntroDone } from "@/lib/intro";
import { categories } from "@/data/content";

const EASE: [number, number, number, number] = [.22, 1, .36, 1];
const LINES = ["Find a place", "that feels extraordinary."];
const cell = "bg-matte/55 px-4 py-4 text-ivory placeholder:text-ivory/60 [&>option]:text-charcoal";

function Rise({ ready, delay, className, children }: { ready: boolean; delay: number; className?: string; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.1, delay, ease: EASE }}>{children}</motion.div>;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: s } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const vScale = useTransform(s, [0, 1], [1, 1.14]);
  const vY = useTransform(s, [0, 1], ["0%", "12%"]);
  const dim = useTransform(s, [0, .9], [0, .92]);
  const tY = useTransform(s, [0, 1], [0, -90]);
  const tO = useTransform(s, [0, .55], [1, 0]);

  return (
    <section ref={ref} aria-label="Skyline Estates" className="grain relative flex min-h-[100svh] items-end overflow-hidden bg-matte text-ivory">
      <motion.div style={reduce ? undefined : { scale: vScale, y: vY }} className="absolute inset-0">
        {/* slow push-in on top of the footage's own camera move */}
        <motion.div className="absolute inset-0" initial={{ scale: 1 }} animate={ready && !reduce ? { scale: 1.07 } : { scale: 1 }} transition={{ duration: 22, ease: "linear" }}>
          <AutoVideo src="/videos/hero.mp4" srcLite="/videos/hero-720.mp4" poster="/videos/hero-poster.jpg" priority />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-matte via-matte/45 to-matte/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(17,17,17,.6)_100%)]" aria-hidden="true" />
      {!reduce && <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-matte" aria-hidden="true" />}

      <motion.div style={reduce ? undefined : { y: tY, opacity: tO }} className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 md:pb-28">
        <h1 className="font-serif text-[clamp(2.6rem,7.6vw,7.25rem)] font-normal leading-[1.02] tracking-[-.01em]">
          {LINES.map((l, i) => (
            <span key={l} className="-mb-[.14em] block overflow-hidden pb-[.14em]">
              <motion.span className="block" initial={reduce ? false : { y: "108%" }} animate={ready ? { y: 0 } : undefined} transition={{ duration: 1.25, delay: .1 + i * .14, ease: EASE }}>{l}</motion.span>
            </span>
          ))}
        </h1>
        <Rise ready={ready} delay={.7} className="mt-6 max-w-xl text-ivory/80">
          <p>Discover exceptional properties, thoughtfully selected for the way you want to live.</p>
        </Rise>
        <Rise ready={ready} delay={.85} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
          <Link href="/properties" className="bg-beige px-8 py-3 font-medium text-matte transition hover:bg-ivory">Explore properties</Link>
        </Rise>
        <Rise ready={ready} delay={1}>
          <form action="/properties" className="mt-10 grid max-w-4xl grid-cols-2 gap-px bg-ivory/15 text-sm backdrop-blur-md lg:grid-cols-[auto_1.4fr_1fr_1fr_auto]">
            <select name="listing" aria-label="Buy or rent" className={`${cell} col-span-2 lg:col-span-1`}><option>Buy</option><option>Rent</option></select>
            <input name="q" aria-label="Location" placeholder="Location, e.g. Kokapet" className={`${cell} col-span-2 lg:col-span-1`} />
            <select name="category" aria-label="Property type" className={cell}><option value="">Any type</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
            <select name="maxPrice" aria-label="Maximum budget" className={cell}><option value="">Any budget</option><option value="5000000">Up to ₹50 L</option><option value="10000000">Up to ₹1 Cr</option><option value="20000000">Up to ₹2 Cr</option><option value="50000000">Up to ₹5 Cr</option></select>
            <button className="col-span-2 bg-beige px-8 py-4 font-medium text-matte transition hover:bg-ivory lg:col-span-1">Search</button>
          </form>
        </Rise>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-8 right-10 hidden flex-col items-center gap-3 text-[11px] tracking-[.3em] text-ivory/60 md:flex">
        <span className="[writing-mode:vertical-rl]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/25">
          <motion.span className="absolute inset-x-0 top-0 h-5 bg-beige" animate={reduce ? {} : { y: [-20, 56] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        </span>
      </div>
    </section>
  );
}
