import { motion } from "motion/react";
import { ArrowUpRight, Camera, Clapperboard, Heart } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Reveal, TiltCard, ease } from "@/components/motion-primitives";
import { BRAND } from "@/lib/data";

const FEED = [
  { src: "/img/pdf_04.webp", alt: "Pengantin di pelaminan emas", kind: "Foto" },
  { src: "/img/pdf_17.webp", alt: "Sinematik air terjun", kind: "Reels" },
  { src: "/img/pdf_12.webp", alt: "Momen mesra prewedding", kind: "Foto" },
  { src: "/img/pdf_23.webp", alt: "Foto bersama di wedding stage", kind: "Foto" },
  { src: "/img/pdf_07.webp", alt: "Pengantin berjalan selepas prosesi", kind: "Reels" },
  { src: "/img/pdf_27.webp", alt: "Beauty session di taman", kind: "Foto" },
];

const STATS = [
  { icon: Camera, label: "Wedding & Prewedding Photo" },
  { icon: Clapperboard, label: "Cinematic Video & Reels" },
  { icon: Heart, label: "Padang · Sumatera Barat" },
];

export default function InstagramSection() {
  return (
    <section id="instagram" data-testid="instagram-section" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <a
                data-testid="instagram-handle"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-gold transition-colors hover:bg-gold hover:text-[#0B0C0E]"
              >
                <SiInstagram size={15} />
                <span className="font-mono text-[11px] uppercase tracking-[0.25em]">{BRAND.instagram}</span>
              </a>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-heading text-4xl font-medium leading-[1.12] tracking-tight text-stone-100 sm:text-5xl">
                Ikuti cerita kami <span className="italic text-gold">di Instagram</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-base leading-relaxed text-stone-400 md:text-lg">
                Foto terbaru, reels sinematik, dan behind-the-scenes setiap pekan. Lihat langsung
                gaya visual kami sebelum memutuskan.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <ul className="mt-8 space-y-3">
                {STATS.map((s) => (
                  <li key={s.label} className="flex items-center gap-3 text-sm text-stone-300">
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-gold/25 bg-gold/10 text-gold">
                      <s.icon size={14} />
                    </span>
                    {s.label}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                data-testid="instagram-follow-cta"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.04]"
              >
                Buka Instagram
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div data-testid="instagram-feed" className="grid grid-cols-3 gap-3 sm:gap-4">
              {FEED.map((f, i) => (
                <motion.div
                  key={f.src}
                  initial={{ opacity: 0, y: 30, rotateX: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                  style={{ perspective: 800 }}
                  className={i === 1 || i === 4 ? "-translate-y-4 sm:-translate-y-6" : ""}
                >
                  <TiltCard className="rounded-2xl">
                    <a
                      data-testid={`instagram-feed-${i}`}
                      href={BRAND.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${f.alt} — buka di Instagram`}
                      className="group relative block aspect-square overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-gold/50"
                    >
                      <img
                        src={f.src}
                        alt={f.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-stone-200 backdrop-blur">
                        {f.kind}
                      </span>
                      <SiInstagram
                        size={18}
                        className="absolute bottom-3 right-3 text-gold opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
