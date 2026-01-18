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
    Store
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

type WilayahItem = { code: string; name: string };
type WilayahResponse = { data: WilayahItem[]; meta?: { updated_at?: string } };

type PartnerStore = {
    id: string;
    nama: string;
    alamat: string;
    telepon?: string;
    rating: number;
    // cakupan (bisa kamu sesuaikan dengan data real toko kamu)
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
        verified: true
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
        verified: true
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
        verified: true
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
        verified: true
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
        verified: true
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
        verified: true
    }
];

// Contoh data partner toko (gantikan dari backend kamu nanti)
const partnerStores: PartnerStore[] = [
    {
        id: "t1",
        nama: "Toko Tani Sejahtera",
        alamat: "Jl. Raya Pasar Tani No. 12",
        telepon: "0812-0000-1111",
        rating: 4.7,
        provinceCode: "32" // Jawa Barat
    },
    {
        id: "t2",
        nama: "Gudang Agro Makmur",
        alamat: "Komplek Pergudangan Blok B-7",
        telepon: "0813-0000-2222",
        rating: 4.6,
        provinceCode: "33" // Jawa Tengah
    },
    {
        id: "t3",
        nama: "Sentra Pangan Nusantara",
        alamat: "Jl. Distribusi Utama No. 5",
        telepon: "0814-0000-3333",
        rating: 4.8,
        provinceCode: "35" // Jawa Timur
    },
    // contoh lebih spesifik: kab/kota & kecamatan (code mengikuti wilayah.id)
    {
        id: "t4",
        nama: "Kios Hasil Panen Jagakarsa",
        alamat: "Jl. Kebun Raya No. 9, Jagakarsa",
        telepon: "0815-0000-4444",
        rating: 4.9,
        regencyCode: "31.74", // Jakarta Selatan
        districtCode: "31.74.09" // Jagakarsa
    }
];

const WILAYAH_API = "https://farmlens-dev.vercel.app/api/wilayah";

async function fetchWilayah<T>(path: string, signal?: AbortSignal): Promise<T> {
    const url = `${WILAYAH_API}?path=${encodeURIComponent(path)}`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Request gagal: ${res.status}`);
    return (await res.json()) as T;
}

export default function Marketplace() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [detail, setDetail] = useState<MarketplaceItem | null>(null);

    // --- WILAYAH (untuk rekomendasi toko) ---
    const [provinces, setProvinces] = useState<WilayahItem[]>([]);
    const [regencies, setRegencies] = useState<WilayahItem[]>([]);
    const [districts, setDistricts] = useState<WilayahItem[]>([]);
    const [villages, setVillages] = useState<WilayahItem[]>([]);

    const [provinceCode, setProvinceCode] = useState<string>("");
    const [regencyCode, setRegencyCode] = useState<string>("");
    const [districtCode, setDistrictCode] = useState<string>("");
    const [villageCode, setVillageCode] = useState<string>("");

    const [loadingWilayah, setLoadingWilayah] = useState<{
        provinces: boolean;
        regencies: boolean;
        districts: boolean;
        villages: boolean;
    }>({ provinces: false, regencies: false, districts: false, villages: false });

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

    // Fetch regencies when province changes
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

    // Fetch districts when regency changes
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

    // Fetch villages when district changes
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
        const p = provinces.find(x => x.code === provinceCode)?.name;
        const r = regencies.find(x => x.code === regencyCode)?.name;
        const d = districts.find(x => x.code === districtCode)?.name;
        const v = villages.find(x => x.code === villageCode)?.name;
        return [v, d, r, p].filter(Boolean).join(", ");
    }, [provinceCode, regencyCode, districtCode, villageCode, provinces, regencies, districts, villages]);

    const recommendedStores = useMemo(() => {
        // skor kedekatan berdasarkan kecocokan wilayah paling spesifik
        const scored = partnerStores
            .map(store => {
                let score = 0;
                if (villageCode && store.villageCode === villageCode) score = 4;
                else if (districtCode && store.districtCode === districtCode) score = 3;
                else if (regencyCode && store.regencyCode === regencyCode) score = 2;
                else if (provinceCode && store.provinceCode === provinceCode) score = 1;

                return { store, score };
            })
            .filter(x => {
                // kalau user belum pilih apa-apa, tampilkan top global
                if (!provinceCode && !regencyCode && !districtCode && !villageCode) return true;
                return x.score > 0;
            })
            .sort((a, b) => b.score - a.score || b.store.rating - a.store.rating)
            .slice(0, 6);

        return scored;
    }, [provinceCode, regencyCode, districtCode, villageCode]);

    const filtered = useMemo(() => {
        return listings.filter(item => {
            const s = search.toLowerCase();
            return (
                (item.komoditas.toLowerCase().includes(s) ||
                    item.lokasi.toLowerCase().includes(s)) &&
                (status === "all" || item.status === status)
            );
        });
    }, [search, status]);

    const handleContact = () => {
        toast.info("Fitur Dalam Pengembangan", {
            description:
                "Integrasi WhatsApp & sistem pesan internal sedang kami siapkan agar komunikasi lebih aman dan terdokumentasi."
        });
    };

    const handleOrderSuccess = () => {
        toast.success("Pesanan Berhasil Dicatat", {
            description:
                "Tim kami akan segera memproses transaksi dan menghubungi Anda untuk tahap selanjutnya."
        });
        setDetail(null);
    };

    const handleCallStore = (store: PartnerStore) => {
        toast.info("Kontak Toko", {
            description: store.telepon
                ? `${store.nama} • ${store.telepon}`
                : `${store.nama} • Nomor belum tersedia`
        });
    };

    return (
        <div className="space-y-8">
            {/* TOASTER */}
            <Toaster position="bottom-right" richColors />

            {/* HEADER */}
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl
        bg-linear-to-br from-green-50 via-white to-green-100
        border border-green-200 p-6
        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-green-700">
                        🛒 Smart Agriculture Marketplace
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                        Marketplace Panen
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Pasokan pertanian terprediksi, transparan, dan terverifikasi
                    </p>
                </div>

                {/* SEARCH & FILTER */}
                <div className="relative z-10 flex gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari komoditas / lokasi"
                            className="pl-9 pr-4 py-2 rounded-xl border
              bg-white/80 backdrop-blur
              focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="px-3 py-2 rounded-xl border bg-white/80 backdrop-blur"
                    >
                        <option value="all">Semua</option>
                        <option value="available">Tersedia</option>
                        <option value="reserved">Dipesan</option>
                    </select>
                </div>
            </motion.header>

            {/* REKOMENDASI TOKO TERDEKAT (Wilayah.id) */}
            <section className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-green-700">🏪 Partner Terdekat</p>
                        <h2 className="text-xl font-semibold text-gray-900 mt-1">
                            Rekomendasi Toko Berdasarkan Wilayah
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Pilih lokasi untuk menampilkan toko partner terdekat (berdasarkan kecocokan wilayah).
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        {wilayahLabel ? (
                            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2">
                                <MapPin className="w-4 h-4 text-green-700" />
                                <span className="text-green-800 font-medium">{wilayahLabel}</span>
                            </div>
                        ) : (
                            <span className="text-gray-500">Belum memilih lokasi</span>
                        )}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                        <label className="text-xs text-gray-500">Provinsi</label>
                        <select
                            value={provinceCode}
                            onChange={e => setProvinceCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={loadingWilayah.provinces}
                        >
                            <option value="">
                                {loadingWilayah.provinces ? "Memuat..." : "Pilih Provinsi"}
                            </option>
                            {provinces.map(p => (
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
                            onChange={e => setRegencyCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!provinceCode || loadingWilayah.regencies}
                        >
                            <option value="">
                                {!provinceCode
                                    ? "Pilih provinsi dulu"
                                    : loadingWilayah.regencies
                                        ? "Memuat..."
                                        : "Pilih Kab/Kota"}
                            </option>

                            {regencies.map(r => (
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
                            onChange={e => setDistrictCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!regencyCode || loadingWilayah.districts}
                        >
                            <option value="">
                                {!regencyCode
                                    ? "Pilih kab/kota dulu"
                                    : loadingWilayah.districts
                                        ? "Memuat..."
                                        : "Pilih Kecamatan"}
                            </option>

                            {districts.map(d => (
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
                            onChange={e => setVillageCode(e.target.value)}
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

                            {villages.map(v => (
                                <option key={v.code} value={v.code}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedStores.length === 0 ? (
                        <div className="col-span-full rounded-2xl border border-dashed p-6 text-center text-gray-600">
                            Belum ada toko partner yang cocok untuk wilayah ini.
                            <div className="text-xs text-gray-500 mt-1">
                                (Tambahkan data toko dengan province/regency/district/village code)
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
                                            <span
                                                className={[
                                                    "text-[11px] px-2 py-1 rounded-full border",
                                                    score >= 3
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : score === 2
                                                            ? "bg-blue-50 text-blue-700 border-blue-200"
                                                            : "bg-gray-50 text-gray-700 border-gray-200"
                                                ].join(" ")}
                                            >
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
                                                    "Toko partner akan menghubungi Anda untuk detail harga, volume, dan jadwal pengiriman."
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

            {/* LISTINGS */}
            <section className="grid md:grid-cols-3 gap-6">
                {filtered.map(item => (
                    <motion.article
                        key={item.id}
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        className="rounded-2xl bg-white/80 backdrop-blur
            border border-gray-200 p-5
            hover:shadow-2xl transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                    {item.komoditas}
                                    {item.verified && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    )}
                                </h3>
                                <p className="text-sm text-gray-500">{item.petani}</p>
                            </div>
                            <span className="text-xs px-3 py-1 rounded-full font-medium
                bg-green-100 text-green-700 border border-green-200">
                                Tersedia
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
                                <TrendingUp className="w-4 h-4" /> Rp{" "}
                                {item.harga.toLocaleString()}
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
                                className="flex-1 flex items-center justify-center gap-2
                px-4 py-2 rounded-xl
                bg-linear-to-r from-green-600 to-green-500
                text-white shadow-md hover:brightness-110 transition"
                            >
                                <ShoppingCart className="w-4 h-4" /> Pesan
                            </button>
                        </div>
                    </motion.article>
                ))}
            </section>

            {/* DETAIL + KONFIRMASI */}
            <AnimatePresence>
                {detail && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40
            flex items-end md:items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ y: 100 }}
                            animate={{ y: 0 }}
                            exit={{ y: 100 }}
                            transition={{ type: "spring", damping: 25 }}
                            className="bg-white rounded-t-3xl md:rounded-3xl
              p-6 w-full max-w-md shadow-2xl"
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
                                <button
                                    onClick={() => setDetail(null)}
                                    className="flex-1 border rounded-xl py-2"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleOrderSuccess}
                                    className="flex-1 bg-green-600 text-white rounded-xl py-2"
                                >
                                    Konfirmasi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
