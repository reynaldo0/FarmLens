// src/components/sections/MarketplaceShowcaseSection.tsx
import {
    ArrowRight,
    MapPin,
    Package,
    Star,
    Store,
    Tractor,
    Truck
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { listings, partnerStores, supplies } from "../data/marketPlace";


type TabKey = "komoditas" | "perlengkapan" | "toko";

const IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

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

function Pill({
    active,
    onClick,
    icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all border inline-flex items-center gap-2",
                active
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-white/80 text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-200"
            )}
        >
            {icon}
            {label}
        </button>
    );
}

export default function MarketplaceShowcaseSection() {
    const [tab, setTab] = useState<TabKey>("komoditas");

    // Featured logic (top 6)
    const featuredKomoditas = useMemo(() => {
        return [...listings]
            .sort((a, b) => {
                const score = (x: typeof a) =>
                    x.rating * 20 + x.reliabilitas + (x.verified ? 10 : 0) + (x.status === "available" ? 6 : 0);
                return score(b) - score(a);
            })
            .slice(0, 6);
    }, []);

    const featuredSupplies = useMemo(() => {
        return [...supplies]
            .sort((a, b) => b.rating - a.rating || a.estimasiKirimHari - b.estimasiKirimHari)
            .slice(0, 6);
    }, []);

    const featuredStores = useMemo(() => {
        return [...partnerStores].sort((a, b) => b.rating - a.rating).slice(0, 6);
    }, []);

    const [openQuote, setOpenQuote] = useState(false);
    const [selectedStore, setSelectedStore] = useState<(typeof featuredStores)[number] | null>(null);

    function onRequestQuote(store: (typeof featuredStores)[number]) {
        setSelectedStore(store);
        setOpenQuote(true);
    }

    return (
        <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-emerald-50 to-white py-20">
            {/* blobs */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-0 w-96 h-96 bg-green-400 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="grid lg:grid-cols-2 gap-10 items-end">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                Marketplace Showcase
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                Pilihan Terbaik
                            </span>{" "}
                            untuk kebutuhan tani kamu
                        </h2>

                        <p className="text-gray-600 max-w-2xl">
                            Komoditas panen, perlengkapan tani, dan toko mitra dengan rating tinggi kurasi cepat untuk memudahkan kamu memilih.
                        </p>

                        {/* mini stats */}
                        <div className="grid grid-cols-3 gap-6 pt-3">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">{listings.length}</div>
                                <div className="text-sm text-gray-600">Komoditas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">{supplies.length}</div>
                                <div className="text-sm text-gray-600">Perlengkapan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-700">{partnerStores.length}</div>
                                <div className="text-sm text-gray-600">Toko Mitra</div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs + CTA */}
                    <div className="space-y-4 my-10">
                        <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                            <Pill
                                active={tab === "komoditas"}
                                onClick={() => setTab("komoditas")}
                                icon={<Tractor className="w-4 h-4" />}
                                label="Komoditas"
                            />
                            <Pill
                                active={tab === "perlengkapan"}
                                onClick={() => setTab("perlengkapan")}
                                icon={<Package className="w-4 h-4" />}
                                label="Perlengkapan"
                            />
                            <Pill
                                active={tab === "toko"}
                                onClick={() => setTab("toko")}
                                icon={<Store className="w-4 h-4" />}
                                label="Toko Mitra"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tab === "komoditas" &&
                        featuredKomoditas.map((it) => (
                            <div
                                key={it.id}
                                className="group bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-bold text-gray-900 truncate">{it.komoditas}</h3>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600 truncate">{it.petani}</div>
                                        </div>

                                        <Badge tone={it.status === "available" ? "green" : "amber"}>
                                            {it.status === "available" ? "Available" : "Reserved"}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{it.lokasi}</span>
                                        </div>

                                        <div className="rounded-2xl border border-gray-100 p-4">
                                            <div className="flex items-end justify-between gap-3">
                                                <div>
                                                    <div className="text-xs text-gray-500">Harga / kg</div>
                                                    <div className="text-xl font-bold text-green-700">{IDR.format(it.harga)}</div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {it.kualitas} • Volume {it.volume.toFixed(1)} ton
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                                                        <Star className="w-4 h-4 text-amber-500" />
                                                        {it.rating.toFixed(1)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Reliabilitas {it.reliabilitas}%</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}

                    {tab === "perlengkapan" &&
                        featuredSupplies.map((it) => (
                            <div
                                key={it.id}
                                className="group bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-bold text-gray-900 truncate">{it.nama}</h3>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600 truncate">
                                                {it.brand} • <span className="capitalize">{it.kategori}</span>
                                            </div>
                                        </div>

                                        <Badge tone={it.status === "available" ? "green" : "amber"}>
                                            {it.status === "available" ? "Available" : "Reserved"}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{it.lokasi}</span>
                                        </div>

                                        <div className="rounded-2xl border border-gray-100 p-4">
                                            <div className="flex items-end justify-between gap-3">
                                                <div>
                                                    <div className="text-xs text-gray-500">Harga</div>
                                                    <div className="text-xl font-bold text-green-700">{IDR.format(it.harga)}</div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Stok {it.stok} {it.satuan}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="inline-flex items-center gap-1 text-sm font-semibold text-gray-900">
                                                        <Star className="w-4 h-4 text-amber-500" />
                                                        {it.rating.toFixed(1)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 inline-flex items-center gap-1">
                                                        <Truck className="w-3.5 h-3.5" />
                                                        {it.estimasiKirimHari} hari
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}

                    {tab === "toko" &&
                        featuredStores.map((it) => (
                            <div
                                key={it.id}
                                className="group bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 truncate">{it.nama}</h3>
                                            <div className="mt-1 text-sm text-gray-600 truncate">{it.telepon}</div>
                                        </div>

                                        <Badge tone="blue">
                                            <Star className="w-4 h-4" />
                                            {it.rating.toFixed(1)}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{it.alamat}</span>
                                        </div>

                                        {/* CTA Buttons */}
                                        <div className="pt-2 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => onRequestQuote(it)}
                                                className="flex-1 group/btn bg-linear-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
                                            >
                                                Minta Penawaran
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}

                </div>

                {/* Bottom CTA strip */}
                <div className="mt-10 bg-white/70 backdrop-blur rounded-3xl border border-green-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="text-lg font-bold text-gray-900">Mau lihat marketplace lebih detail?</div>
                        <div className="text-sm text-gray-600">
                            Buka marketplace lengkap untuk cari berdasarkan lokasi, status, kategori, dan rating.
                        </div>
                    </div>

                    <Link
                        to="/dashboard/marketplace"
                        className="group bg-linear-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] inline-flex items-center gap-2"
                    >
                        Lihat Semua
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
            {openQuote && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setOpenQuote(false)}
                        aria-label="Tutup"
                    />

                    <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        🤝 Kolaborasi & Penawaran
                                    </div>
                                    <h3 className="mt-3 text-2xl font-bold text-gray-900">
                                        Minta Penawaran
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {selectedStore ? (
                                            <>
                                                Untuk toko: <span className="font-semibold">{selectedStore.nama}</span>
                                            </>
                                        ) : (
                                            "Untuk toko mitra"
                                        )}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOpenQuote(false)}
                                    className="rounded-2xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Tutup
                                </button>
                            </div>

                            <form
                                className="mt-6 space-y-4"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    // ✅ opsi 1: WhatsApp
                                    if (selectedStore) {
                                        const msg = `Halo ${selectedStore.nama}, saya ingin minta penawaran kolaborasi. Mohon info paket/ketentuan kerja sama. Terima kasih.`;
                                        // jika nomor dia format lokal, kamu bisa rapikan jadi 62...
                                        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                                    }

                                    setOpenQuote(false);
                                }}
                            >
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">Nama</label>
                                        <input
                                            required
                                            className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="Nama kamu"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">No. HP / WhatsApp</label>
                                        <input
                                            required
                                            className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Kebutuhan kolaborasi</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="mt-2 w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                        placeholder="Contoh: kerja sama suplai pupuk/benih, distribusi produk, event workshop, dll."
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-linear-to-r from-green-600 to-green-700 text-white px-5 py-3 rounded-2xl font-semibold shadow-sm hover:shadow-md transition-all"
                                    >
                                        Kirim Permintaan
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setOpenQuote(false)}
                                        className="flex-1 bg-white text-green-700 px-5 py-3 rounded-2xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all font-semibold"
                                    >
                                        Batal
                                    </button>
                                </div>

                                {selectedStore?.telepon && (
                                    <div className="text-xs text-gray-500 pt-2">
                                        Kontak toko: <span className="font-semibold">{selectedStore.telepon}</span>
                                    </div>
                                )}
                            </form>
                        </div>

                        <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500" />
                    </div>
                </div>
            )}

        </section>
    );
}
