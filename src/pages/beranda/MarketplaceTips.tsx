// src/components/sections/MarketplaceTipsSection.tsx
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BadgeCheck,
    Camera,
    ChartNoAxesCombined,
    ClipboardCheck,
    Handshake,
    Leaf,
    MapPin,
    Sparkles,
    Star,
    Truck,
} from "lucide-react";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

function Badge({
    children,
    tone = "green",
}: {
    children: React.ReactNode;
    tone?: "green" | "amber" | "gray" | "blue";
}) {
    const map = {
        green: "bg-green-100 text-green-700 border-green-200",
        amber: "bg-amber-100 text-amber-700 border-amber-200",
        gray: "bg-gray-100 text-gray-700 border-gray-200",
        blue: "bg-blue-100 text-blue-700 border-blue-200",
    } as const;

    return (
        <span
            className={cx(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
                map[tone]
            )}
        >
            {children}
        </span>
    );
}

function TipCard({
    icon,
    title,
    desc,
    tags,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    tags: Array<{ label: string; tone?: "green" | "amber" | "gray" | "blue" }>;
}) {
    return (
        <div className="group bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                            {icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{desc}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((t, idx) => (
                        <Badge key={idx} tone={t.tone ?? "gray"}>
                            {t.label}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
}

export default function MarketplaceTipsSection() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-emerald-50 to-white py-20">
            {/* blobs */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-10 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                ✨ Tips & Trik Jualan
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Biar dagangan kamu{" "}
                            <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                cepat laku
                            </span>{" "}
                            di marketplace
                        </h2>

                        <p className="text-gray-600 max-w-2xl">
                            Praktik sederhana yang bisa langsung kamu terapkan: dari kualitas foto, penentuan harga,
                            hingga cara membangun kepercayaan pembeli dan kolaborasi dengan toko mitra.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">


                        <Link
                            to="/dashboard/marketplace"
                            className="bg-white text-green-700 px-6 py-3 rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all font-semibold inline-flex items-center gap-2"
                        >
                            Mulai Jualan
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TipCard
                        icon={<Camera className="w-5 h-5" />}
                        title="Foto jelas = trust naik"
                        desc="Gunakan pencahayaan natural, background polos, dan ambil 3 angle (depan, detail, kemasan/karung). Sertakan close-up kualitas (warna, ukuran, butiran)."
                        tags={[
                            { label: "Konversi", tone: "green" },
                            { label: "Branding", tone: "blue" },
                            { label: "Checklist Foto", tone: "gray" },
                        ]}
                    />

                    <TipCard
                        icon={<ClipboardCheck className="w-5 h-5" />}
                        title="Deskripsi singkat tapi lengkap"
                        desc="Tulis: komoditas, grade/kualitas, asal lokasi, tanggal panen, volume tersedia + range, dan metode penyimpanan. Pembeli suka detail yang bisa diverifikasi."
                        tags={[
                            { label: "Kualitas/Grade", tone: "amber" },
                            { label: "Panen & Volume", tone: "gray" },
                            { label: "Transparan", tone: "green" },
                        ]}
                    />

                    <TipCard
                        icon={<ChartNoAxesCombined className="w-5 h-5" />}
                        title="Strategi harga yang masuk akal"
                        desc="Pasang harga kompetitif, lalu bedakan lewat value: reliabilitas, pengemasan rapi, dan respon cepat. Untuk stok besar, sediakan harga grosir/negosiasi."
                        tags={[
                            { label: "Harga", tone: "blue" },
                            { label: "Grosir", tone: "gray" },
                            { label: "Nilai Tambah", tone: "green" },
                        ]}
                    />

                    <TipCard
                        icon={<BadgeCheck className="w-5 h-5" />}
                        title="Kejar status Verified & rating"
                        desc="Aktifkan verifikasi data penjual, konsisten dengan kualitas, dan minta review setelah transaksi. Rating tinggi bikin Toko kamu muncul lebih dipercaya."
                        tags={[
                            { label: "Verified", tone: "green" },
                            { label: "Rating", tone: "blue" },
                            { label: "Kepercayaan", tone: "gray" },
                        ]}
                    />

                    <TipCard
                        icon={<Truck className="w-5 h-5" />}
                        title="Pengiriman: jelaskan estimasi & packing"
                        desc="Tulis estimasi kirim, area layanan, dan standar packing (karung, box, silica gel, dll). Buat opsi pickup untuk pembeli sekitar biar lebih cepat."
                        tags={[
                            { label: "Logistik", tone: "amber" },
                            { label: "Packing", tone: "gray" },
                            { label: "Pickup", tone: "blue" },
                        ]}
                    />

                    <TipCard
                        icon={<Handshake className="w-5 h-5" />}
                        title="Kolaborasi dengan toko mitra"
                        desc="Kalau kapasitas terbatas, kerja sama dengan toko mitra untuk gudang, distribusi, atau bundling (benih+pupuk). Klik “Minta Penawaran” untuk mulai negosiasi."
                        tags={[
                            { label: "Kolaborasi", tone: "green" },
                            { label: "Distribusi", tone: "blue" },
                            { label: "Bundling", tone: "gray" },
                        ]}
                    />
                </div>

                {/* Bottom strip */}
                <div className="mt-10 bg-white/70 backdrop-blur rounded-3xl border border-green-100 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2">
                            <Badge tone="green">
                                <Leaf className="w-4 h-4" />
                                SDGs 2: Zero Hunger
                            </Badge>
                            <Badge tone="gray">
                                <MapPin className="w-4 h-4" />
                                Urban Farming
                            </Badge>
                            <Badge tone="blue">
                                <Star className="w-4 h-4" />
                                Materi Praktis
                            </Badge>
                        </div>

                        <div className="text-lg font-bold text-gray-900">
                            Mau jago Urban Farming dari nol?
                        </div>

                        <div className="text-sm text-gray-600">
                            Pelajari cara menanam, merawat, hingga panen di lahan terbatas.
                            Cocok untuk pemula dan komunitas perkotaan.
                        </div>
                    </div>

                    <Link
                        to="/belajar"
                        className="group bg-linear-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] inline-flex items-center gap-2"
                    >
                        Mulai Belajar
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
