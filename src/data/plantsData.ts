import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export interface Disease {
  name: string;
  symptoms: string[];
  solutions: string[];
}

export interface Plant {
  id: number;
  name: string;
  scientificName: string;
  category: string;
  status: "healthy" | "caution" | "infected";
  image: string;
  diseases: Disease[];
  careBasics: {
    water: string;
    sunlight: string;
    fertilizer: string;
  };
  commonIssues: string[];
}

export const PLANTS: Plant[] = [
  {
    id: 1,
    name: "Cabai",
    scientificName: "Capsicum annuum",
    category: "Sayuran Buah",
    status: "healthy",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZ3xlbnwxfHx8fDE3Njc5NDQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    diseases: [
      {
        name: "Antraknosa (Anthracnose)",
        symptoms: [
          "Bercak coklat kehitaman pada buah",
          "Buah membusuk sebelum matang",
          "Daun menguning dan rontok",
        ],
        solutions: [
          "Buang bagian yang terinfeksi",
          "Semprot fungisida organik (tembaga)",
          "Jaga sirkulasi udara",
          "Hindari penyiraman dari atas",
        ],
      },
      {
        name: "Layu Bakteri (Bacterial Wilt)",
        symptoms: [
          "Tanaman layu mendadak",
          "Daun menguning dari bawah",
          "Batang berair jika dipotong",
        ],
        solutions: [
          "Cabut dan musnahkan tanaman terinfeksi",
          "Rotasi tanaman",
          "Gunakan bibit sehat",
          "Sterilisasi alat berkebun",
        ],
      },
      {
        name: "Kutu Daun (Aphids)",
        symptoms: [
          "Daun keriting",
          "Lapisan lengket pada daun",
          "Koloni serangga kecil hijau/hitam",
        ],
        solutions: [
          "Semprotkan air sabun",
          "Gunakan minyak neem",
          "Tanam tanaman pengusir (bawang putih, marigold)",
          "Predator alami (ladybug)",
        ],
      },
    ],
    careBasics: {
      water: "1-2 kali sehari, jaga kelembaban",
      sunlight: "6-8 jam sinar penuh",
      fertilizer: "NPK 2 minggu sekali, pupuk kandang bulanan",
    },
    commonIssues: [
      "Bunga rontok (suhu terlalu panas)",
      "Buah kecil (kurang pupuk)",
      "Daun kuning (kelebihan air)",
    ],
  },
  {
    id: 2,
    name: "Tomat",
    scientificName: "Solanum lycopersicum",
    category: "Sayuran Buah",
    status: "caution",
    image:
      "https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwdG9tYXRvZXN8ZW58MXx8fHwxNjc5MTIyODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    diseases: [
      {
        name: "Blight (Early Blight)",
        symptoms: [
          "Bercak coklat konsentris pada daun bawah",
          "Daun menguning dan mati",
          "Buah berbercak hitam",
        ],
        solutions: [
          "Buang daun terinfeksi",
          "Fungisida berbasis tembaga",
          "Mulsa untuk cegah percikan tanah",
          "Rotasi tanaman",
        ],
      },
      {
        name: "Blossom End Rot",
        symptoms: [
          "Ujung buah hitam dan kering",
          "Buah busuk dari bawah",
          "Tekstur keras pada bagian terinfeksi",
        ],
        solutions: [
          "Tambahkan kalsium (telur hancur)",
          "Penyiraman teratur dan konsisten",
          "Jaga pH tanah 6.0-6.8",
          "Hindari pupuk nitrogen berlebih",
        ],
      },
      {
        name: "Whitefly (Kutu Kebul)",
        symptoms: [
          "Serangga putih kecil terbang saat diganggu",
          "Daun lengket dan berjelaga",
          "Daun menguning",
        ],
        solutions: [
          "Perangkap kuning lengket",
          "Semprotkan air sabun + minyak",
          "Predator alami (lacewing)",
          "Jaring serangga",
        ],
      },
    ],
    careBasics: {
      water: "Pagi hari, siram akar (bukan daun)",
      sunlight: "8+ jam cahaya penuh",
      fertilizer: "Pupuk tinggi fosfor saat berbunga",
    },
    commonIssues: [
      "Buah pecah (penyiraman tidak konsisten)",
      "Tunas lateral banyak (perlu pemangkasan)",
      "Batang lemah (perlu ajir)",
    ],
  },
  {
    id: 3,
    name: "Selada",
    scientificName: "Lactuca sativa",
    category: "Sayuran Daun",
    status: "healthy",
    image:
      "https://images.unsplash.com/photo-1714560560652-e923cb9e30c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE2NzkxMjI4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    diseases: [
      {
        name: "Downy Mildew",
        symptoms: [
          "Bercak kuning pada daun atas",
          "Jamur putih keabuan di bawah daun",
          "Daun layu dan mati",
        ],
        solutions: [
          "Tingkatkan sirkulasi udara",
          "Kurangi kelembaban",
          "Fungisida organik",
          "Hindari menyiram di malam hari",
        ],
      },
      {
        name: "Slugs & Snails (Siput)",
        symptoms: [
          "Lubang besar tidak beraturan pada daun",
          "Jejak lendir berkilau",
          "Kerusakan di malam hari",
        ],
        solutions: [
          "Jebakan bir",
          "Penghalang cangkang telur",
          "Pungut manual di malam hari",
          "Hindari mulsa berlebih",
        ],
      },
    ],
    careBasics: {
      water: "Jaga tanah lembab, hindari kering",
      sunlight: "4-6 jam cahaya tidak langsung",
      fertilizer: "Pupuk nitrogen rendah, mingguan",
    },
    commonIssues: [
      "Bolting (berbunga terlalu cepat - suhu panas)",
      "Daun pahit (kekurangan air)",
      "Pertumbuhan lambat (kurang cahaya)",
    ],
  },
  {
    id: 4,
    name: "Pakcoy",
    scientificName: "Brassica rapa subsp. chinensis",
    category: "Sayuran Daun",
    status: "healthy",
    image:
      "https://images.unsplash.com/photo-1617532740648-0946d1110179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhcm1pbmclMjB2ZWdldGFibGVzfGVufDF8fHx8MTY3OTEyMjgxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    diseases: [
      {
        name: "Ulat Daun (Cabbage Worm)",
        symptoms: [
          "Lubang kecil pada daun",
          "Kotoran hijau di daun",
          "Ulat hijau ditemukan",
        ],
        solutions: [
          "Pungut manual ulat",
          "BT (Bacillus thuringiensis) spray",
          "Jaring pelindung",
          "Tanam marigold sebagai pengusir",
        ],
      },
      {
        name: "Busuk Akar (Root Rot)",
        symptoms: [
          "Batang menghitam di pangkal",
          "Tanaman layu meski disiram",
          "Akar berwarna coklat dan lembek",
        ],
        solutions: [
          "Perbaiki drainase",
          "Kurangi frekuensi siram",
          "Ganti media tanam",
          "Gunakan fungisida biologis",
        ],
      },
    ],
    careBasics: {
      water: "Pagi dan sore, jaga kelembaban tinggi",
      sunlight: "4-6 jam, toleran teduh",
      fertilizer: "Kompos cair mingguan",
    },
    commonIssues: [
      "Daun keras (panen terlambat)",
      "Pertumbuhan kerdil (tanah miskin nutrisi)",
      "Batang panjang (kurang cahaya)",
    ],
  },
  {
    id: 5,
    name: "Daun Bawang",
    scientificName: "Allium fistulosum",
    category: "Sayuran Daun",
    status: "healthy",
    image:
      "https://images.unsplash.com/photo-1630830921563-75b9b28e2154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGdhcmRlbiUyMGNpdHl8ZW58MXx8fHwxNjc5MTIyODExfDA&ixlib=rb-4.1.0&q=80&w=1080",
    diseases: [
      {
        name: "Thrips",
        symptoms: [
          "Daun bergaris perak",
          "Ujung daun mengering",
          "Serangga sangat kecil pada daun",
        ],
        solutions: [
          "Semprotan air kuat",
          "Insektisida organik (neem oil)",
          "Mulsa reflektif",
          "Predator alami",
        ],
      },
      {
        name: "Purple Blotch",
        symptoms: [
          "Bercak ungu pada daun",
          "Daun menguning dan mati",
          "Terjadi saat cuaca lembab",
        ],
        solutions: [
          "Kurangi kelembaban",
          "Fungisida tembaga",
          "Jarak tanam lebih lebar",
          "Buang daun terinfeksi",
        ],
      },
    ],
    careBasics: {
      water: "Teratur, jangan sampai kering",
      sunlight: "6 jam cahaya sedang",
      fertilizer: "Pupuk organik cair 2 minggu sekali",
    },
    commonIssues: [
      "Daun kuning (kekurangan nitrogen)",
      "Pertumbuhan lambat (pot terlalu kecil)",
      "Daun layu (kurang air)",
    ],
  },
];

export const PLANT_CATEGORIES = ["all", "Sayuran Buah", "Sayuran Daun"];

export const STATUS_CONFIG = {
  healthy: {
    label: "Sehat",
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  caution: {
    label: "Waspada",
    icon: AlertTriangle,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  infected: {
    label: "Terinfeksi",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};
