import { useMemo, useState } from "react";
import { Check, MessageCircle, RotateCcw } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/motion-primitives";
import { CALC_GROUPS, formatIDR, type CalcOption } from "@/lib/calculator";
import { waLink } from "@/lib/data";

type Selection = Record<string, string[]>;

function buildMessage(selected: { option: CalcOption; group: string }[], total: number) {
  const lines = selected.map((s) => `- ${s.option.label} (${formatIDR(s.option.price)})`);
  return [
    "Halo Anez Creative! Saya sudah merakit estimasi paket di website:",
    "",
    ...lines,
    "",
    `Estimasi Total: ${formatIDR(total)}`,
    "",
    "Apakah tanggal acara saya masih tersedia?",
  ].join("\n");
}

export default function Calculator() {
  const [selection, setSelection] = useState<Selection>({});

  const toggle = (groupId: string, multi: boolean, optId: string) => {
    setSelection((prev) => {
      const current = prev[groupId] ?? [];
      if (!multi) {
        return { ...prev, [groupId]: current.includes(optId) ? [] : [optId] };
      }
      return {
        ...prev,
        [groupId]: current.includes(optId)
          ? current.filter((id) => id !== optId)
          : [...current, optId],
      };
    });
  };

  const selected = useMemo(() => {
    const out: { option: CalcOption; group: string }[] = [];
    for (const group of CALC_GROUPS) {
      for (const id of selection[group.id] ?? []) {
        const option = group.options.find((o) => o.id === id);
        if (option) out.push({ option, group: group.title });
      }
    }
    return out;
  }, [selection]);

  const total = selected.reduce((sum, s) => sum + s.option.price, 0);
  const isEmpty = selected.length === 0;

  return (
    <section id="kalkulator" data-testid="calculator-section" className="relative py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-24 h-72 w-72 rounded-full bg-gold/8 blur-[110px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          overline="Kalkulator Paket"
          title={
            <>
              Rakit paket impian, <span className="italic text-gold">lihat estimasinya</span>
            </>
          }
          description="Pilih paket dan layanan tambahan sesuai kebutuhan — total estimasi langsung terhitung dan bisa dikirim ke WhatsApp kami."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            {CALC_GROUPS.map((group, gi) => (
              <Reveal key={group.id} delay={gi * 0.06}>
                <div data-testid={`calc-group-${group.id}`}>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-2xl font-medium text-stone-100">{group.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                      {group.hint}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {group.options.map((opt) => {
                      const active = (selection[group.id] ?? []).includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          data-testid={`calc-opt-${opt.id}`}
                          onClick={() => toggle(group.id, group.multi, opt.id)}
                          aria-pressed={active}
                          className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                            active
                              ? "border-gold bg-gold text-[#0B0C0E]"
                              : "border-white/15 bg-card text-stone-300 hover:border-gold/50 hover:text-gold"
                          }`}
                        >
                          {active && <Check size={14} />}
                          {opt.label}
                          <span className={active ? "text-[#0B0C0E]/70" : "text-gold/80"}>
                            {formatIDR(opt.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <div className="gold-ring sticky top-24 rounded-3xl border border-gold/30 bg-[#1A1713] p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold/90">
                  Estimasi Anda
                </p>
                <div data-testid="calc-selected-list" className="mt-6 min-h-[7rem] space-y-3">
                  {isEmpty ? (
                    <p className="text-sm italic leading-relaxed text-stone-500">
                      Belum ada item dipilih — mulai dengan memilih paket wedding atau layanan di samping.
                    </p>
                  ) : (
                    selected.map((s) => (
                      <div key={s.option.id} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-stone-300">
                          {s.option.label}
                          <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500">
                            {s.group}
                          </span>
                        </span>
                        <span className="whitespace-nowrap text-stone-200">{formatIDR(s.option.price)}</span>
                      </div>
                    ))
                  )}
                </div>
                <div className="my-6 h-px bg-gradient-to-r from-gold/50 via-white/10 to-transparent" />
                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-400">Total</span>
                  <span data-testid="calc-total" className="font-heading text-4xl font-semibold tracking-tight text-gold-gradient">
                    {formatIDR(total)}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-stone-500">
                  *Estimasi kasar. Belum termasuk transportasi & akomodasi luar kota. Harga dapat berubah setiap saat.
                </p>
                <a
                  data-testid="calc-wa-button"
                  href={isEmpty ? undefined : waLink(buildMessage(selected, total))}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={isEmpty}
                  onClick={(e) => isEmpty && e.preventDefault()}
                  className={`mt-7 flex items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold transition-all duration-300 ${
                    isEmpty
                      ? "cursor-not-allowed bg-white/10 text-stone-500"
                      : "bg-gold text-[#0B0C0E] hover:scale-[1.03]"
                  }`}
                >
                  <MessageCircle size={16} />
                  Kirim Estimasi ke WhatsApp
                </a>
                <button
                  data-testid="calc-reset"
                  onClick={() => setSelection({})}
                  disabled={isEmpty}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-medium text-stone-500 transition-colors hover:text-gold disabled:opacity-40"
                >
                  <RotateCcw size={13} />
                  Reset Pilihan
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
