import { Check, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, TiltCard } from "@/components/motion-primitives";
import { weddingPackages, waLink, bookMsg, type WeddingPackage } from "@/lib/data";

function PackageCard({ pkg, index }: { pkg: WeddingPackage; index: number }) {
  return (
    <Reveal delay={index * 0.12} className="h-full">
      <TiltCard
        className={`relative flex h-full flex-col rounded-3xl p-8 ${
          pkg.featured
            ? "gold-ring border border-gold/40 bg-[#1A1713]"
            : "border border-white/10 bg-card"
        }`}
      >
        {pkg.badge && (
          <span
            data-testid={`package-badge-${pkg.id}`}
            className="absolute -top-3.5 left-8 rounded-full bg-gold px-4 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B0C0E]"
          >
            {pkg.badge}
          </span>
        )}
        <div style={{ transform: "translateZ(30px)" }} className="flex h-full flex-col">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-stone-400">{pkg.tier}</p>
          <h3 className="mt-2 font-heading text-3xl font-medium text-stone-100">{pkg.name}</h3>
          <p
            data-testid={`package-price-${pkg.id}`}
            className="mt-5 font-heading text-4xl font-semibold tracking-tight text-gold-gradient"
          >
            {pkg.price}
          </p>
          <div className="my-7 h-px bg-gradient-to-r from-gold/50 via-white/10 to-transparent" />
          <ul className="flex-1 space-y-3.5">
            {pkg.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-stone-300">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                {item}
              </li>
            ))}
          </ul>
          <a
            data-testid={`package-wa-${pkg.id}`}
            href={waLink(bookMsg(pkg.name, pkg.price))}
            target="_blank"
            rel="noreferrer"
            className={`mt-8 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03] ${
              pkg.featured
                ? "bg-gold text-[#0B0C0E]"
                : "border border-gold/50 text-gold hover:bg-gold/10"
            }`}
          >
            <MessageCircle size={16} />
            Booking Paket Ini
          </a>
        </div>
      </TiltCard>
    </Reveal>
  );
}

export default function WeddingPackages() {
  return (
    <section id="paket" data-testid="wedding-packages-section" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          overline="Wedding Package"
          title={
            <>
              Investasi untuk <span className="italic text-gold">sehari yang tak terulang</span>
            </>
          }
          description="Estimasi biaya belum mencakup transportasi & akomodasi di luar kota. Harga dapat berubah setiap saat."
        />
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {weddingPackages.map((pkg, i) => (
            <div key={pkg.id} data-testid={`package-card-${pkg.id}`}>
              <PackageCard pkg={pkg} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
