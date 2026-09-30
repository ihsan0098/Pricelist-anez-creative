import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, Clock, Clapperboard, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, ease } from "@/components/motion-primitives";
import { terms, type TermGroup } from "@/lib/data";

const ICONS: Record<string, typeof CalendarCheck> = {
  booking: CalendarCheck,
  "day-moment": Clock,
  "post-production": Clapperboard,
};

function TermAccordion({ group, defaultOpen }: { group: TermGroup; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const Icon = ICONS[group.id] ?? CalendarCheck;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-card transition-colors duration-300 hover:border-gold/30">
      <button
        data-testid={`terms-trigger-${group.id}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
      >
        <span className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <Icon size={18} />
          </span>
          <span className="font-heading text-xl font-medium text-stone-100 sm:text-2xl">{group.title}</span>
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <ul data-testid={`terms-content-${group.id}`} className="space-y-3.5 px-7 pb-7 pl-[4.5rem]">
              {group.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-stone-400">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TermsSection() {
  return (
    <section id="terms" data-testid="terms-section" className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          align="center"
          overline="Term & Condition"
          title={
            <>
              Transparan sejak <span className="italic text-gold">langkah pertama</span>
            </>
          }
          description="Dengan melakukan booking, klien menyetujui seluruh ketentuan yang berlaku berikut ini."
        />
        <div className="mt-14 space-y-5">
          {terms.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.1}>
              <TermAccordion group={group} defaultOpen={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
