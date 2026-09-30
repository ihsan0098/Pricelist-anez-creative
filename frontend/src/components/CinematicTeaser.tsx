import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const FRAMES = [
  { src: "/img/pdf_04.webp", alt: "Pengantin di pelaminan emas" },
  { src: "/img/pdf_07.webp", alt: "Pengantin berjalan selepas prosesi" },
  { src: "/img/pdf_09.webp", alt: "Pasangan di depan Rumah Gadang" },
  { src: "/img/pdf_17.webp", alt: "Sesi sinematik di air terjun" },
  { src: "/img/pdf_15.webp", alt: "Momen prewedding penuh tawa" },
];

export default function CinematicTeaser() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % FRAMES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div data-testid="cinematic-teaser" className="mx-auto max-w-5xl">
      <div className="gold-ring relative overflow-hidden rounded-3xl border border-gold/25 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.85)]">
        <div className="relative aspect-video bg-black">
          <AnimatePresence>
            <motion.img
              key={idx}
              src={FRAMES[idx].src}
              alt={FRAMES[idx].alt}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.1 },
                scale: { duration: 4.6, ease: "linear" },
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[7%] bg-black" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_50%,transparent_55%,rgba(0,0,0,0.45)_100%)]" />
          <div className="absolute bottom-[10%] left-6 sm:left-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
              Anez Creative
            </p>
            <p className="mt-1 font-heading text-lg italic text-stone-100 sm:text-xl">
              Wedding Cinema — montase portofolio asli
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2.5">
        {FRAMES.map((f, i) => (
          <button
            key={f.src}
            data-testid={`teaser-dot-${i}`}
            onClick={() => setIdx(i)}
            aria-label={`Tampilkan cuplikan ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === idx ? "w-8 bg-gold" : "w-1.5 bg-stone-600 hover:bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
