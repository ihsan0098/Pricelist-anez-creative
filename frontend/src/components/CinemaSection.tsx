import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Clapperboard, Film, Video, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion-primitives";
import { cinemaItems, waLink, bookMsg } from "@/lib/data";

const ICONS = [Clapperboard, Film, Video];

export default function CinemaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} id="cinema" data-testid="cinema-section" className="relative overflow-hidden py-28 sm:py-36">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src="/img/pdf_17.webp"
          alt="Sesi sinematik pasangan di air terjun - Anez Creative"
          className="h-[124%] w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0B0C0E]/88" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          overline="Wedding Cinema"
          title={
            <>
              Bukan sekadar rekaman — <span className="italic text-gold">ini storytelling</span>
            </>
          }
          description="Abadikan setiap getaran emosi hari bahagia Anda melalui lensa sinematik kami. Setiap potongan klip diambil secara natural (candid) untuk menjaga kemurnian emosi, dirangkai menjadi mahakarya visual yang tak lekang oleh waktu."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cinemaItems.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={item.id} delay={i * 0.12} className="h-full">
                <article
                  data-testid={`cinema-card-${item.id}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#141518]/85 p-8 backdrop-blur transition-colors duration-300 hover:border-gold/40"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-medium text-stone-100">{item.name}</h3>
                  <p data-testid={`cinema-price-${item.id}`} className="mt-3 font-heading text-3xl font-semibold text-gold-gradient">
                    {item.price}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">{item.detail}</p>
                  <a
                    data-testid={`cinema-wa-${item.id}`}
                    href={waLink(bookMsg(item.name, item.price))}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 flex items-center justify-center gap-2 rounded-full border border-gold/50 py-3 text-sm font-semibold text-gold transition-colors duration-300 hover:bg-gold hover:text-[#0B0C0E]"
                  >
                    <MessageCircle size={15} />
                    Booking via WhatsApp
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
