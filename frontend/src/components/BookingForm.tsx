import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, ease } from "@/components/motion-primitives";
import { ApiError } from "@/lib/api";
import { waLink } from "@/lib/data";
import {
  EVENT_TYPES,
  PACKAGE_OPTIONS,
  bookingWaMessage,
  createBooking,
  formatDateID,
  type BookingInput,
  type EventType,
} from "@/lib/bookings";

const fieldCls =
  "w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-600 focus:border-gold/70 focus:ring-2 focus:ring-gold/20 [color-scheme:dark]";
const labelCls = "mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400";

const EMPTY: BookingInput = {
  name: "",
  whatsapp: "",
  event_type: "Wedding",
  event_date: "",
  package: PACKAGE_OPTIONS[0],
  location: "",
  notes: "",
};

const today = new Date().toISOString().slice(0, 10);

const PERKS = [
  "Tanggal langsung kami cek & kami hubungi maksimal 24 jam",
  "Booking terkunci setelah DP 20% dari paket yang dipilih",
  "Konsultasi konsep, lokasi, dan rundown gratis",
];

export default function BookingForm() {
  const [form, setForm] = useState<BookingInput>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<BookingInput | null>(null);

  const set = (key: keyof BookingInput) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const saved = await createBooking({
        ...form,
        package: form.package || undefined,
        location: form.location?.trim() || undefined,
        notes: form.notes?.trim() || undefined,
      });
      setSent(saved);
      setForm(EMPTY);
      toast.success("Permintaan booking tersimpan. Kami akan segera menghubungi Anda!");
    } catch (err) {
      const msg =
        err instanceof ApiError && err.status === 422
          ? "Periksa kembali data Anda — pastikan nomor WhatsApp & tanggal valid."
          : "Gagal mengirim. Coba lagi atau hubungi kami via WhatsApp.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" data-testid="booking-section" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-gold/8 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              overline="Form Booking"
              title={
                <>
                  Amankan tanggal <span className="italic text-gold">hari bahagia Anda</span>
                </>
              }
              description="Isi tanggal acara & data singkat. Permintaan Anda tersimpan rapi di sistem kami — tidak ada calon klien yang terlewat."
            />

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-4">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-stone-300">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3} className="mt-12 hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-gold/20">
                <img
                  src="/img/pdf_06.webp"
                  alt="Prosesi akad penuh khidmat — Anez Creative"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <p className="absolute bottom-5 left-6 font-heading text-lg italic text-stone-100">
                  “Capturing sacred moments with soul.”
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="gold-ring rounded-3xl border border-gold/30 bg-[#1A1713] p-6 sm:p-10">
                <AnimatePresence mode="wait" initial={false}>
                  {sent ? (
                    <motion.div
                      key="success"
                      data-testid="booking-success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease }}
                      className="flex flex-col items-center py-8 text-center"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                        <CheckCircle2 size={30} />
                      </span>
                      <h3 className="mt-6 font-heading text-3xl font-medium text-stone-100">
                        Terima kasih, {sent.name.split(" ")[0]}!
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-400">
                        Permintaan booking untuk{" "}
                        <span className="text-gold">{formatDateID(sent.event_date)}</span> sudah tersimpan.
                        Percepat konfirmasi dengan mengirim ringkasannya ke WhatsApp kami.
                      </p>
                      <a
                        data-testid="booking-wa-button"
                        href={waLink(bookingWaMessage(sent))}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.04]"
                      >
                        <MessageCircle size={16} />
                        Kirim Ringkasan ke WhatsApp
                      </a>
                      <button
                        data-testid="booking-again"
                        onClick={() => setSent(null)}
                        className="mt-4 text-xs font-medium text-stone-500 transition-colors hover:text-gold"
                      >
                        Isi form untuk tanggal lain
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      data-testid="booking-form"
                      onSubmit={submit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="grid gap-5 sm:grid-cols-2"
                    >
                      <div className="sm:col-span-2 flex items-center gap-3">
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                          <CalendarDays size={17} />
                        </span>
                        <div>
                          <p className="font-heading text-xl font-medium text-stone-100">Cek Ketersediaan Tanggal</p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
                            Tanpa biaya · Respons cepat
                          </p>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="bk-name" className={labelCls}>Nama Lengkap *</label>
                        <input
                          id="bk-name"
                          data-testid="booking-name"
                          required
                          minLength={2}
                          maxLength={80}
                          value={form.name}
                          onChange={(e) => set("name")(e.target.value)}
                          placeholder="Nama calon pengantin"
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-wa" className={labelCls}>Nomor WhatsApp *</label>
                        <input
                          id="bk-wa"
                          data-testid="booking-whatsapp"
                          required
                          type="tel"
                          inputMode="tel"
                          pattern="[0-9+\s-]{9,20}"
                          value={form.whatsapp}
                          onChange={(e) => set("whatsapp")(e.target.value)}
                          placeholder="08xx xxxx xxxx"
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-date" className={labelCls}>Tanggal Acara *</label>
                        <input
                          id="bk-date"
                          data-testid="booking-date"
                          required
                          type="date"
                          min={today}
                          value={form.event_date}
                          onChange={(e) => set("event_date")(e.target.value)}
                          className={fieldCls}
                        />
                      </div>
                      <div>
                        <label htmlFor="bk-type" className={labelCls}>Jenis Acara *</label>
                        <select
                          id="bk-type"
                          data-testid="booking-event-type"
                          value={form.event_type}
                          onChange={(e) => set("event_type")(e.target.value as EventType)}
                          className={fieldCls}
                        >
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="bk-package" className={labelCls}>Paket yang Diminati</label>
                        <select
                          id="bk-package"
                          data-testid="booking-package"
                          value={form.package}
                          onChange={(e) => set("package")(e.target.value)}
                          className={fieldCls}
                        >
                          {PACKAGE_OPTIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="bk-location" className={labelCls}>Lokasi Acara</label>
                        <input
                          id="bk-location"
                          data-testid="booking-location"
                          maxLength={120}
                          value={form.location}
                          onChange={(e) => set("location")(e.target.value)}
                          placeholder="Kota / venue"
                          className={fieldCls}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="bk-notes" className={labelCls}>Catatan</label>
                        <textarea
                          id="bk-notes"
                          data-testid="booking-notes"
                          rows={3}
                          maxLength={600}
                          value={form.notes}
                          onChange={(e) => set("notes")(e.target.value)}
                          placeholder="Ceritakan singkat konsep acara, jumlah hari, atau pertanyaan Anda…"
                          className={`${fieldCls} resize-none`}
                        />
                      </div>

                      <div className="sm:col-span-2 mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-stone-500">
                          Data Anda hanya digunakan tim Anez Creative untuk menghubungi Anda.
                        </p>
                        <button
                          type="submit"
                          data-testid="booking-submit"
                          disabled={loading}
                          className="flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-[#0B0C0E] transition-transform duration-300 hover:scale-[1.04] disabled:opacity-60 disabled:hover:scale-100"
                        >
                          {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                          {loading ? "Mengirim…" : "Kirim Permintaan Booking"}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
