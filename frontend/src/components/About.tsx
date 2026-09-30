import { Reveal } from "@/components/motion-primitives";

export default function About() {
  return (
    <section id="tentang" data-testid="about-section" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/90">Salam Perkenalan</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-heading text-4xl font-medium leading-[1.12] tracking-tight text-stone-100 sm:text-5xl">
              Kenangan berharga layak <span className="italic text-gold">diwariskan</span>, bukan dilupakan.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-stone-400">
              <p>
                Begitu berharga setiap momen yang terjadi di hidup kita. Dari sekian banyak waktu yang
                terlewati, hanya ada beberapa kenangan yang bisa kita simpan dalam ingatan — sebagian
                mungkin terlupakan, termakan waktu dan usia.
              </p>
              <p>
                Agar kenangan itu tidak hilang dan bisa diwariskan kepada generasi berikutnya, diperlukan
                sebuah dokumentasi visual yang mampu mengingatkan kita tentang hari bahagia yang pernah
                kita lewati. Untuk itu kami hadir — merangkainya lewat susunan visual yang bermakna dan
                menyentuh hati.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <blockquote className="mt-9 border-l-2 border-gold pl-6">
              <p className="font-heading text-lg italic leading-relaxed text-stone-300">
                "A great marriage is not when the 'perfect couple' comes together. It is when an
                imperfect couple learns to enjoy their differences."
              </p>
              <cite className="mt-3 block font-mono text-xs uppercase tracking-[0.2em] text-gold/80 not-italic">
                — Dave Meurer
              </cite>
            </blockquote>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <Reveal delay={0.15} className="relative ml-auto w-[86%]">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <img
                src="/img/pdf_26.webp"
                alt="Pasangan pengantin di depan Rumah Gadang - Anez Creative"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </div>
          </Reveal>
          <Reveal delay={0.3} className="absolute -bottom-10 left-0 w-[46%]">
            <div className="gold-ring overflow-hidden rounded-2xl border border-gold/25 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
              <img
                src="/img/pdf_06.webp"
                alt="Momen akad pengantin adat - Anez Creative"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
