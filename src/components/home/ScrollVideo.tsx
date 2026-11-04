"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import MaskReveal from "@/components/common/MaskReveal";
import { useMediaMode, type MediaMode } from "@/lib/media";
import { setMotionOverride, useMotionOverride } from "@/lib/motionPref";

/* ---------------------------------------------------------------------------
 * THE FILM: six chapters, three honest kinds of picture.
 *
 *  "video"  real footage, scrubbed by scroll (scenes 01-02: the one shot we have)
 *  "still"  a real still from the property, labelled as a still
 *  "board"  a storyboard panel for a scene that has not been filmed yet.
 *           It shows NO imagery, so the same villa is never passed off as
 *           a pool, a living room or an interior.
 *
 * LAYERS are what you see; CHAPTERS are the captions. To make a scene real,
 * drop the files listed in FOOTAGE_NEEDED.md into public/videos/ and change
 * that layer to { kind: "video", src, lite, still }. Nothing else changes.
 * A video layer that fails to load falls back to its own still; the rest of
 * the film keeps working.
 * ------------------------------------------------------------------------- */
type Layer = { id: string; kind: "video" | "still" | "board"; src?: string; lite?: string; still?: string; pos?: string; from: number; to: number };
type Chapter = { id: string; layer: string; title: string; body: string; from: number; to: number; still?: string; pos?: string; cta?: { label: string; href: string }[] };

const POSTER = "/videos/film-1-approach.jpg";
const LAYERS: Layer[] = [
  { id: "approach", kind: "video", src: "/videos/scrub.mp4", lite: "/videos/scrub-mobile.mp4", still: "/videos/film-1-approach.jpg", from: 0, to: 1 / 3 },
  { id: "garden", kind: "board", from: 1 / 3, to: 1 / 2 },
  { id: "living", kind: "board", from: 1 / 2, to: 2 / 3 },
  { id: "details", kind: "board", from: 2 / 3, to: 5 / 6 },
  { id: "finale", kind: "still", still: "/videos/hero-poster.jpg", pos: "50% 55%", from: 5 / 6, to: 1 },
];
const CHAPTERS: Chapter[] = [
  { id: "arrival", layer: "approach", title: "The Arrival", body: "A wide first look. The lawn opens, the roofline appears and the whole residence settles into view.", from: 0, to: 1 / 6, still: "/videos/film-1-approach.jpg" },
  { id: "approach", layer: "approach", title: "The Approach", body: "Stepping stones lead past the palms toward a timber balcony beneath a terracotta roof.", from: 1 / 6, to: 1 / 3, still: "/videos/film-2-path.jpg" },
  { id: "garden", layer: "garden", title: "The Garden", body: "The pool, the greenery and the outdoor living spaces that extend the home into the landscape.", from: 1 / 3, to: 1 / 2 },
  { id: "living", layer: "living", title: "The Living Space", body: "Step inside to the living room and the interior architecture that frames it.", from: 1 / 2, to: 2 / 3 },
  { id: "details", layer: "details", title: "The Details", body: "Lighting, materials and the finishing touches that set a Skyline home apart.", from: 2 / 3, to: 5 / 6 },
  { id: "reveal", layer: "finale", title: "The Final Reveal", body: "One last wide look at the whole residence. Continue the visit in our collection, or walk the 3D city.", from: 5 / 6, to: 1, still: "/videos/hero-poster.jpg", cta: [{ label: "Explore the villas", href: "/properties?category=Villa" }, { label: "Walk the 3D city", href: "/explore" }] },
];
const FADE = .03;
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const chapterAt = (v: number) => { const i = CHAPTERS.findIndex(c => v >= c.from && v < c.to); return i < 0 ? CHAPTERS.length - 1 : i; };
const layerAt = (v: number) => { const i = LAYERS.findIndex(c => v >= c.from && v < c.to); return i < 0 ? LAYERS.length - 1 : i; };
const layerOf = (c: Chapter) => LAYERS.find(l => l.id === c.layer)!;

/** What to tell the visitor about the picture they are looking at. null = real footage playing. */
function noteFor(c: Chapter, failed: Record<string, boolean>): string | null {
  const l = layerOf(c);
  if (l.kind === "video") return failed[l.id] ? "The video could not load. Showing a still from the film." : null;
  if (l.kind === "still") return "Still image. Footage for this scene is coming.";
  return "Footage for this scene is in production.";
}
function Note({ text, className = "" }: { text: string; className?: string }) {
  return <p className={`inline-flex items-center gap-2 border border-ivory/30 px-3 py-1.5 text-[11px] uppercase tracking-[.2em] text-ivory/80 ${className}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-beige" />{text}</p>;
}

/** Storyboard panel: architectural hairlines and an outlined scene number. No picture, by design. */
function Board({ n }: { n: string }) {
  return (
    <div className="absolute inset-0 bg-matte" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,rgba(216,195,165,.16),transparent_62%)]" />
      <span className="absolute inset-y-0 right-[30%] w-px bg-ivory/10" /><span className="absolute inset-y-0 right-[12%] w-px bg-ivory/10" />
      <span className="absolute inset-x-0 top-[22%] h-px bg-ivory/10" /><span className="absolute inset-x-0 bottom-[22%] h-px bg-ivory/10" />
      <span className="absolute right-[6vw] top-1/2 -translate-y-1/2 select-none font-serif text-[min(52vw,62vh)] leading-none text-transparent" style={{ WebkitTextStroke: "1px rgba(216,195,165,.4)" }}>{n}</span>
    </div>
  );
}

function LayerView({ L, i, p, armed, lite, failed, setRef, kick, onBad }: { L: Layer; i: number; p: MotionValue<number>; armed: boolean; lite: boolean; failed: boolean; setRef: (el: HTMLVideoElement | null) => void; kick: () => void; onBad: () => void }) {
  const first = i === 0, last = i === LAYERS.length - 1;
  const opacity = useTransform(
    p,
    first ? [0, L.to, L.to + FADE] : last ? [L.from - FADE, L.from, 1] : [L.from - FADE, L.from, L.to, L.to + FADE],
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(p, [clamp(L.from - FADE), clamp(L.to + FADE)], [1, 1.08]);
  const n = pad(i + 2); // layers 1-3 are scenes 03, 04, 05
  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden="true">
      {L.kind === "board" && <Board n={n} />}
      {L.kind === "still" && <motion.div style={{ scale }} className="absolute inset-0"><Image src={L.still!} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: L.pos }} /></motion.div>}
      {L.kind === "video" && (
        <>
          <div className="absolute inset-0"><Image src={L.still!} alt="" fill sizes="100vw" priority={first} className="object-cover" /></div>
          {!failed && <video ref={setRef} src={armed ? (lite && L.lite ? L.lite : L.src) : undefined} poster={L.still} muted playsInline disablePictureInPicture tabIndex={-1} preload={armed ? "auto" : "none"} onLoadedMetadata={kick} onError={onBad} className="absolute inset-0 h-full w-full object-cover" />}
        </>
      )}
    </motion.div>
  );
}

function Caption({ p, c, i, active, note }: { p: MotionValue<number>; c: Chapter; i: number; active: boolean; note: string | null }) {
  const n = CHAPTERS.length, f = .03;
  const inp: number[] = [], out: number[] = [];
  if (i === 0) { inp.push(0); out.push(1); } else { inp.push(c.from, c.from + f); out.push(0, 1); }
  if (i === n - 1) { inp.push(1); out.push(1); } else { inp.push(c.to - f, c.to); out.push(1, 0); }
  const opacity = useTransform(p, inp, out);
  const rise = useTransform(p, i === 0 ? [0, 1] : [c.from, c.from + .05], i === 0 ? ["0%", "0%"] : ["110%", "0%"]);
  const lift = useTransform(p, i === n - 1 ? [0, 1] : [c.to - f, c.to], i === n - 1 ? [0, 0] : [0, -28]);
  return (
    <motion.div style={{ opacity, y: lift }} aria-hidden={!active} className={`absolute bottom-28 left-0 max-w-2xl px-5 md:px-10 ${active ? "" : "pointer-events-none"}`}>
      <p className="mb-3 text-xs tracking-[.4em] text-beige">SCENE {pad(i + 1)}</p>
      <div className="overflow-hidden pb-[.12em]"><motion.h3 style={{ y: rise }} className="font-serif text-4xl leading-[1.05] md:text-7xl">{c.title}</motion.h3></div>
      <p className="mt-4 max-w-md text-ivory/85">{c.body}</p>
      {note && <Note text={note} className="mt-5" />}
      {c.cta && active && (
        <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href={c.cta[0].href} className="bg-beige px-8 py-3 text-sm font-medium text-matte transition hover:bg-ivory">{c.cta[0].label}</Link>
          {c.cta[1] && <Link href={c.cta[1].href} className="border-b border-ivory/50 pb-1 text-sm transition hover:border-beige hover:text-beige">{c.cta[1].label}</Link>}
        </div>
      )}
    </motion.div>
  );
}

function PinnedFilm({ mode, overridden }: { mode: MediaMode | null; overridden: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [armedTo, setArmedTo] = useState(-1);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const cursor = useRef<number[]>(LAYERS.map(() => 0));
  const target = useRef(0);
  const raf = useRef(0);
  const lite = mode === "lite";

  // Eased scrubbing: the playhead glides toward the scroll position instead of snapping.
  const tick = useCallback(function run() {
    raf.current = 0;
    let more = false;
    LAYERS.forEach((c, i) => {
      const el = vids.current[i];
      if (!el || !isFinite(el.duration) || !el.duration) return;
      const goal = Math.min(el.duration - .05, clamp((target.current - c.from) / (c.to - c.from)) * el.duration);
      const cur = cursor.current[i];
      const next = cur + (goal - cur) * .16;
      const settled = Math.abs(goal - next) < .012;
      cursor.current[i] = settled ? goal : next;
      if (el.seeking) { more = true; return; }
      if (Math.abs(el.currentTime - cursor.current[i]) > .016) {
        const f = (el as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek;
        if (f) f.call(el, cursor.current[i]); else el.currentTime = cursor.current[i];
      }
      if (!settled) more = true;
    });
    if (more) raf.current = requestAnimationFrame(run);
  }, []);
  const kick = useCallback(() => { if (!raf.current) raf.current = requestAnimationFrame(tick); }, [tick]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useMotionValueEvent(p, "change", v => {
    target.current = v; kick();
    const i = chapterAt(v); setActive(a => (a === i ? a : i));
    const need = layerAt(clamp(v + .1));
    setArmedTo(a => (need > a ? need : a));
  });

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setArmedTo(a => Math.max(a, 0)); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const jump = (c: Chapter) => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + Math.min(.999, c.from + .02) * span, behavior: "smooth" });
  };

  return (
    <section ref={ref} aria-label="A tour of a Skyline residence in six scenes" style={{ height: lite ? "420vh" : "600vh" }} className="relative bg-matte text-ivory">
      <div className="grain sticky top-0 h-[100svh] overflow-hidden bg-matte">
        <div className="absolute inset-0" aria-hidden="true"><Image src={POSTER} alt="" fill sizes="100vw" className="object-cover" /></div>
        {LAYERS.map((L, i) => <LayerView key={L.id} L={L} i={i} p={p} armed={armedTo >= i} lite={lite} failed={!!failed[L.id]} kick={kick} onBad={() => setFailed(f => ({ ...f, [L.id]: true }))} setRef={el => { vids.current[i] = el; }} />)}
        <div className="absolute inset-0 bg-gradient-to-t from-matte/85 via-matte/15 to-matte/35" aria-hidden="true" />
        {CHAPTERS.map((c, i) => <Caption key={c.id} p={p} c={c} i={i} active={active === i} note={noteFor(c, failed)} />)}

        <p className="absolute left-5 top-24 text-xs tracking-[.4em] text-ivory/70 md:left-10" aria-hidden="true">{pad(active + 1)} / {pad(CHAPTERS.length)}</p>

        <nav aria-label="Film chapters" className="absolute right-10 top-1/2 hidden -translate-y-1/2 md:block">
          <ol className="space-y-4 text-right text-sm">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <button onClick={() => jump(c)} aria-current={active === i ? "step" : undefined} className={`flex items-center justify-end gap-3 transition-colors ${active === i ? "text-ivory" : "text-ivory/45 hover:text-ivory/80"}`}>
                  {c.title}
                  <span className={`block h-px bg-beige transition-all duration-500 ${active === i ? "w-10" : "w-4 opacity-50"}`} />
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <nav aria-label="Film chapters" className="absolute inset-x-5 bottom-14 flex justify-between md:hidden">
          {CHAPTERS.map((c, i) => (
            <button key={c.id} onClick={() => jump(c)} aria-label={`Scene ${i + 1}: ${c.title}`} aria-current={active === i ? "step" : undefined} className={`flex h-9 w-9 items-center justify-center text-[11px] tracking-widest transition-colors ${active === i ? "border border-beige text-beige" : "text-ivory/50"}`}>{pad(i + 1)}</button>
          ))}
        </nav>
        {overridden && <button onClick={() => setMotionOverride(false)} className="absolute bottom-12 right-5 hidden text-xs text-ivory/60 underline underline-offset-4 hover:text-ivory md:block md:right-10">Motion is on. Turn it off</button>}
        <div className="absolute inset-x-5 bottom-8 h-px bg-ivory/20 md:inset-x-10" role="progressbar" aria-label="Film progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(((active + 1) / CHAPTERS.length) * 100)}><motion.div style={{ scaleX: p }} className="h-full origin-left bg-beige" /></div>
      </div>
    </section>
  );
}

/** Reduced motion, Data Saver or 2G: the same six chapters, stacked, with no video downloaded. */
function StillFilm() {
  return (
    <section aria-label="A tour of a Skyline residence in six scenes" className="bg-matte text-ivory">
      {CHAPTERS.map((c, i) => {
        const l = layerOf(c);
        const note = l.kind === "video" ? "Still frame from the film. Video is off to respect your motion or data settings." : noteFor(c, {});
        return (
          <article key={c.id} className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 md:grid-cols-12 md:gap-12 md:py-16">
            <MaskReveal className={`relative aspect-[16/10] md:col-span-8 ${i % 2 ? "md:order-2" : ""}`}>
              <div className="absolute inset-0">{l.kind === "board" ? <div className="absolute inset-0 border border-ivory/10"><Board n={pad(i + 1)} /></div> : <Image src={c.still ?? l.still!} alt="" fill sizes="(min-width:768px) 66vw,100vw" className="object-cover" style={{ objectPosition: l.pos }} />}</div>
            </MaskReveal>
            <div className="md:col-span-4">
              <p className="mb-3 text-xs tracking-[.4em] text-beige">SCENE {pad(i + 1)}</p>
              <h3 className="font-serif text-3xl md:text-5xl">{c.title}</h3>
              <p className="mt-4 text-ivory/80">{c.body}</p>
              {note && <Note text={note} className="mt-5" />}
              {i === 0 && <button onClick={() => setMotionOverride(true)} className="mt-4 block border-b border-beige pb-1 text-sm text-beige transition hover:text-ivory">Play the film with motion</button>}
              {c.cta && (
                <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Link href={c.cta[0].href} className="bg-beige px-8 py-3 text-sm font-medium text-matte transition hover:bg-ivory">{c.cta[0].label}</Link>
                  {c.cta[1] && <Link href={c.cta[1].href} className="border-b border-ivory/50 pb-1 text-sm transition hover:border-beige hover:text-beige">{c.cta[1].label}</Link>}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default function ScrollVideo() {
  const mode = useMediaMode();
  const overridden = useMotionOverride();
  if (mode === "poster") return <StillFilm />;
  return <PinnedFilm mode={mode} overridden={overridden} />;
}
