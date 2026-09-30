import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Reveal } from "@/components/motion-primitives";
import { LogoMark } from "@/components/Navbar";
import { BRAND, waLink } from "@/lib/data";

const CONTACTS = [
  {
    id: "wa",
    icon: Phone,
    label: "WhatsApp / Telepon",
    value: BRAND.phone,
    href: waLink("Halo Anez Creative! Saya ingin konsultasi tanggal & paket dokumentasi pernikahan."),
  },
  {
    id: "email",
    icon: Mail,
    label: "Email",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
  },
  {
    id: "instagram",
    icon: SiInstagram,
    label: "Instagram",
    value: BRAND.instagram,
    href: BRAND.instagramUrl,
  },
  {
    id: "location",
    icon: MapPin,
    label: "Lokasi",
    value: BRAND.location,
    href: "https://maps.google.com/?q=Padang,+Sumatera+Barat",
  },
];

export default function Footer() {
  return (
    <footer id="kontak" data-testid="footer" className="relative overflow-hidden border-t border-gold/15 bg-[#0A0908]">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-gold/90">
            Dear Client
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mx-auto mt-5 max-w-3xl text-center font-heading text-4xl font-medium leading-[1.15] tracking-tight text-stone-100 sm:text-5xl">
            Hari bahagia Anda layak diabadikan <span className="italic text-gold">dengan sempurna.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex justify-center">
            <a
              data-testid="footer-wa-cta"
              href={waLink("Halo Anez Creative! Saya ingin booking dokumentasi pernikahan. Mohon info ketersediaan tanggal.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.05]"
            >
              <MessageCircle size={17} />
              Konsultasi & Booking Sekarang
            </a>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <a
                data-testid={`footer-contact-${c.id}`}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-card/60 p-5 transition-colors duration-300 hover:border-gold/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                  <c.icon size={16} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-stone-200">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 border-t border-white/10 pt-10">
          <div className="flex items-center gap-3">
            <LogoMark size={64} />
          </div>
          <p className="text-center font-heading text-lg italic text-gold/90">
            “Capturing sacred moments with soul.”
          </p>
          <p className="text-center font-heading text-sm italic text-stone-500">
            {BRAND.tagline} — {BRAND.location}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-stone-600">
            © 2026 Anez Creative. All moments reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
