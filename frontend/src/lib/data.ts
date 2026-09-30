export const BRAND = {
  name: "Anez Creative",
  tagline: "Photography & Videography",
  location: "Padang, Sumatera Barat, Indonesia",
  phone: "0857-6656-4437",
  wa: "6285766564437",
  email: "aanneezz15@gmail.com",
  instagram: "@anez.creative",
  instagramUrl: "https://www.instagram.com/anez.creative/",
};

export const waLink = (message: string) =>
  `https://wa.me/${BRAND.wa}?text=${encodeURIComponent(message)}`;

export const bookMsg = (name: string, price: string) =>
  `Halo Anez Creative! Saya tertarik booking ${name} (${price}). Apakah tanggal acara saya masih tersedia?`;

export interface WeddingPackage {
  id: string;
  name: string;
  tier: string;
  price: string;
  featured?: boolean;
  badge?: string;
  items: string[];
}

export const weddingPackages: WeddingPackage[] = [
  {
    id: "silver",
    name: "Silver Wedding",
    tier: "Essential",
    price: "Rp 2.600.000",
    items: [
      "Cetak Foto 4R — 100 Lembar",
      "Cetak Foto 12R+ — 2 Lembar",
      "Cetak Foto 20R+ — 1 Lembar",
      "Frame 20R+ — 1 Buah",
      "Album 10 Sheet — 1 Buah",
      "All Foto via Google Drive",
    ],
  },
  {
    id: "gold",
    name: "Gold Wedding",
    tier: "Signature",
    price: "Rp 3.600.000",
    featured: true,
    badge: "Paling Populer",
    items: [
      "Cetak Foto 4R — 160 Lembar",
      "Cetak Foto 12R+ — 4 Lembar",
      "Cetak Foto 20R+ — 1 Lembar",
      "Cetak Foto 16R+ — 1 Lembar",
      "Frame 20R+ — 1 Buah",
      "Frame 16R+ — 1 Buah",
      "Album 15 Sheet — 1 Buah",
      "Flash Disk — 1 Buah",
    ],
  },
  {
    id: "platinum",
    name: "Platinum Wedding",
    tier: "Royal Heirloom",
    price: "Rp 5.600.000",
    items: [
      "Cetak Foto 4R — 210 Lembar",
      "Cetak Foto 12R+ — 10 Lembar",
      "Cetak Foto 20R+ — 2 Lembar",
      "Cetak Foto 16R+ — 2 Lembar",
      "Frame 20R+ — 2 Buah",
      "Frame 16R+ — 2 Buah",
      "Album 20 Sheet — 1 Buah",
      "Flash Disk — 1 Buah",
    ],
  },
];

export interface PricingItem {
  id: string;
  name: string;
  price: string;
  detail: string;
}

export const cinemaItems: PricingItem[] = [
  { id: "teaser", name: "Video Teaser", price: "Rp 1.250.000", detail: "Moment Akad — Resepsi · Durasi 1–2 Menit" },
  { id: "cinema", name: "Video Cinema", price: "Rp 1.850.000", detail: "Moment Akad — Resepsi · Durasi 3–4 Menit" },
  { id: "drone", name: "Add On Drone Aerial", price: "Rp 750.000", detail: "Sudut pandang megah dari udara untuk venue & iring-iringan pengantin" },
];

export const preweddingItems: PricingItem[] = [
  {
    id: "session",
    name: "Prewedding Session",
    price: "Rp 1.500.000",
    detail: "Cetak Foto 12R+ ×1 · Cetak Foto 16R+ ×1 · Frame 12R+ ×1 · Frame 16R+ ×1",
  },
  {
    id: "cinema-prewed",
    name: "Cinema Prewedding",
    price: "Rp 1.200.000",
    detail: "Moment Video Prewedding · Durasi 1–2 Menit",
  },
  {
    id: "drone-prewed",
    name: "Add On Drone Aerial",
    price: "Rp 750.000",
    detail: "Footage aerial sinematik untuk sesi prewedding Anda",
  },
];

export const addons: PricingItem[] = [
  {
    id: "sde",
    name: "Same Day Edit Foto/Video",
    price: "Rp 700.000",
    detail: "100 foto / video cinematic 3–5 menit, diedit maksimal 5 jam setelah acara atau sesi pemotretan.",
  },
  {
    id: "extra-day",
    name: "Penambahan Hari",
    price: "Rp 1.000.000",
    detail: "Jika prosesi pernikahan berlangsung lebih dari 1 hari (tidak termasuk akad).",
  },
  {
    id: "drone-addon",
    name: "Drone",
    price: "Rp 750.000",
    detail: "Durasi kerja 1–4 jam. Footage drone digunakan di dalam video cinematic atau documentary.",
  },
  {
    id: "studio",
    name: "Portable Studio",
    price: "Rp 800.000",
    detail: "Mini portable studio background dengan bentang 6 meter.",
  },
  {
    id: "transport",
    name: "Transportasi & Akomodasi",
    price: "Menyesuaikan",
    detail: "Untuk lokasi di luar kota, klien menyiapkan biaya transportasi & akomodasi tim kami.",
  },
];

export const printCatalog: PricingItem[] = [
  { id: "album-vip", name: "Album VIP", price: "Rp 500.000", detail: "Album VIP 20 halaman, memuat 100 foto kolase." },
  { id: "cetak-20r", name: "Cetak Foto 20R+", price: "Rp 150.000", detail: "50 × 75 cm — ukuran standar untuk bingkai besar." },
  { id: "cetak-16r", name: "Cetak Foto 16R+", price: "Rp 100.000", detail: "40 × 60 cm — ideal untuk potret single atau couple." },
  { id: "frame-20r", name: "Foto Frame 20R+", price: "Rp 250.000", detail: "Menjadi pusat perhatian utama — cocok di dinding ruang tamu atau entrance resepsi sebagai penyambut tamu." },
  { id: "frame-16r", name: "Foto Frame 16R+", price: "Rp 200.000", detail: "Ukuran paling aman & estetik untuk interior rumah modern — apik dipasang berpasangan (beauty shot + wide cinematic)." },
];

export interface TermGroup {
  id: string;
  title: string;
  points: string[];
}

export const terms: TermGroup[] = [
  {
    id: "booking",
    title: "Booking & Payment",
    points: [
      "Konsultasikan tanggal pemotretanmu dengan kami. Untuk booking tanggal diperlukan DP (down payment) sebesar 20% dari total harga paket yang diambil.",
      "Pelunasan pembayaran maksimal H-2 sebelum pemotretan.",
      "Booking jadwal akan tervalidasi setelah bukti pembayaran DP dikirimkan.",
      "Untuk prewedding session, harga yang tertera belum termasuk biaya retribusi, tiket, studio rent, izin lokasi, dan konsumsi selama pemotretan.",
      "Tidak diperkenankan downgrade paket yang telah dipesan.",
      "Jika terjadi pembatalan dari pihak klien, pembayaran yang telah dilakukan tidak dapat dikembalikan.",
      "Dengan melakukan booking/pemesanan, klien menyetujui semua term & conditions yang berlaku.",
    ],
  },
  {
    id: "day-moment",
    title: "Day Moment",
    points: [
      "Jadilah dirimu sendiri, nikmati momen bahagiamu, resapi setiap rasa yang ada di hati dan pikiranmu — percayakan kami untuk mengabadikan momen spesialmu.",
      "Durasi pemotretan paling lama hingga pukul 19.00, dihitung secara continue, sudah termasuk jeda acara dan waktu istirahat.",
    ],
  },
  {
    id: "post-production",
    title: "Post Production",
    points: [
      "Gaya editing, efek, hingga hasil foto dan video diserahkan sepenuhnya kepada tim kami.",
      "Kami tidak menerima manipulasi foto seperti mengganti background atau menambahkan objek tertentu.",
      "Pemilihan & kurasi foto dilakukan oleh tim kami. Request foto edit dari klien dapat disampaikan dalam rentang waktu 7 hari — setelah itu dianggap tidak ada permintaan tambahan.",
      "Permintaan lagu latar untuk video harus didiskusikan sebelum editing dilakukan.",
      "Revisi video maksimal 2 kali (minor, seperti mengganti adegan). Kami tidak menerima revisi berlebihan yang mengharuskan editing ulang dari awal.",
      "Hasil foto edit atau video preview dianggap disetujui jika selama 7 hari setelah dikirim tidak ada respon atau revisi dari klien.",
      "Foto edit dan video cinematic dikirim melalui Google Drive untuk penyimpanan digital.",
      "File dalam Google Drive akan dihapus setelah 1 bulan sejak dikirim, atau setelah output (USB drive & box) diserahkan kepada klien.",
      "Hasil foto dan video dapat kami gunakan untuk keperluan portofolio, pemasaran, iklan, dan promosi.",
      "Proses editing memakan waktu kurang lebih 4–6 minggu; proses cetak & packing 3–4 minggu setelah editing selesai.",
    ],
  },
];

export interface PhilosophyItem {
  id: string;
  title: string;
  desc: string;
  img: string;
}

export const philosophy: PhilosophyItem[] = [
  {
    id: "raw-moment",
    title: "Raw Moment",
    desc: "Tetesan air mata, tawa bahagia, kecup manis terjadi begitu cepat dan sering terabaikan mata. Fotografer kami mengabadikannya secara candid dengan pendekatan dokumenter.",
    img: "/img/pdf_20.webp",
  },
  {
    id: "beauty-session",
    title: "Beauty Session",
    desc: "Setiap pengantin tampil semaksimal mungkin di hari bahagianya. Kami mendokumentasikan dari preparation hingga sempurna — termasuk cincin, sepatu, undangan, dan pernak-pernik lainnya.",
    img: "/img/pdf_22.webp",
  },
  {
    id: "wedding-stage",
    title: "Wedding Stage",
    desc: "Foto bersama di pelaminan menjadi kenangan indah untuk tamu yang hadir, dan tentunya untuk pengantin serta keluarga tercinta.",
    img: "/img/pdf_24.webp",
  },
];
