import { Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, TiltCard } from "@/components/motion-primitives";
import { TESTIMONIALS } from "@/lib/gallery";

export default function Testimonials() {
  return (
    <section id="testimoni" data-testid="testimonials-section" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          overline="Kata Mereka"
          title={
            <>
              Kepercayaan yang <span className="italic text-gold">kami jaga</span>
            </>
          }
          description="Setiap pasangan punya cerita — dan kami bersyukur menjadi bagian di dalamnya."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.12} className="h-full">
              <TiltCard
                className={`flex h-full flex-col rounded-3xl border border-white/10 bg-card p-8 ${
                  i === 1 ? "gold-ring border-gold/30 bg-[#1A1713]" : ""
                }`}
              >
                <div style={{ transform: "translateZ(25px)" }} className="flex h-full flex-col" data-testid={`testimonial-card-${t.id}`}>
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Quote size={16} />
                    </span>
                    <span className="flex gap-1 text-gold">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} size={13} fill="currentColor" strokeWidth={0} />
                      ))}
                    </span>
                  </div>
                  <p className="mt-6 flex-1 font-heading text-lg italic leading-relaxed text-stone-200">
                    “{t.quote}”
                  </p>
                  <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                    <img
                      src={t.img}
                      alt={`Pernikahan ${t.names}`}
                      className="h-12 w-12 rounded-full border border-gold/40 object-cover"
                    />
                    <div>
                      <p className="font-heading text-base font-medium text-stone-100">{t.names}</p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">{t.event}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
