import { MessageCircle, Camera } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion-primitives";
import { preweddingItems, waLink, bookMsg } from "@/lib/data";

export default function PreweddingSection() {
  return (
    <section id="prewedding" data-testid="prewedding-section" className="py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="relative order-2 lg:order-1 lg:col-span-6">
          <Reveal className="relative z-10 w-[72%]">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/img/pdf_03.webp"
                alt="Sesi prewedding outdoor - Anez Creative"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.18} className="absolute -bottom-12 right-0 z-20 w-[52%]">
            <div className="gold-ring overflow-hidden rounded-2xl border border-gold/25 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <img
                src="/img/pdf_05.webp"
                alt="Momen prewedding di taman - Anez Creative"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.28} className="absolute -top-10 right-6 z-0 w-[38%] opacity-90">
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/img/pdf_11.webp"
                alt="Prewedding bernuansa alam - Anez Creative"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <SectionHeading
            overline="Prewedding Session"
            title={
              <>
                Cerita dimulai <span className="italic text-gold">sebelum hari H</span>
              </>
            }
            description="Paket foto dan video cinematic untuk prewedding, postwedding, family, dan maternity. Rate belum termasuk biaya perjalanan dan akomodasi tambahan untuk tim."
          />

          <div className="mt-10 space-y-4">
            {preweddingItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  data-testid={`prewedding-card-${item.id}`}
                  className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-card p-6 transition-colors duration-300 hover:border-gold/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Camera size={17} />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-medium text-stone-100">{item.name}</h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-stone-400">{item.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p data-testid={`prewedding-price-${item.id}`} className="font-heading text-2xl font-semibold text-gold-gradient">
                      {item.price}
                    </p>
                    <a
                      data-testid={`prewedding-wa-${item.id}`}
                      href={waLink(bookMsg(item.name, item.price))}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Booking ${item.name} via WhatsApp`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-gold text-[#0B0C0E] transition-transform duration-300 hover:scale-110"
                    >
                      <MessageCircle size={17} />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-stone-500">
              *Harga dapat berubah setiap saat
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
