import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
    Plus,
    Package,
    MapPin,
    BadgeCheck,
    Pencil,
    Trash2,
    Eye,
    Archive,
} from "lucide-react";
import { getAuth } from "../../../utils/auth";
import type {
    OwnerListing,
    OwnerListingStatus,
} from "../../../utils/marketplaceOwnerStore";
import {
    addOwnerListing,
    deleteOwnerListing,
    getOwnerListings,
    seedOwnerListingsIfEmpty,
    updateOwnerListing,
} from "../../../utils/marketplaceOwnerStore";

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

const IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

function Chip({
    text,
    tone = "gray",
}: {
    text: string;
    tone?: "gray" | "green" | "amber" | "red" | "blue";
}) {
    const map = {
        gray: "bg-gray-100 text-gray-700 border-gray-200",
        green: "bg-green-100 text-green-700 border-green-200",
        amber: "bg-amber-100 text-amber-700 border-amber-200",
        red: "bg-red-100 text-red-700 border-red-200",
        blue: "bg-blue-100 text-blue-700 border-blue-200",
    } as const;

    return (
        <span className={cx("px-3 py-1 rounded-full text-xs border", map[tone])}>
            {text}
        </span>
    );
}

type FormState = {
    komoditas: string;
    kategori: OwnerListing["kategori"];
    lokasi: string;
    harga: number;
    stok: number;
    satuan: OwnerListing["satuan"];
    kualitas: string;
    deskripsi: string;
    status: OwnerListingStatus;
};

const emptyForm: FormState = {
    komoditas: "",
    kategori: "hasil_tani",
    lokasi: "",
    harga: 0,
    stok: 0,
    satuan: "kg",
    kualitas: "",
    deskripsi: "",
    status: "draft",
};

export default function MarketplaceOwnerPanel() {
    const user = getAuth();

    // ✅ seed + initial load tanpa useEffect
    const [items, setItems] = useState<OwnerListing[]>(() => {
        if (user) seedOwnerListingsIfEmpty(user.id, user.role);
        return getOwnerListings();
    });

    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<OwnerListingStatus | "all">("all");

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<OwnerListing | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);

    // ✅ single refresh (jangan dobel)
    const refresh = () => setItems(getOwnerListings());

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();

        return items.filter((it) => {
            const matchQ =
                !q ||
                it.komoditas.toLowerCase().includes(q) ||
                it.lokasi.toLowerCase().includes(q) ||
                (it.kualitas ?? "").toLowerCase().includes(q);

            const matchStatus = statusFilter === "all" ? true : it.status === statusFilter;

            return matchQ && matchStatus;
        });
    }, [items, query, statusFilter]);

    const stats = useMemo(() => {
        const total = items.length;
        const active = items.filter((x) => x.status === "active").length;
        const draft = items.filter((x) => x.status === "draft").length;
        const archived = items.filter((x) => x.status === "archived").length;
        return { total, active, draft, archived };
    }, [items]);

    function openCreate() {
        setEditing(null);
        setForm(emptyForm);
        setOpen(true);
    }

    function openEdit(it: OwnerListing) {
        setEditing(it);
        setForm({
            komoditas: it.komoditas,
            kategori: it.kategori,
            lokasi: it.lokasi,
            harga: it.harga,
            stok: it.stok,
            satuan: it.satuan,
            kualitas: it.kualitas ?? "",
            deskripsi: it.deskripsi ?? "",
            status: it.status,
        });
        setOpen(true);
    }

    function submit() {
        if (!user) return;

        if (!form.komoditas.trim()) return alert("Komoditas wajib diisi.");
        if (!form.lokasi.trim()) return alert("Lokasi wajib diisi.");
        if (form.harga <= 0) return alert("Harga harus > 0.");
        if (form.stok < 0) return alert("Stok tidak boleh negatif.");

        if (editing) {
            updateOwnerListing(editing.id, {
                komoditas: form.komoditas,
                kategori: form.kategori,
                lokasi: form.lokasi,
                harga: form.harga,
                stok: form.stok,
                satuan: form.satuan,
                kualitas: form.kualitas || undefined,
                deskripsi: form.deskripsi || undefined,
                status: form.status,
            });
        } else {
            addOwnerListing({
                ownerId: user.id,
                ownerRole: user.role,
                komoditas: form.komoditas,
                kategori: form.kategori,
                lokasi: form.lokasi,
                harga: form.harga,
                stok: form.stok,
                satuan: form.satuan,
                kualitas: form.kualitas || undefined,
                deskripsi: form.deskripsi || undefined,
                status: form.status,
            });
        }

        setOpen(false);
        refresh();
    }

    function remove(it: OwnerListing) {
        if (!confirm(`Hapus produk "${it.komoditas}"?`)) return;
        deleteOwnerListing(it.id);
        refresh();
    }

    function quickToggleArchive(it: OwnerListing) {
        updateOwnerListing(it.id, { status: it.status === "archived" ? "active" : "archived" });
        refresh();
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h2 className="text-gray-900">Manajemen Marketplace</h2>
                    <p className="text-gray-500 mt-1">
                        CRUD barang dagangan (hasil tani & kebutuhan tani). Cocok untuk pemilik marketplace.
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Tambah Produk
                </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Package className="w-8 h-8 text-green-600" />
                        <Chip text="Total" tone="green" />
                    </div>
                    <p className="text-2xl text-gray-900">{stats.total}</p>
                    <p className="text-gray-600 mt-1">Produk</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <BadgeCheck className="w-8 h-8 text-blue-600" />
                        <Chip text="Active" tone="blue" />
                    </div>
                    <p className="text-2xl text-gray-900">{stats.active}</p>
                    <p className="text-gray-600 mt-1">Sedang dijual</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Eye className="w-8 h-8 text-amber-600" />
                        <Chip text="Draft" tone="amber" />
                    </div>
                    <p className="text-2xl text-gray-900">{stats.draft}</p>
                    <p className="text-gray-600 mt-1">Belum publish</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Archive className="w-8 h-8 text-gray-600" />
                        <Chip text="Archived" tone="gray" />
                    </div>
                    <p className="text-2xl text-gray-900">{stats.archived}</p>
                    <p className="text-gray-600 mt-1">Diarsipkan</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>Kelola produk untuk toko kamu</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari komoditas / lokasi / kualitas..."
                        className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value as OwnerListingStatus | "all")
                        }
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    >
                        <option value="all">Semua Status</option>
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Daftar Produk</h3>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-gray-700">Produk</th>
                                <th className="text-left py-3 px-4 text-gray-700">Kategori</th>
                                <th className="text-left py-3 px-4 text-gray-700">Lokasi</th>
                                <th className="text-right py-3 px-4 text-gray-700">Harga</th>
                                <th className="text-right py-3 px-4 text-gray-700">Stok</th>
                                <th className="text-center py-3 px-4 text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 text-gray-700">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-10 text-center text-gray-500">
                                        Belum ada produk. Klik <b>Tambah Produk</b> untuk mulai.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((it) => (
                                    <tr key={it.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4">
                                            <div className="text-gray-900">{it.komoditas}</div>
                                            <div className="text-xs text-gray-500">{it.kualitas ?? "—"}</div>
                                        </td>

                                        <td className="py-3 px-4 text-gray-700 capitalize">
                                            {it.kategori.replaceAll("_", " ")}
                                        </td>

                                        <td className="py-3 px-4 text-gray-700">{it.lokasi}</td>

                                        <td className="py-3 px-4 text-right text-gray-900">
                                            {IDR.format(it.harga)}
                                        </td>

                                        <td className="py-3 px-4 text-right text-gray-900">
                                            {it.stok.toLocaleString("id-ID")} {it.satuan}
                                        </td>

                                        <td className="py-3 px-4 text-center">
                                            {it.status === "active" && <Chip text="Active" tone="blue" />}
                                            {it.status === "draft" && <Chip text="Draft" tone="amber" />}
                                            {it.status === "archived" && <Chip text="Archived" tone="gray" />}
                                        </td>

                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEdit(it)}
                                                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm inline-flex items-center gap-2"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => quickToggleArchive(it)}
                                                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm inline-flex items-center gap-2"
                                                >
                                                    <Archive className="w-4 h-4" />
                                                    {it.status === "archived" ? "Unarchive" : "Archive"}
                                                </button>

                                                <button
                                                    onClick={() => remove(it)}
                                                    className="px-3 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm inline-flex items-center gap-2"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Add/Edit */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.button
                            type="button"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/30 z-40"
                            aria-label="Close"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.18 }}
                            className="fixed z-50 inset-x-0 top-16 sm:top-20 mx-auto w-[94%] max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <div>
                                    <div className="text-gray-900 font-semibold">
                                        {editing ? "Edit Produk" : "Tambah Produk Baru"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Isi data dengan jelas agar produk mudah ditemukan.
                                    </div>
                                </div>

                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                                >
                                    Tutup
                                </button>
                            </div>

                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">Nama Produk / Komoditas</label>
                                    <input
                                        value={form.komoditas}
                                        onChange={(e) => setForm((p) => ({ ...p, komoditas: e.target.value }))}
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="Contoh: Kopi Arabika, Cabai Merah, Pupuk Organik..."
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Kategori</label>
                                    <select
                                        value={form.kategori}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                kategori: e.target.value as OwnerListing["kategori"],
                                            }))
                                        }
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                    >
                                        <option value="hasil_tani">Hasil Tani</option>
                                        <option value="bibit">Bibit</option>
                                        <option value="pupuk">Pupuk</option>
                                        <option value="alat">Alat</option>
                                        <option value="lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                status: e.target.value as OwnerListingStatus,
                                            }))
                                        }
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">Lokasi</label>
                                    <input
                                        value={form.lokasi}
                                        onChange={(e) => setForm((p) => ({ ...p, lokasi: e.target.value }))}
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="Contoh: Brebes, Jawa Tengah"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Harga / unit</label>
                                    <input
                                        type="number"
                                        value={form.harga}
                                        onChange={(e) => setForm((p) => ({ ...p, harga: Number(e.target.value) }))}
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Satuan</label>
                                    <select
                                        value={form.satuan}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                satuan: e.target.value as OwnerListing["satuan"],
                                            }))
                                        }
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="ton">ton</option>
                                        <option value="pcs">pcs</option>
                                        <option value="pak">pak</option>
                                        <option value="meter">meter</option>
                                        <option value="botol">botol</option>
                                        <option value="lainnya">lainnya</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Stok</label>
                                    <input
                                        type="number"
                                        value={form.stok}
                                        onChange={(e) => setForm((p) => ({ ...p, stok: Number(e.target.value) }))}
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-700">Kualitas (opsional)</label>
                                    <input
                                        value={form.kualitas}
                                        onChange={(e) => setForm((p) => ({ ...p, kualitas: e.target.value }))}
                                        className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="Grade A / Premium"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-sm text-gray-700">Deskripsi (opsional)</label>
                                    <textarea
                                        value={form.deskripsi}
                                        onChange={(e) => setForm((p) => ({ ...p, deskripsi: e.target.value }))}
                                        className="mt-1 w-full min-h-[100px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                                        placeholder="Tulis detail singkat: kondisi, panen, minimal order, dll."
                                    />
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={submit}
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                                >
                                    {editing ? "Simpan Perubahan" : "Tambah Produk"}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
