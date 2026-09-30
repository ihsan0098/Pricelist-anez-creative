import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { BRAND, waLink } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { ease } from "@/components/motion-primitives";

const LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Paket", href: "#paket" },
  { label: "Cinema", href: "#cinema" },
  { label: "Kalkulator", href: "#kalkulator" },
  { label: "Galeri", href: "#galeri" },
  { label: "Booking", href: "#booking" },
  { label: "Kontak", href: "#kontak" },
];

export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <img
      src="/img/logo.png"
      alt="Anez Creative"
      style={{ height: size }}
      className="w-auto object-contain"
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-gold/15 bg-black/75 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <button
          data-testid="nav-logo"
          onClick={() => go("#beranda")}
          className="flex items-center gap-3"
          aria-label="Anez Creative - kembali ke atas"
        >
          <LogoMark size={38} />
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.href.slice(1)}`}
              onClick={() => go(l.href)}
              className="group relative text-[13px] font-medium tracking-wide text-stone-300 transition-colors hover:text-gold"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
          <a
            data-testid="nav-instagram"
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Anez Creative"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-stone-300 transition-colors hover:border-gold hover:text-gold"
          >
            <SiInstagram size={14} />
          </a>
          <a
            data-testid="nav-wa-cta"
            href={waLink("Halo Anez Creative! Saya ingin konsultasi tanggal & paket dokumentasi pernikahan.")}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.04]"
          >
            <MessageCircle size={15} />
            Chat WA
          </a>
        </nav>

        <button
          data-testid="nav-menu-button"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-stone-200 lg:hidden"
          aria-label="Buka menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden border-b border-gold/15 bg-black/90 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-${l.href.slice(1)}`}
                  onClick={() => go(l.href)}
                  className="rounded-lg px-3 py-3 text-left font-heading text-lg text-stone-200 transition-colors hover:bg-white/5 hover:text-gold"
                >
                  {l.label}
                </button>
              ))}
              <a
                data-testid="nav-mobile-wa-cta"
                href={waLink("Halo Anez Creative! Saya ingin konsultasi tanggal & paket dokumentasi pernikahan.")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-[#0B0C0E]"
              >
                <MessageCircle size={16} />
                Booking via WhatsApp
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
