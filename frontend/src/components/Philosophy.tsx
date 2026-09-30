import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion-primitives";
import { philosophy } from "@/lib/data";

export default function Philosophy() {
  return (
    <section id="dokumentasi" data-testid="philosophy-section" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          overline="Rangkaian Dokumentasi Pernikahan"
          title={
            <>
              Tiga babak dalam <span className="italic text-gold">satu hari bahagia</span>
            </>
          }
          description="Rangkaian prosesi pernikahan berbeda di setiap daerah dan memiliki nilai sakral tersendiri. Kami membaginya menjadi tiga bagian: dokumentasi momen, beauty session, dan wedding stage."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {philosophy.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.12}>
              <article
                data-testid={`philosophy-card-${item.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={`${item.title} - Anez Creative`}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(11,12,14,0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    0{i + 1}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-medium italic text-stone-100">{item.title}</h3>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-stone-300 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-48 group-hover:opacity-100 md:max-h-48 md:opacity-100">
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
