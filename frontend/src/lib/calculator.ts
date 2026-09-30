export interface CalcOption {
  id: string;
  label: string;
  price: number;
}

export interface CalcGroup {
  id: string;
  title: string;
  hint: string;
  multi: boolean;
  options: CalcOption[];
}

export const CALC_GROUPS: CalcGroup[] = [
  {
    id: "wedding",
    title: "Paket Wedding",
    hint: "Pilih satu",
    multi: false,
    options: [
      { id: "silver", label: "Silver Wedding", price: 2600000 },
      { id: "gold", label: "Gold Wedding", price: 3600000 },
      { id: "platinum", label: "Platinum Wedding", price: 5600000 },
    ],
  },
  {
    id: "cinema",
    title: "Wedding Cinema",
    hint: "Boleh lebih dari satu",
    multi: true,
    options: [
      { id: "teaser", label: "Video Teaser (1–2 menit)", price: 1250000 },
      { id: "cinema", label: "Video Cinema (3–4 menit)", price: 1850000 },
      { id: "drone", label: "Drone Aerial", price: 750000 },
    ],
  },
  {
    id: "prewedding",
    title: "Prewedding",
    hint: "Boleh lebih dari satu",
    multi: true,
    options: [
      { id: "session", label: "Prewedding Session", price: 1500000 },
      { id: "cinema-prewed", label: "Cinema Prewedding", price: 1200000 },
    ],
  },
  {
    id: "addons",
    title: "Add-ons",
    hint: "Boleh lebih dari satu",
    multi: true,
    options: [
      { id: "sde", label: "Same Day Edit", price: 700000 },
      { id: "extra-day", label: "Penambahan Hari", price: 1000000 },
      { id: "drone-addon", label: "Drone (1–4 jam)", price: 750000 },
      { id: "studio", label: "Portable Studio", price: 800000 },
    ],
  },
  {
    id: "cetak",
    title: "Cetak & Album",
    hint: "Boleh lebih dari satu",
    multi: true,
    options: [
      { id: "album-vip", label: "Album VIP 20 Halaman", price: 500000 },
      { id: "cetak-20r", label: "Cetak Foto 20R+", price: 150000 },
      { id: "cetak-16r", label: "Cetak Foto 16R+", price: 100000 },
      { id: "frame-20r", label: "Foto Frame 20R+", price: 250000 },
      { id: "frame-16r", label: "Foto Frame 16R+", price: 200000 },
    ],
  },
];

export const formatIDR = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;
