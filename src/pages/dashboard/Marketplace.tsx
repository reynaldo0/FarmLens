import { AnimatePresence, motion } from "framer-motion";
import {
    Calendar,
    CheckCircle2,
    MapPin,
    Package,
    Phone,
    Search,
    ShoppingCart,
    Star,
    TrendingUp,
    Store,
    Wrench,
    Sprout,
    BadgeCheck,
    Truck,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

type MarketplaceItem = {
    id: number;
    komoditas: string;
    petani: string;
    lokasi: string;
    volume: number;
    volumeRange: string;
    tanggalPanen: string;
    harga: number;
    kualitas: string;
    reliabilitas: number;
    rating: number;
    status: "available" | "reserved";
    verified: boolean;
};

type FarmingSupplyItem = {
    id: number;
    nama: string;
    kategori: "alat" | "benih" | "pupuk" | "media" | "pestisida";
    brand?: string;
    lokasi: string;
    stok: number;
    satuan: string; // pcs, kg, liter
    harga: number;
    rating: number;
    verified: boolean;
    status: "available" | "reserved";
    estimasiKirimHari: number;
};

type WilayahItem = { code: string; name: string };
type WilayahResponse = { data: WilayahItem[]; meta?: { updated_at?: string } };

type PartnerStore = {
    id: string;
    nama: string;
    alamat: string;
    telepon?: string;
    rating: number;
    provinceCode?: string;
    regencyCode?: string;
    districtCode?: string;
    villageCode?: string;
};

const listings: MarketplaceItem[] = [
    {
        id: 1,
        komoditas: "Padi - IR64",
        petani: "Budi Santoso",
        lokasi: "Desa Sukamaju, Jawa Barat",
        volume: 7.2,
        volumeRange: "6.8 - 7.5",
        tanggalPanen: "2025-08-15",
        harga: 5500,
        kualitas: "Grade A",
        reliabilitas: 92,
        rating: 4.8,
        status: "available",
        verified: true,
    },
    {
        id: 2,
        komoditas: "Jagung - Hibrida NK212",
        petani: "Siti Rahayu",
        lokasi: "Desa Makmur, Jawa Tengah",
        volume: 5.5,
        volumeRange: "5.2 - 5.8",
        tanggalPanen: "2025-08-12",
        harga: 4200,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.9,
        status: "available",
        verified: true,
    },
    {
        id: 3,
        komoditas: "Cabai Merah Keriting",
        petani: "Ahmad Dahlan",
        lokasi: "Desa Sejahtera, Jawa Timur",
        volume: 2.5,
        volumeRange: "2.2 - 2.8",
        tanggalPanen: "2025-07-28",
        harga: 18000,
        kualitas: "Grade A",
        reliabilitas: 90,
        rating: 4.7,
        status: "available",
        verified: true,
    },
    {
        id: 4,
        komoditas: "Tomat Gondol",
        petani: "Ibu Sari",
        lokasi: "Desa Subur, Jawa Barat",
        volume: 4.0,
        volumeRange: "3.8 - 4.2",
        tanggalPanen: "2025-08-08",
        harga: 6500,
        kualitas: "Grade A",
        reliabilitas: 87,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 5,
        komoditas: "Bawang Merah",
        petani: "Pak Joko",
        lokasi: "Desa Mekar, Jawa Tengah",
        volume: 3.2,
        volumeRange: "3.0 - 3.5",
        tanggalPanen: "2025-08-20",
        harga: 15000,
        kualitas: "Grade B",
        reliabilitas: 85,
        rating: 4.5,
        status: "reserved",
        verified: true,
    },
    {
        id: 6,
        komoditas: "Padi - Ciherang",
        petani: "Kelompok Tani Maju",
        lokasi: "Desa Tani, Jawa Barat",
        volume: 12.0,
        volumeRange: "11.5 - 12.5",
        tanggalPanen: "2025-08-18",
        harga: 5300,
        kualitas: "Grade A",
        reliabilitas: 94,
        rating: 4.9,
        status: "available",
        verified: true,
    },
];

const supplies: FarmingSupplyItem[] = [
    // ===== PUPUK =====
    {
        id: 101,
        nama: "Pupuk NPK 16-16-16",
        kategori: "pupuk",
        brand: "AgroMax",
        lokasi: "Gudang Bandung, Jawa Barat",
        stok: 120,
        satuan: "kg",
        harga: 12500,
        rating: 4.8,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 102,
        nama: "Pupuk Kompos Organik",
        kategori: "pupuk",
        brand: "GreenSoil",
        lokasi: "Bogor, Jawa Barat",
        stok: 200,
        satuan: "kg",
        harga: 8000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },

    // ===== BENIH =====
    {
        id: 103,
        nama: "Benih Cabai Keriting F1",
        kategori: "benih",
        brand: "NusaSeed",
        lokasi: "Depo Semarang, Jawa Tengah",
        stok: 300,
        satuan: "pak",
        harga: 18000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 104,
        nama: "Benih Tomat Premium",
        kategori: "benih",
        brand: "TaniGrow",
        lokasi: "Malang, Jawa Timur",
        stok: 250,
        satuan: "pak",
        harga: 15000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },

    // ===== ALAT =====
    {
        id: 105,
        nama: "Cangkul Baja Premium",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Jakarta Selatan",
        stok: 50,
        satuan: "pcs",
        harga: 85000,
        rating: 4.8,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },
    {
        id: 106,
        nama: "Sekop Taman Serbaguna",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Bandung, Jawa Barat",
        stok: 70,
        satuan: "pcs",
        harga: 45000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 107,
        nama: "Sabit Panen Baja",
        kategori: "alat",
        brand: "PanenMax",
        lokasi: "Yogyakarta",
        stok: 60,
        satuan: "pcs",
        harga: 30000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 108,
        nama: "Sprayer Manual 2L",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Jakarta Selatan",
        stok: 40,
        satuan: "pcs",
        harga: 65000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },
    {
        id: 109,
        nama: "Selang Air 20 Meter",
        kategori: "alat",
        brand: "HydroFlex",
        lokasi: "Surabaya, Jawa Timur",
        stok: 35,
        satuan: "pcs",
        harga: 95000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },

    // ===== MEDIA TANAM =====
    {
        id: 110,
        nama: "Media Tanam Cocopeat 5kg",
        kategori: "media",
        brand: "GreenGrow",
        lokasi: "Surabaya, Jawa Timur",
        stok: 80,
        satuan: "kg",
        harga: 24000,
        rating: 4.5,
        verified: true,
        status: "reserved",
        estimasiKirimHari: 3,
    },
    {
        id: 111,
        nama: "Polybag Tanam 30x30",
        kategori: "media",
        brand: "UrbanFarm",
        lokasi: "Jakarta Barat",
        stok: 500,
        satuan: "pcs",
        harga: 1500,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },

    // ===== PESTISIDA =====
    {
        id: 112,
        nama: "Pestisida Nabati Neem Oil 250ml",
        kategori: "pestisida",
        brand: "EcoPlant",
        lokasi: "Bandung, Jawa Barat",
        stok: 55,
        satuan: "botol",
        harga: 39000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 113,
        nama: "Pestisida Anti Hama Organik",
        kategori: "pestisida",
        brand: "SafeCrop",
        lokasi: "Bogor, Jawa Barat",
        stok: 40,
        satuan: "botol",
        harga: 32000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
];


const partnerStores: PartnerStore[] = [
    {
        id: "t1",
        nama: "Toko Tani Sejahtera",
        alamat: "Jl. Raya Pasar Tani No. 12",
        telepon: "0812-0000-1111",
        rating: 4.7,
        provinceCode: "32",
    },
    {
        id: "t2",
        nama: "Gudang Agro Makmur",
        alamat: "Komplek Pergudangan Blok B-7",
        telepon: "0813-0000-2222",
        rating: 4.6,
        provinceCode: "33",
    },
    {
        id: "t3",
        nama: "Sentra Pangan Nusantara",
        alamat: "Jl. Distribusi Utama No. 5",
        telepon: "0814-0000-3333",
        rating: 4.8,
        provinceCode: "35",
    },
    {
        id: "t4",
        nama: "Kios Hasil Panen Jagakarsa",
        alamat: "Jl. Kebun Raya No. 9, Jagakarsa",
        telepon: "0815-0000-4444",
        rating: 4.9,
        regencyCode: "31.74",
        districtCode: "31.74.09",
    },
];

const WILAYAH_API = "https://farmlens-dev.vercel.app/api/wilayah";

async function fetchWilayah<T>(path: string, signal?: AbortSignal): Promise<T> {
    const url = `${WILAYAH_API}?path=${encodeURIComponent(path)}`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Request gagal: ${res.status}`);
    return (await res.json()) as T;
}

function TabButton({
    active,
    onClick,
    icon,
    title,
    subtitle,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "w-full text-left rounded-2xl border p-4 transition",
                active
                    ? "bg-green-50 border-green-200 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <div
                    className={[
                        "w-10 h-10 rounded-xl flex items-center justify-center ring-1 ring-black/5",
                        active ? "bg-white" : "bg-white",
                    ].join(" ")}
                >
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
            </div>
        </button>
    );
}

export default function Marketplace() {
    const [activeTab, setActiveTab] = useState<"hasil" | "alat">("hasil");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | "available" | "reserved">("all");
    const [detail, setDetail] = useState<MarketplaceItem | null>(null);
    const [detailSupply, setDetailSupply] = useState<FarmingSupplyItem | null>(null);
    const afterWilayahRef = useRef<HTMLDivElement | null>(null);
    const didAutoScrollRef = useRef(false);

    // --- WILAYAH ---
    const [provinces, setProvinces] = useState<WilayahItem[]>([]);
    const [regencies, setRegencies] = useState<WilayahItem[]>([]);
    const [districts, setDistricts] = useState<WilayahItem[]>([]);
    const [villages, setVillages] = useState<WilayahItem[]>([]);

    const [provinceCode, setProvinceCode] = useState<string>("");
    const [regencyCode, setRegencyCode] = useState<string>("");
    const [districtCode, setDistrictCode] = useState<string>("");
    const [villageCode, setVillageCode] = useState<string>("");

    const [loadingWilayah, setLoadingWilayah] = useState({
        provinces: false,
        regencies: false,
        districts: false,
        villages: false,
    });

    // ✅ Gate: minimal pilih provinsi dulu
    const hasSelectedWilayah = Boolean(provinceCode);

    useEffect(() => {
        // reset kalau user hapus pilihan provinsi
        if (!hasSelectedWilayah) {
            didAutoScrollRef.current = false;
            return;
        }

        // auto-scroll cuma sekali saat pertama kali wilayah "aktif"
        if (didAutoScrollRef.current) return;

        didAutoScrollRef.current = true;

        // kasih jeda sedikit biar UI bagian bawah sempat render
        const t = setTimeout(() => {
            afterWilayahRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 120);

        return () => clearTimeout(t);
    }, [hasSelectedWilayah]);


    // Fetch provinces on mount
    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, provinces: true }));
                const json = await fetchWilayah<WilayahResponse>("provinces.json", ac.signal);
                setProvinces(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat provinsi", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, provinces: false }));
            }
        })();
        return () => ac.abort();
    }, []);

    // Reset chain ketika province berubah
    useEffect(() => {
        setRegencyCode("");
        setRegencies([]);
        setDistrictCode("");
        setDistricts([]);
        setVillageCode("");
        setVillages([]);
    }, [provinceCode]);

    // Reset chain ketika regency berubah
    useEffect(() => {
        setDistrictCode("");
        setDistricts([]);
        setVillageCode("");
        setVillages([]);
    }, [regencyCode]);

    // Reset chain ketika district berubah
    useEffect(() => {
        setVillageCode("");
        setVillages([]);
    }, [districtCode]);

    // Fetch regencies
    useEffect(() => {
        if (!provinceCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, regencies: true }));
                const json = await fetchWilayah<WilayahResponse>(
                    `regencies/${provinceCode}.json`,
                    ac.signal
                );
                setRegencies(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kab/kota", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, regencies: false }));
            }
        })();
        return () => ac.abort();
    }, [provinceCode]);

    // Fetch districts
    useEffect(() => {
        if (!regencyCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, districts: true }));
                const json = await fetchWilayah<WilayahResponse>(
                    `districts/${regencyCode}.json`,
                    ac.signal
                );
                setDistricts(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kecamatan", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, districts: false }));
            }
        })();
        return () => ac.abort();
    }, [regencyCode]);

    // Fetch villages
    useEffect(() => {
        if (!districtCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, villages: true }));
                const json = await fetchWilayah<WilayahResponse>(
                    `villages/${districtCode}.json`,
                    ac.signal
                );
                setVillages(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kel/desa", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, villages: false }));
            }
        })();
        return () => ac.abort();
    }, [districtCode]);

    const wilayahLabel = useMemo(() => {
        const p = provinces.find((x) => x.code === provinceCode)?.name;
        const r = regencies.find((x) => x.code === regencyCode)?.name;
        const d = districts.find((x) => x.code === districtCode)?.name;
        const v = villages.find((x) => x.code === villageCode)?.name;
        return [v, d, r, p].filter(Boolean).join(", ");
    }, [provinceCode, regencyCode, districtCode, villageCode, provinces, regencies, districts, villages]);

    const recommendedStores = useMemo(() => {
        const scored = partnerStores
            .map((store) => {
                let score = 0;
                if (villageCode && store.villageCode === villageCode) score = 4;
                else if (districtCode && store.districtCode === districtCode) score = 3;
                else if (regencyCode && store.regencyCode === regencyCode) score = 2;
                else if (provinceCode && store.provinceCode === provinceCode) score = 1;
                return { store, score };
            })
            .filter((x) => {
                if (!provinceCode && !regencyCode && !districtCode && !villageCode) return true;
                return x.score > 0;
            })
            .sort((a, b) => b.score - a.score || b.store.rating - a.store.rating)
            .slice(0, 6);

        return scored;
    }, [provinceCode, regencyCode, districtCode, villageCode]);

    const filteredHasil = useMemo(() => {
        return listings.filter((item) => {
            const s = search.toLowerCase();
            return (
                (item.komoditas.toLowerCase().includes(s) || item.lokasi.toLowerCase().includes(s)) &&
                (status === "all" || item.status === status)
            );
        });
    }, [search, status]);

    const filteredAlat = useMemo(() => {
        return supplies.filter((item) => {
            const s = search.toLowerCase();
            return (
                (item.nama.toLowerCase().includes(s) ||
                    item.kategori.toLowerCase().includes(s) ||
                    item.lokasi.toLowerCase().includes(s) ||
                    (item.brand ?? "").toLowerCase().includes(s)) &&
                (status === "all" || item.status === status)
            );
        });
    }, [search, status]);

    const handleContact = () => {
        toast.info("Fitur Dalam Pengembangan", {
            description:
                "Integrasi WhatsApp & sistem pesan internal sedang kami siapkan agar komunikasi lebih aman dan terdokumentasi.",
        });
    };

    const handleOrderSuccess = () => {
        toast.success("Pesanan Berhasil Dicatat", {
            description: "Tim kami akan segera memproses transaksi dan menghubungi Anda untuk tahap selanjutnya.",
        });
        setDetail(null);
    };

    const handleOrderSupplySuccess = () => {
        toast.success("Checkout Berhasil Dicatat", {
            description: "Pesanan alat & bahan kamu akan diproses dan dikirim sesuai estimasi.",
        });
        setDetailSupply(null);
    };

    const handleCallStore = (store: PartnerStore) => {
        toast.info("Kontak Toko", {
            description: store.telepon ? `${store.nama} • ${store.telepon}` : `${store.nama} • Nomor belum tersedia`,
        });
    };

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" richColors />

            {/* ===================== STEP 1: PILIH WILAYAH (MUNCUL DIAWAL) ===================== */}
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6"
            >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-green-700">Mohon Untuk</p>
                        <h2 className="text-xl font-semibold text-gray-900 mt-1">Pilih Wilayah Anda</h2>
                        <p className="text-gray-600 mt-2">
                            Lokasi digunakan untuk menampilkan <b>toko partner terdekat</b> dan marketplace yang relevan.
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        {wilayahLabel ? (
                            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2">
                                <MapPin className="w-4 h-4 text-green-700" />
                                <span className="text-green-800 font-medium">{wilayahLabel}</span>
                            </div>
                        ) : (
                            <span className="text-gray-500">Silakan pilih lokasi dulu</span>
                        )}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                        <label className="text-xs text-gray-500">Provinsi</label>
                        <select
                            value={provinceCode}
                            onChange={(e) => setProvinceCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={loadingWilayah.provinces}
                        >
                            <option value="">{loadingWilayah.provinces ? "Memuat..." : "Pilih Provinsi"}</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kab/Kota</label>
                        <select
                            value={regencyCode}
                            onChange={(e) => setRegencyCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!provinceCode || loadingWilayah.regencies}
                        >
                            <option value="">
                                {!provinceCode ? "Pilih provinsi dulu" : loadingWilayah.regencies ? "Memuat..." : "Pilih Kab/Kota"}
                            </option>
                            {regencies.map((r) => (
                                <option key={r.code} value={r.code}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kecamatan</label>
                        <select
                            value={districtCode}
                            onChange={(e) => setDistrictCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!regencyCode || loadingWilayah.districts}
                        >
                            <option value="">
                                {!regencyCode ? "Pilih kab/kota dulu" : loadingWilayah.districts ? "Memuat..." : "Pilih Kecamatan"}
                            </option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kel/Desa</label>
                        <select
                            value={villageCode}
                            onChange={(e) => setVillageCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!districtCode || loadingWilayah.villages}
                        >
                            <option value="">
                                {!districtCode
                                    ? "Pilih kecamatan dulu"
                                    : loadingWilayah.villages
                                        ? "Memuat..."
                                        : "Opsional: Pilih Kel/Desa"}
                            </option>
                            {villages.map((v) => (
                                <option key={v.code} value={v.code}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    {!hasSelectedWilayah ? (
                        <div className="rounded-2xl border border-dashed p-4 text-sm text-gray-600">
                            Pilih minimal <b>Provinsi</b> untuk menampilkan rekomendasi dan marketplace.
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                            Wilayah tersimpan. Konten rekomendasi & marketplace sudah muncul di bawah.
                        </div>
                    )}
                </div>
            </motion.section>
            {/* REKOMENDASI TOKO */}
            <section className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6 my-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-green-700">Partner Terdekat</p>
                        <h2 className="text-xl font-semibold text-gray-900 mt-1">Rekomendasi Toko di Sekitarmu</h2>
                        <p className="text-gray-600 mt-2">
                            Berdasarkan lokasi: <b>{wilayahLabel || "—"}</b>
                        </p>
                    </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedStores.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-dashed p-6 text-center text-gray-600">
                            Belum ada toko partner yang cocok untuk wilayah ini.
                            <div className="text-xs text-gray-500 mt-1">
                                (Tambahkan data toko lengkap dengan kode wilayah: Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa)
                            </div>
                        </div>
                    ) : (
                        recommendedStores.map(({ store, score }) => (
                            <motion.div
                                key={store.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35 }}
                                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Store className="w-4 h-4 text-green-700" />
                                            <h3 className="font-semibold text-gray-900">{store.nama}</h3>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{store.alamat}</p>
                                    </div>

                                    <div className="text-right">
                                        <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                                            <Star className="w-4 h-4" /> {store.rating.toFixed(1)}
                                        </div>
                                        <div className="mt-1">
                                            <span className="text-[11px] px-2 py-1 rounded-full border bg-gray-50 text-gray-700 border-gray-200">
                                                {score >= 4
                                                    ? "Satu desa"
                                                    : score === 3
                                                        ? "Satu kecamatan"
                                                        : score === 2
                                                            ? "Satu kab/kota"
                                                            : "Satu provinsi"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleCallStore(store)}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                    >
                                        <Phone className="w-4 h-4" /> Hubungi
                                    </button>
                                    <button
                                        onClick={() =>
                                            toast.success("Permintaan penawaran dikirim", {
                                                description:
                                                    "Toko partner akan menghubungi Anda untuk detail harga, volume, dan jadwal pengiriman.",
                                            })
                                        }
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                          bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                    >
                                        <ShoppingCart className="w-4 h-4" /> Minta Penawaran
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </section>

            {/* ===================== STEP 2+: BARU MUNCUL SETELAH WILAYAH DIPILIH ===================== */}
            {!hasSelectedWilayah ? null : (
                <div ref={afterWilayahRef}>
                    {/* HEADER + SEARCH */}
                    <motion.header
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative overflow-hidden rounded-3xl
              bg-linear-to-br from-green-50 via-white to-green-100
              border border-green-200 p-6
              flex flex-col gap-4"
                    >
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-green-700">🛒 Smart Agriculture Marketplace</p>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Marketplace</h1>
                                <p className="text-gray-600 mt-2">
                                    Pilih tab: <b>Hasil Tani</b> atau <b>Alat & Bahan</b>
                                </p>
                            </div>

                            <div className="relative z-10 flex gap-2">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={activeTab === "hasil" ? "Cari komoditas / lokasi" : "Cari alat, pupuk, benih, brand..."}
                                        className="pl-9 pr-4 py-2 rounded-xl border bg-white/80 backdrop-blur focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="px-3 py-2 rounded-xl border bg-white/80 backdrop-blur"
                                >
                                    <option value="all">Semua</option>
                                    <option value="available">Tersedia</option>
                                    <option value="reserved">Dipesan</option>
                                </select>
                            </div>
                        </div>

                        {/* TABS */}
                        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3">
                            <TabButton
                                active={activeTab === "hasil"}
                                onClick={() => setActiveTab("hasil")}
                                icon={<Sprout className="w-5 h-5 text-green-700" />}
                                title="Hasil Tani"
                                subtitle="Jual beli hasil panen dari petani"
                            />
                            <TabButton
                                active={activeTab === "alat"}
                                onClick={() => setActiveTab("alat")}
                                icon={<Wrench className="w-5 h-5 text-green-700" />}
                                title="Alat & Bahan"
                                subtitle="Pupuk, benih, media tanam, pestisida, alat"
                            />
                        </div>
                    </motion.header>



                    {/* ===================== TAB CONTENT ===================== */}
                    {activeTab === "hasil" ? (
                        <>
                            {/* LISTINGS HASIL TANI */}
                            <section className="grid md:grid-cols-3 gap-6">
                                {filteredHasil.map((item) => (
                                    <motion.article
                                        key={item.id}
                                        whileHover={{ y: -6 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                        className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-5 hover:shadow-2xl transition"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                                    {item.komoditas}
                                                    {item.verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                </h3>
                                                <p className="text-sm text-gray-500">{item.petani}</p>
                                            </div>

                                            <span
                                                className={[
                                                    "text-xs px-3 py-1 rounded-full font-medium border",
                                                    item.status === "available"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : "bg-amber-100 text-amber-700 border-amber-200",
                                                ].join(" ")}
                                            >
                                                {item.status === "available" ? "Tersedia" : "Dipesan"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" /> {item.volume} ton
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />{" "}
                                                {new Date(item.tanggalPanen).toLocaleDateString("id-ID")}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" /> Rp {item.harga.toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4" /> {item.rating}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-xl mt-4">
                                            <MapPin className="w-4 h-4" /> {item.lokasi}
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Reliabilitas</span>
                                                <span>{item.reliabilitas}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${item.reliabilitas}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    className="h-2 bg-green-500 rounded-full"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-5">
                                            <button
                                                onClick={handleContact}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                            >
                                                <Phone className="w-4 h-4" /> Hubungi
                                            </button>

                                            <button
                                                onClick={() => setDetail(item)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                          bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                            >
                                                <ShoppingCart className="w-4 h-4" /> Pesan
                                            </button>
                                        </div>
                                    </motion.article>
                                ))}
                            </section>

                            {/* DETAIL + KONFIRMASI HASIL */}
                            <AnimatePresence>
                                {detail && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50"
                                    >
                                        <motion.div
                                            initial={{ y: 100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 100 }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md shadow-2xl"
                                        >
                                            <h3 className="text-lg font-semibold mb-3">Konfirmasi Pesanan</h3>

                                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                <p>
                                                    <strong>Komoditas:</strong> {detail.komoditas}
                                                </p>
                                                <p>
                                                    <strong>Petani:</strong> {detail.petani}
                                                </p>
                                                <p>
                                                    <strong>Volume:</strong> {detail.volume} ton
                                                </p>
                                                <p>
                                                    <strong>Harga:</strong> Rp {detail.harga.toLocaleString()} / kg
                                                </p>
                                                <p>
                                                    <strong>Panen:</strong>{" "}
                                                    {new Date(detail.tanggalPanen).toLocaleDateString("id-ID")}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => setDetail(null)} className="flex-1 border rounded-xl py-2">
                                                    Batal
                                                </button>
                                                <button onClick={handleOrderSuccess} className="flex-1 bg-green-600 text-white rounded-xl py-2">
                                                    Konfirmasi
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <>
                            {/* LISTINGS ALAT & BAHAN */}
                            <section className="grid md:grid-cols-3 gap-6">
                                {filteredAlat.map((item) => (
                                    <motion.article
                                        key={item.id}
                                        whileHover={{ y: -6 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                        className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-5 hover:shadow-2xl transition"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="min-w-0">
                                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                                    {item.nama}
                                                    {item.verified && <BadgeCheck className="w-4 h-4 text-green-600" />}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {item.brand ? `${item.brand} • ` : ""}
                                                    {item.kategori.toUpperCase()}
                                                </p>
                                            </div>

                                            <span
                                                className={[
                                                    "text-xs px-3 py-1 rounded-full font-medium border",
                                                    item.status === "available"
                                                        ? "bg-green-100 text-green-700 border-green-200"
                                                        : "bg-amber-100 text-amber-700 border-amber-200",
                                                ].join(" ")}
                                            >
                                                {item.status === "available" ? "Tersedia" : "Dipesan"}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4" /> Stok {item.stok} {item.satuan}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Truck className="w-4 h-4" /> {item.estimasiKirimHari} hari
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" /> Rp {item.harga.toLocaleString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4" /> {item.rating.toFixed(1)}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-xl mt-4">
                                            <MapPin className="w-4 h-4" /> {item.lokasi}
                                        </div>

                                        <div className="mt-5 flex gap-2">
                                            <button
                                                onClick={handleContact}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                            >
                                                <Phone className="w-4 h-4" /> Tanya
                                            </button>

                                            <button
                                                onClick={() => setDetailSupply(item)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                          bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                            >
                                                <ShoppingCart className="w-4 h-4" /> Beli
                                            </button>
                                        </div>
                                    </motion.article>
                                ))}
                            </section>

                            {/* DETAIL + KONFIRMASI ALAT & BAHAN */}
                            <AnimatePresence>
                                {detailSupply && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50"
                                    >
                                        <motion.div
                                            initial={{ y: 100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 100 }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md shadow-2xl"
                                        >
                                            <h3 className="text-lg font-semibold mb-3">Checkout Alat & Bahan</h3>

                                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                <p>
                                                    <strong>Produk:</strong> {detailSupply.nama}
                                                </p>
                                                <p>
                                                    <strong>Kategori:</strong> {detailSupply.kategori.toUpperCase()}
                                                </p>
                                                <p>
                                                    <strong>Stok:</strong> {detailSupply.stok} {detailSupply.satuan}
                                                </p>
                                                <p>
                                                    <strong>Harga:</strong> Rp {detailSupply.harga.toLocaleString()}
                                                </p>
                                                <p>
                                                    <strong>Estimasi Kirim:</strong> {detailSupply.estimasiKirimHari} hari
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => setDetailSupply(null)} className="flex-1 border rounded-xl py-2">
                                                    Batal
                                                </button>
                                                <button
                                                    onClick={handleOrderSupplySuccess}
                                                    className="flex-1 bg-green-600 text-white rounded-xl py-2"
                                                >
                                                    Konfirmasi
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
