const ITEMS = [
  "Wedding Photography",
  "Cinematic Film",
  "Prewedding Session",
  "Drone Aerial",
  "Same Day Edit",
  "Album & Cetak Premium",
  "Raw Moment",
  "Wedding Stage",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      data-testid="marquee-strip"
      className="relative overflow-hidden border-y border-gold/15 bg-[#100F0C] py-6"
    >
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap px-8 font-heading text-2xl italic text-stone-300/90 sm:text-3xl">
              {item}
            </span>
            <span className="text-lg text-gold">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#100F0C] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#100F0C] to-transparent" />
    </div>
  );
}
