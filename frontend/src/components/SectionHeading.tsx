import { Reveal } from "@/components/motion-primitives";

export function SectionHeading({
  overline,
  title,
  description,
  align = "left",
}: {
  overline: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/90">{overline}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 font-heading text-4xl font-medium leading-[1.12] tracking-tight text-stone-100 sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-stone-400 md:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
