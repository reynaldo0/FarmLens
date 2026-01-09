import {
  Globe,
  TrendingUp,
  Users,
  Upload,
  Scan,
  CheckCircle,
} from "lucide-react";

export const issues = [
  {
    icon: Globe,
    title: "Krisis Pangan Global",
    description: "FAO memprediksikan kebutuhan pangan meningkat 60% pada 2050",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Perubahan Iklim",
    description: "Cuaca ekstrem menurunkan produktivitas pertanian hingga 30%",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Urbanisasi Tinggi",
    description:
      "68% populasi akan tinggal di kota pada 2050 - urban farming solusinya",
    color: "from-green-500 to-emerald-500",
  },
];

export const steps = [
  {
    icon: Upload,
    title: "Upload Foto Tanaman",
    description: "Ambil foto daun atau bagian tanaman yang ingin diperiksa",
    step: "01",
  },
  {
    icon: Scan,
    title: "AI Analisis Instan",
    description: "Teknologi AI mendeteksi penyakit dalam hitungan detik",
    step: "02",
  },
  {
    icon: CheckCircle,
    title: "Dapatkan Rekomendasi",
    description: "Terima solusi perawatan yang tepat dan praktis",
    step: "03",
  },
];
