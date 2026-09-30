import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, MessageCircle, MapPin, CalendarDays } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { BRAND, waLink } from "@/lib/data";
import { scrollToId } from "@/lib/scroll";
import { MaskedLine, TiltCard, ease } from "@/components/motion-primitives";

function GoldDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    const parts = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.00055 + 0.00018,
      vx: (Math.random() - 0.5) * 0.0003,
      tw: Math.random() * Math.PI * 2,
    }));
    const tick = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of parts) {
        p.y -= p.vy;
        p.x += p.vx;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        const a = 0.22 + 0.32 * Math.abs(Math.sin(t / 900 + p.tw));
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="beranda" data-testid="hero-section" className="grain relative isolate flex min-h-screen items-center overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src="/img/pdf_18.webp"
          alt="Pasangan pengantin di pelaminan adat Minangkabau - karya Anez Creative"
          className="h-[120%] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,14,0.35)_0%,rgba(11,12,14,0.66)_62%,#0B0C0E_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_40%,transparent_0%,rgba(11,12,14,0.5)_100%)]" />
      </motion.div>
      <GoldDust />

      <motion.div style={{ opacity: fade }} className="mx-auto grid w-full max-w-7xl gap-14 px-5 pb-28 pt-36 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-40">
        <div className="lg:col-span-7">
          <MaskedLine delay={0.15}>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-gold backdrop-blur">
              <MapPin size={12} />
              {BRAND.location}
            </span>
          </MaskedLine>

          <h1 className="mt-7 font-heading text-[12.5vw] font-medium leading-[1.02] tracking-tight text-stone-100 sm:text-6xl lg:text-7xl">
            <MaskedLine delay={0.3}>Capturing sacred</MaskedLine>
            <MaskedLine delay={0.45}>moments</MaskedLine>
            <MaskedLine delay={0.6}>
              <span className="text-gold-gradient italic">with soul.</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-7 max-w-xl text-base leading-relaxed text-stone-300 md:text-lg"
          >
            Foto & video pernikahan dari Padang, Sumatera Barat. Setiap prosesi adat dan
            momen sakral kami abadikan dengan jiwa — untuk dikenang hari ini, dan
            diwariskan kepada generasi berikutnya.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-pricelist-cta"
              onClick={() => scrollToId("#paket")}
              className="group flex items-center gap-3 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.04]"
            >
              Lihat Pricelist
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-form-cta"
              onClick={() => scrollToId("#booking")}
              className="flex items-center gap-3 rounded-full border border-gold/60 px-7 py-3.5 text-sm font-semibold text-gold backdrop-blur transition-colors duration-300 hover:bg-gold/10"
            >
              <CalendarDays size={16} />
              Cek Tanggal Acara
            </button>
            <a
              data-testid="hero-booking-cta"
              href={waLink("Halo Anez Creative! Saya ingin konsultasi tanggal & paket dokumentasi pernikahan.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-stone-500/60 px-7 py-3.5 text-sm font-semibold text-stone-200 backdrop-blur transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </motion.div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -12 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1.3, delay: 0.7, ease }}
          >
            <TiltCard className="gold-ring relative mx-auto w-full max-w-sm rounded-3xl">
              <div className="overflow-hidden rounded-3xl border border-gold/25 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]">
                <img
                  src="/img/pdf_01.webp"
                  alt="Pengantin dengan busana adat Minangkabau - portofolio Anez Creative"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <a
                data-testid="hero-metadata-pill"
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="animate-floaty absolute -bottom-6 -left-8 flex items-center gap-3 rounded-2xl border border-gold/30 bg-[#141518]/90 px-5 py-3.5 backdrop-blur-xl transition-colors hover:border-gold"
                style={{ transform: "translateZ(50px)" }}
              >
                <SiInstagram size={18} className="text-gold" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-gold">{BRAND.instagram}</span>
                  <span className="mt-1 block font-heading text-sm italic text-stone-200">Capturing sacred moments with soul</span>
                </span>
              </a>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-stone-500">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-stone-600 pt-1.5">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      </motion.div>
    </section>
  );
}
