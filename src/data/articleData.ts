export interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

export const categories = [
  "all",
  "Ketahanan Pangan",
  "Urban Farming",
  "Perubahan Iklim",
];

export const articles: Article[] = [
  {
    id: 1,
    title: "Krisis Pangan Global 2026: Mengapa Urban Farming Menjadi Solusi",
    excerpt:
      "Perubahan iklim dan pertumbuhan populasi memaksa kita berinovasi...",
    category: "Ketahanan Pangan",
    author: "Dr. Siti Rahma",
    date: "8 Januari 2026",
    readTime: "8 menit",
    image: "https://images.unsplash.com/photo-1762098069270-66f50cdb1a84",
    featured: true,
  },
  {
    id: 2,
    title: "Urban Farming di Jakarta: Transformasi Lahan Sempit Jadi Produktif",
    excerpt:
      "Studi kasus bagaimana warga Jakarta mengubah balkon dan rooftop menjadi kebun produktif yang menghasilkan 20kg sayuran per bulan.",
    category: "Urban Farming",
    author: "Ahmad Hidayat",
    date: "5 Januari 2026",
    readTime: "10 menit",
    image:
      "https://images.unsplash.com/photo-1630830921563-75b9b28e2154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGdhcmRlbiUyMGNpdHl8ZW58MXx8fHwxNzY3OTcwNTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "Dampak Perubahan Iklim terhadap Pertanian Indonesia",
    excerpt:
      "Analisis mendalam tentang bagaimana kenaikan suhu dan perubahan pola hujan mempengaruhi produktivitas tanaman lokal dan strategi adaptasi.",
    category: "Perubahan Iklim",
    author: "Prof. Budi Santoso",
    date: "3 Januari 2026",
    readTime: "12 menit",
    image:
      "https://images.unsplash.com/photo-1558906307-1a1c52b5ac8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwY2hhbmdlJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzY3OTcwNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "SDGs 2.3: Target Ketahanan Pangan dan Peran Petani Kecil",
    excerpt:
      "Bagaimana target SDGs 2.3 mendorong peningkatan produktivitas dan pendapatan petani skala kecil melalui teknologi dan edukasi.",
    category: "Ketahanan Pangan",
    author: "Dr. Linda Wijaya",
    date: "1 Januari 2026",
    readTime: "7 menit",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZ3xlbnwxfHx8fDE3Njc5NDQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "Sistem Hidroponik Modern: Solusi Pertanian Masa Depan",
    excerpt:
      "Mengenal sistem hidroponik yang hemat air 90% dibanding pertanian konvensional dan cocok untuk lahan urban yang terbatas.",
    category: "Urban Farming",
    author: "Rina Kusuma",
    date: "28 Desember 2025",
    readTime: "9 menit",
    image:
      "https://images.unsplash.com/photo-1714560560652-e923cb9e30c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3Njc5NzA1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 6,
    title: "Kekeringan dan Banjir: Dua Sisi Krisis Iklim di Sektor Pertanian",
    excerpt:
      "Fenomena cuaca ekstrem mengancam ketahanan pangan nasional. Bagaimana petani beradaptasi dengan kondisi yang tidak menentu?",
    category: "Perubahan Iklim",
    author: "Dr. Bambang Irawan",
    date: "25 Desember 2025",
    readTime: "11 menit",
    image:
      "https://images.unsplash.com/photo-1703932892707-96a68172d8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc5NzA0NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];
