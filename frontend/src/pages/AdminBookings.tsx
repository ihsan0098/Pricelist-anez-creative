import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, KeyRound, Loader2, LogOut, MessageCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { LogoMark } from "@/components/Navbar";
import {
  BOOKING_STATUSES,
  clearAdminKey,
  formatDateID,
  getAdminKey,
  listBookings,
  setAdminKey,
  updateBookingStatus,
  verifyAdmin,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";

const STATUS_STYLE: Record<BookingStatus, string> = {
  baru: "border-gold/50 bg-gold/15 text-gold",
  dihubungi: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  deal: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  batal: "border-stone-500/40 bg-stone-500/10 text-stone-400",
};

function KeyGate({ onUnlock }: { onUnlock: () => void }) {
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const ok = await verifyAdmin(key.trim());
    setBusy(false);
    if (!ok) {
      toast.error("Kunci admin salah.");
      return;
    }
    setAdminKey(key.trim());
    onUnlock();
  };

  return (
    <form
      data-testid="admin-key-form"
      onSubmit={submit}
      className="gold-ring mx-auto mt-16 w-full max-w-md rounded-3xl border border-gold/30 bg-[#1A1713] p-8"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
        <KeyRound size={18} />
      </span>
      <h1 className="mt-5 font-heading text-3xl font-medium text-stone-100">Daftar Booking</h1>
      <p className="mt-2 text-sm text-stone-400">Masukkan kunci admin untuk melihat calon klien yang masuk.</p>
      <input
        data-testid="admin-key-input"
        type="password"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Kunci admin"
        autoFocus
        className="mt-6 w-full rounded-xl border border-white/12 bg-black/40 px-4 py-3 text-sm text-stone-100 outline-none focus:border-gold/70"
      />
      <button
        data-testid="admin-key-submit"
        disabled={busy || !key.trim()}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-[#0B0C0E] disabled:opacity-50"
      >
        {busy ? <Loader2 size={15} className="animate-spin" /> : null}
        Masuk
      </button>
    </form>
  );
}

function BookingRow({ b, onStatus }: { b: Booking; onStatus: (id: string, s: BookingStatus) => void }) {
  const isPast = b.event_date < new Date().toISOString().slice(0, 10);
  return (
    <article
      data-testid={`booking-row-${b.id}`}
      className={`grid gap-4 rounded-2xl border border-white/10 bg-card p-5 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-center ${
        isPast ? "opacity-60" : ""
      }`}
    >
      <div>
        <p className="font-heading text-lg font-medium text-stone-100">{b.name}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
          {b.event_type} · {b.package ?? "—"}
        </p>
        {b.notes && <p className="mt-2 text-xs italic leading-relaxed text-stone-400">“{b.notes}”</p>}
      </div>
      <div>
        <p className="flex items-center gap-2 text-sm text-gold">
          <CalendarDays size={14} />
          {formatDateID(b.event_date)}
        </p>
        <p className="mt-1 text-xs text-stone-400">{b.location ?? "Lokasi belum diisi"}</p>
      </div>
      <div>
        <a
          data-testid={`booking-row-wa-${b.id}`}
          href={`https://wa.me/${b.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-stone-200 transition-colors hover:text-gold"
        >
          <MessageCircle size={14} />
          +{b.whatsapp}
        </a>
        <p className="mt-1 text-[11px] text-stone-500">
          Masuk {new Date(b.created_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
        </p>
      </div>
      <select
        data-testid={`booking-status-${b.id}`}
        value={b.status}
        onChange={(e) => onStatus(b.id, e.target.value as BookingStatus)}
        className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] outline-none [color-scheme:dark] ${STATUS_STYLE[b.status]}`}
      >
        {BOOKING_STATUSES.map((s) => (
          <option key={s} value={s} className="bg-[#141518] text-stone-200">
            {s}
          </option>
        ))}
      </select>
    </article>
  );
}

export default function AdminBookings() {
  const [unlocked, setUnlocked] = useState(() => Boolean(getAdminKey()));
  const [rows, setRows] = useState<Booking[] | null>(null);
  const [filter, setFilter] = useState<"semua" | BookingStatus>("semua");

  const load = async () => {
    try {
      setRows(await listBookings());
    } catch {
      toast.error("Sesi admin berakhir, silakan masuk kembali.");
      clearAdminKey();
      setUnlocked(false);
    }
  };

  useEffect(() => {
    if (unlocked) void load();
  }, [unlocked]);

  const onStatus = async (id: string, status: BookingStatus) => {
    const updated = await updateBookingStatus(id, status);
    setRows((r) => r?.map((b) => (b.id === id ? updated : b)) ?? null);
    toast.success(`Status diubah ke "${status}"`);
  };

  const visible = useMemo(
    () => (rows ?? []).filter((b) => filter === "semua" || b.status === filter),
    [rows, filter]
  );
  const newCount = rows?.filter((b) => b.status === "baru").length ?? 0;

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-foreground sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between">
          <Link to="/" data-testid="admin-back-home" className="flex items-center gap-3 text-stone-400 hover:text-gold">
            <ArrowLeft size={16} />
            <LogoMark size={36} />
          </Link>
          {unlocked && (
            <div className="flex items-center gap-2">
              <button
                data-testid="admin-refresh"
                onClick={load}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-stone-300 hover:border-gold hover:text-gold"
                aria-label="Muat ulang"
              >
                <RefreshCw size={14} />
              </button>
              <button
                data-testid="admin-logout"
                onClick={() => { clearAdminKey(); setUnlocked(false); setRows(null); }}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-stone-300 hover:border-gold hover:text-gold"
              >
                <LogOut size={13} /> Keluar
              </button>
            </div>
          )}
        </header>

        {!unlocked ? (
          <KeyGate onUnlock={() => setUnlocked(true)} />
        ) : (
          <>
            <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/90">Calon Klien</p>
                <h1 className="mt-3 font-heading text-4xl font-medium text-stone-100 sm:text-5xl">
                  Daftar Booking
                  {newCount > 0 && (
                    <span data-testid="admin-new-count" className="ml-3 align-middle rounded-full bg-gold px-3 py-1 font-mono text-xs text-[#0B0C0E]">
                      {newCount} baru
                    </span>
                  )}
                </h1>
              </div>
              <div data-testid="admin-status-filter" className="flex flex-wrap gap-2">
                {(["semua", ...BOOKING_STATUSES] as const).map((s) => (
                  <button
                    key={s}
                    data-testid={`admin-filter-${s}`}
                    onClick={() => setFilter(s)}
                    className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                      filter === s ? "border-gold bg-gold text-[#0B0C0E]" : "border-white/15 text-stone-400 hover:text-gold"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div data-testid="admin-booking-list" className="mt-10 space-y-3">
              {rows === null ? (
                <p className="flex items-center gap-2 text-sm text-stone-500"><Loader2 size={14} className="animate-spin" /> Memuat…</p>
              ) : visible.length === 0 ? (
                <p data-testid="admin-empty" className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-stone-500">
                  Belum ada booking pada kategori ini.
                </p>
              ) : (
                visible.map((b) => <BookingRow key={b.id} b={b} onStatus={onStatus} />)
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
