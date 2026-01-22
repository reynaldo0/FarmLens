// src/data/articleData.ts
export type ArticleCategory =
  | "agroindustri"
  | "ekonomi"
  | "tips"
  | "smartfarming"
  | "iot"
  | "pertanian_5_0"
  | "kebijakan"
  | "ketahanan_pangan";

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  featured?: boolean;

  sourceUrl: string;
  sourceName: string;

  publishedAt?: string;
  readTime?: number;
};

// ✅ CategoryFilter kamu butuh string[]
export const categories: string[] = [
  "all",
  "agroindustri",
  "ekonomi",
  "tips",
  "smartfarming",
  "iot",
  "pertanian_5_0",
  "kebijakan",
  "ketahanan_pangan",
];

export const articles: Article[] = [
  {
    id: "a1",
    featured: true,
    title:
      "Agroindustri: Jembatan yang Mengubah Hasil Tani Jadi Produk Bernilai Ekonomi",
    excerpt:
      "Inovasi agroindustri mendorong nilai tambah di pedesaan: dari panen mentah menjadi produk olahan bernilai ekonomi dan memperpanjang rantai produksi yang menguntungkan.",
    category: "agroindustri",
    sourceName: "Good News From Indonesia",
    sourceUrl:
      "https://www.goodnewsfromindonesia.id/2025/10/08/dari-hasil-panen-menjadi-produk-bernilai-bagaimana-peran-agroindustri-dalam-menggerakkan-pertanian-indonesia",
    publishedAt: "2025-10-08",
    readTime: 6,
  },
  {
    id: "a2",
    title: "Mengapa Pertanian Jadi Pilar Utama Pembangunan Ekonomi Indonesia",
    excerpt:
      "Pertanian menopang ketahanan pangan, penyerapan tenaga kerja pedesaan, ekspor komoditas unggulan, serta membuka peluang nilai tambah lewat pengolahan produk.",
    category: "ekonomi",
    sourceName: "Tambah Pinter",
    sourceUrl:
      "https://tambahpinter.com/mengapa-sektor-pertanian-penting-bagi-pembangunan-ekonomi-indonesia/",
    readTime: 5,
  },
  {
    id: "a3",
    title: "6 Tips Sukses Bertani & Bercocok Tanam di Indonesia",
    excerpt:
      "Strategi agar panen maksimal dan risiko gagal menurun: belajar dulu ilmunya, bibit unggul, pemupukan tepat, dan tanam sesuai musim.",
    category: "tips",
    sourceName: "IlmuBudidaya.com",
    sourceUrl:
      "https://ilmubudidaya.com/tips-sukses-bertani-dan-bercocok-tanam-di-indonesia",
    readTime: 4,
  },
  {
    id: "a4",
    title:
      "Tips Bertani untuk Pemula: Kiat Dasar agar Sukses di Dunia Pertanian",
    excerpt:
      "Panduan langkah awal bertani: persiapan lahan, pemilihan bibit, hingga perawatan yang praktis agar hasil panen lebih optimal.",
    category: "tips",
    sourceName: "KlikPertanian.id",
    sourceUrl:
      "https://www.klikpertanian.id/berita/112515465319/ternyata-ini-beberapa-tips-bertani-petani-pemula-wajib-tau?page=2",
    readTime: 5,
  },
  {
    id: "a5",
    title:
      "Pertanian Klasik vs Smartfarming: Pilihan Masa Depan di Pedesaan Indonesia",
    excerpt:
      "Membandingkan praktik tradisional turun-temurun dengan pertanian cerdas berbasis teknologi digital—serta dampaknya pada produktivitas dan efisiensi.",
    category: "smartfarming",
    sourceName: "Kompasiana",
    sourceUrl:
      "https://www.kompasiana.com/mutmainnahinnah0285/696da850ed641565cc1130f2/pertanian-klasik-atau-smartfarming-di-pedesaan",
    readTime: 6,
  },
  {
    id: "a6",
    title:
      "IoT & Smart Farming: Teknologi Masa Depan yang Mengubah Pertanian Modern",
    excerpt:
      "IoT menghubungkan sensor dan data real-time untuk otomatisasi dan efisiensi, membantu pertanian lebih produktif dan berkelanjutan menuju smart farming.",
    category: "iot",
    sourceName: "Flux Blog",
    sourceUrl:
      "https://blog.flux.id/prediksi-perkembangan-iot-pertanian-smart-farming/",
    readTime: 6,
  },
  {
    id: "a7",
    title: "Pertanian 5.0: Inovasi Digital Menuju Pertanian Berkelanjutan",
    excerpt:
      "Integrasi IoT, AI, dan robotika untuk pertanian yang lebih efisien, ramah lingkungan, dan siap menghadapi tantangan masa depan.",
    category: "pertanian_5_0",
    sourceName: "KMSEP Faperta UGM",
    sourceUrl:
      "https://kmsep.faperta.ugm.ac.id/2024/07/17/pertanian-5-0-transformasi-digital-menyongsong-pertanian-berkelanjutan/",
    publishedAt: "2024-07-17",
    readTime: 7,
  },
  {
    id: "a8",
    title:
      "Rencana Pangan Nasional 2025–2029: Strategi Menguatkan Ketahanan Pangan Indonesia",
    excerpt:
      "Strategi terintegrasi memperkuat kedaulatan, kemandirian, dan ketahanan pangan melalui koordinasi lintas pihak, sinergi kebijakan, dan aksi adaptif.",
    category: "kebijakan",
    sourceName: "Badan Pangan Nasional",
    sourceUrl:
      "https://badanpangan.go.id/blog/post/rencana-pangan-nasional-2025-2029-menjawab-tantangan-ketahanan-pangan-di-indonesia",
    readTime: 6,
  },
  {
    id: "a9",
    title: "Pertanian: Pilar Utama Ketahanan Pangan di Indonesia",
    excerpt:
      "Pertanian sebagai tulang punggung ketahanan pangan: menghadapi tantangan iklim dan alih fungsi lahan dengan teknologi, diversifikasi, kebijakan, dan kolaborasi.",
    category: "ketahanan_pangan",
    sourceName: "Environesia",
    sourceUrl:
      "https://environesia.co.id/blog/Pertanian-Kunci-Ketahanan-Pangan",
    readTime: 5,
  },
  {
    id: "a10",
    title:
      "Transformasi Pangan Nasional: Kunci Ketahanan & Keberlanjutan Pangan Indonesia",
    excerpt:
      "Transformasi sistem pangan lewat inovasi teknologi, digitalisasi, dan sinergi lintas sektor untuk memperkuat kemandirian, ketahanan, dan keberlanjutan.",
    category: "kebijakan",
    sourceName: "Bappenas",
    sourceUrl:
      "https://www.bappenas.go.id/id/berita/bappenas-dorong-transformasi-pangan-nasional-untuk-ketahanan-dan-keberlanjutan-pangan-gRGot",
    readTime: 6,
  },
];
