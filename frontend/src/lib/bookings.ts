import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { BRAND } from "@/lib/data";

export const EVENT_TYPES = ["Wedding", "Prewedding", "Wedding + Prewedding", "Lainnya"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export const PACKAGE_OPTIONS = [
  "Belum tahu — ingin konsultasi",
  "Silver Wedding",
  "Gold Wedding",
  "Platinum Wedding",
  "Prewedding Session",
  "Video Teaser / Cinema",
];

export const BOOKING_STATUSES = ["baru", "dihubungi", "deal", "batal"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export interface BookingInput {
  name: string;
  whatsapp: string;
  event_type: EventType;
  event_date: string;
  package?: string;
  location?: string;
  notes?: string;
}

export interface Booking extends BookingInput {
  id: string;
  status: BookingStatus;
  created_at: string;
}

const ADMIN_KEY_STORAGE = "anez-admin-key";

export const getAdminKey = () => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "";
export const setAdminKey = (key: string) => sessionStorage.setItem(ADMIN_KEY_STORAGE, key);
export const clearAdminKey = () => sessionStorage.removeItem(ADMIN_KEY_STORAGE);

const adminHeaders = () => ({ "X-Admin-Key": getAdminKey() });

export const createBooking = (input: BookingInput) => apiPost<Booking>("/bookings", input);

export const verifyAdmin = (key: string) =>
  fetch("/api/bookings/verify-admin", { method: "POST", headers: { "X-Admin-Key": key } }).then(
    (r) => r.ok
  );

export const listBookings = () => apiGet<Booking[]>("/bookings", adminHeaders());

export const updateBookingStatus = (id: string, status: BookingStatus) =>
  apiPatch<Booking>(`/bookings/${id}`, { status }, adminHeaders());

export const formatDateID = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const bookingWaMessage = (b: BookingInput) =>
  [
    `Halo ${BRAND.name}! Saya sudah mengisi form booking di website.`,
    "",
    `Nama: ${b.name}`,
    `Jenis acara: ${b.event_type}`,
    `Tanggal acara: ${formatDateID(b.event_date)}`,
    b.package ? `Paket: ${b.package}` : null,
    b.location ? `Lokasi: ${b.location}` : null,
    b.notes ? `Catatan: ${b.notes}` : null,
    "",
    "Mohon konfirmasi ketersediaan tanggalnya ya. Terima kasih!",
  ]
    .filter((l) => l !== null)
    .join("\n");
