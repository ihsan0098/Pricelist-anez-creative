import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { ease } from "@/components/motion-primitives";
import { GALLERY, GALLERY_FILTERS, type GalleryPhoto } from "@/lib/gallery";

type FilterId = (typeof GALLERY_FILTERS)[number]["id"];

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      data-testid="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-label={`Foto: ${photo.alt}`}
    >
      <button
        data-testid="lightbox-close"
        onClick={onClose}
        aria-label="Tutup galeri"
        className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-stone-200 transition-colors hover:border-gold hover:text-gold"
      >
        <X size={19} />
      </button>
      <button
        data-testid="lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        aria-label="Foto sebelumnya"
        className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-stone-200 transition-colors hover:border-gold hover:text-gold sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        data-testid="lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        aria-label="Foto berikutnya"
        className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 text-stone-200 transition-colors hover:border-gold hover:text-gold sm:right-6"
      >
        <ChevronRight size={20} />
      </button>

      <motion.figure
        key={photo.src}
        initial={{ opacity: 0, scale: 0.94, rotateY: 6 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-h-[86vh] max-w-[88vw]"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: 1000 }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[78vh] w-auto max-w-full rounded-xl border border-gold/20 object-contain shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9)]"
        />
        <figcaption className="mt-4 flex items-center justify-between gap-4">
          <span className="font-heading text-sm italic text-stone-300">{photo.alt}</span>
          <span data-testid="lightbox-counter" className="font-mono text-[11px] tracking-[0.25em] text-gold">
            {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}

function FilterBar({ active, onChange }: { active: FilterId; onChange: (id: FilterId) => void }) {
  const counts = useMemo(() => {
    const c: Record<string, number> = { Semua: GALLERY.length };
    for (const p of GALLERY) c[p.group] = (c[p.group] ?? 0) + 1;
    return c;
  }, []);

  return (
    <LayoutGroup id="gallery-filter">
      <div
        data-testid="gallery-filters"
        role="tablist"
        aria-label="Filter kategori galeri"
        className="mt-12 flex flex-wrap gap-2.5 rounded-full border border-white/10 bg-card/70 p-1.5 backdrop-blur sm:inline-flex"
      >
        {GALLERY_FILTERS.map((f) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              data-testid={`gallery-filter-${f.id.toLowerCase()}`}
              onClick={() => onChange(f.id)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-[#0B0C0E]" : "text-stone-300 hover:text-gold"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="gallery-filter-pill"
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0 rounded-full bg-gold"
                />
              )}
              <span className="relative">{f.label}</span>
              <span
                className={`relative font-mono text-[10px] tracking-wider ${
                  isActive ? "text-[#0B0C0E]/70" : "text-gold/70"
                }`}
              >
                {String(counts[f.id] ?? 0).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>
    </LayoutGroup>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<FilterId>("Semua");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const photos = useMemo(
    () => (filter === "Semua" ? GALLERY : GALLERY.filter((p) => p.group === filter)),
    [filter]
  );

  const nav = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  return (
    <section id="galeri" data-testid="gallery-section" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            overline="Portofolio"
            title={
              <>
                Jejak visual dari <span className="italic text-gold">hari-hari bahagia</span>
              </>
            }
            description="Kumpulan karya asli Anez Creative — pilih kategori, lalu klik foto mana pun untuk melihatnya layar penuh."
          />
          <p
            data-testid="gallery-result-count"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 lg:pb-2"
          >
            Menampilkan {String(photos.length).padStart(2, "0")} foto
          </p>
        </div>

        <FilterBar
          active={filter}
          onChange={(id) => {
            setFilter(id);
            setOpenIndex(null);
          }}
        />

        <motion.div
          layout
          data-testid="gallery-grid"
          className="mt-10 columns-2 gap-4 md:columns-3 xl:columns-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {photos.map((photo, i) => (
              <motion.div
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease, delay: (i % 4) * 0.04 }}
                className="mb-4 break-inside-avoid"
              >
                <button
                  data-testid={`gallery-item-${i}`}
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Perbesar foto: ${photo.alt}`}
                  className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-gold/50"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {photo.cat}
                  </span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onNav={nav} />
        )}
      </AnimatePresence>
    </section>
  );
}
