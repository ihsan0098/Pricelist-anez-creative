export interface GalleryPhoto {
  src: string;
  alt: string;
  cat: string;
}

export const GALLERY: GalleryPhoto[] = [
  { src: "/img/pdf_01.webp", alt: "Pengantin dengan busana adat Minangkabau", cat: "Wedding" },
  { src: "/img/pdf_03.webp", alt: "Sesi prewedding outdoor bernuansa putih", cat: "Prewedding" },
  { src: "/img/pdf_04.webp", alt: "Pengantin di pelaminan adat bernuansa emas", cat: "Pelaminan" },
  { src: "/img/pdf_05.webp", alt: "Momen prewedding di taman", cat: "Prewedding" },
  { src: "/img/pdf_06.webp", alt: "Prosesi akad penuh khidmat", cat: "Wedding" },
  { src: "/img/pdf_07.webp", alt: "Pengantin berjalan bersama selepas prosesi", cat: "Wedding" },
  { src: "/img/pdf_08.webp", alt: "Pengantin di dalam rumah adat", cat: "Pelaminan" },
  { src: "/img/pdf_09.webp", alt: "Pasangan di depan Rumah Gadang", cat: "Wedding" },
  { src: "/img/pdf_10.webp", alt: "Momen di pelaminan bernuansa taman", cat: "Wedding" },
  { src: "/img/pdf_11.webp", alt: "Prewedding bernuansa alam", cat: "Prewedding" },
  { src: "/img/pdf_12.webp", alt: "Momen mesra calon pengantin", cat: "Prewedding" },
  { src: "/img/pdf_13.webp", alt: "Detail pelaminan adat", cat: "Pelaminan" },
  { src: "/img/pdf_14.webp", alt: "Beauty session pengantin berhijab", cat: "Beauty" },
  { src: "/img/pdf_15.webp", alt: "Sesi prewedding dengan bingkai unik", cat: "Prewedding" },
  { src: "/img/pdf_16.webp", alt: "Prewedding dengan nuansa modern", cat: "Prewedding" },
  { src: "/img/pdf_17.webp", alt: "Sesi sinematik di air terjun", cat: "Prewedding" },
  { src: "/img/pdf_18.webp", alt: "Pengantin di pelaminan megah", cat: "Pelaminan" },
  { src: "/img/pdf_19.webp", alt: "Momen sakral di pelaminan", cat: "Pelaminan" },
  { src: "/img/pdf_20.webp", alt: "Raw moment persiapan pengantin", cat: "Raw Moment" },
  { src: "/img/pdf_21.webp", alt: "Detail undangan dan stationery", cat: "Detail" },
  { src: "/img/pdf_22.webp", alt: "Beauty session dengan cahaya lembut", cat: "Beauty" },
  { src: "/img/pdf_23.webp", alt: "Foto bersama keluarga di wedding stage", cat: "Wedding Stage" },
  { src: "/img/pdf_24.webp", alt: "Keluarga besar di pelaminan", cat: "Wedding Stage" },
  { src: "/img/pdf_25.webp", alt: "Prosesi adat di pelaminan", cat: "Pelaminan" },
  { src: "/img/pdf_26.webp", alt: "Pasangan di anak tangga Rumah Gadang", cat: "Wedding" },
  { src: "/img/pdf_27.webp", alt: "Beauty session pengantin di taman", cat: "Beauty" },
];

export interface Testimonial {
  id: string;
  names: string;
  event: string;
  quote: string;
  img: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "hikmah-dewa",
    names: "Hikmah & Dewa",
    event: "Wedding — Padang",
    quote:
      "Dari akad sampai resepsi, semua momen kecil yang sempat kami lewatkan ternyata diabadikan dengan sangat indah. Hasilnya jauh melebihi ekspektasi keluarga.",
    img: "/img/pdf_18.webp",
  },
  {
    id: "rania-fajar",
    names: "Rania & Fajar",
    event: "Prewedding — Bukittinggi",
    quote:
      "Timnya sabar dan membuat kami nyaman di depan kamera. Foto prewedding-nya sinematik sekali — rasanya seperti poster film.",
    img: "/img/pdf_11.webp",
  },
  {
    id: "putri-rizky",
    names: "Putri & Rizky",
    event: "Wedding — Solok",
    quote:
      "Same day edit-nya diputar malam itu juga dan para tamu sampai bertepuk tangan. Terima kasih Anez Creative!",
    img: "/img/pdf_24.webp",
  },
];
