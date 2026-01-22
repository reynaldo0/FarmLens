import { Calendar, Droplet, Edit, Map, Plus, TrendingUp, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { lahanData as initialLahanData } from "../../data/lahanData";
import { motion } from "framer-motion";

type Activity = {
    date: string; // ISO
    activity: string;
    note: string;
};

type YieldItem = {
    musim: string;
    hasil: number;
};

type Lahan = {
    id: string | number;
    name: string;
    location: string;
    area: number;
    crop: string;
    variety: string;
    status: "Sehat" | "Waspada" | "Berisiko" | string;
    health: number; // 0-100
    plantDate: string; // ISO
    harvestDate: string; // ISO
    activities: Activity[];
    yieldHistory: YieldItem[];
};

const STORAGE_KEY = "smartfarmer:lahan";

function safeParse<T>(value: string | null, fallback: T): T {
    if (!value) return fallback;
    try {
        return JSON.parse(value) as T;
    } catch {
        return fallback;
    }
}

function uid() {
    // cukup untuk local usage
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

type LahanFormState = Omit<Lahan, "id" | "activities" | "yieldHistory">;

const emptyForm: LahanFormState = {
    name: "",
    location: "",
    area: 0,
    crop: "",
    variety: "",
    status: "Sehat",
    health: 90,
    plantDate: new Date().toISOString().slice(0, 10),
    harvestDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10),
};

function normalizeLahanForSave(lahan: Lahan[]): Lahan[] {
    // Pastikan bentuknya aman saat disimpan
    return lahan.map((x) => ({
        ...x,
        area: Number(x.area) || 0,
        health: Math.max(0, Math.min(100, Number(x.health) || 0)),
        activities: Array.isArray(x.activities) ? x.activities : [],
        yieldHistory: Array.isArray(x.yieldHistory) ? x.yieldHistory : [],
    }));
}

export function ManajemenLahan() {
    const [lahanList, setLahanList] = useState<Lahan[]>([]);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);

    // Modal & form
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [form, setForm] = useState<LahanFormState>(emptyForm);

    // === LOAD dari localStorage saat mount ===
    useEffect(() => {
        const stored = safeParse<Lahan[]>(
            localStorage.getItem(STORAGE_KEY),
            // fallback: data default
            normalizeLahanForSave(initialLahanData as unknown as Lahan[])
        );

        setLahanList(stored);
        setSelectedId(stored[0]?.id ?? null);
    }, []);

    // === SAVE ke localStorage setiap lahanList berubah ===
    useEffect(() => {
        if (!lahanList.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
            return;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeLahanForSave(lahanList)));
    }, [lahanList]);

    const selectedLahan = useMemo(() => {
        return lahanList.find((x) => x.id === selectedId) ?? lahanList[0] ?? null;
    }, [lahanList, selectedId]);

    // kalau selectedId invalid (misal habis delete), auto betulin
    useEffect(() => {
        if (!lahanList.length) {
            setSelectedId(null);
            return;
        }
        const stillExists = lahanList.some((x) => x.id === selectedId);
        if (!stillExists) setSelectedId(lahanList[0].id);
    }, [lahanList, selectedId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Sehat":
                return "bg-green-100 text-green-700 border-green-200";
            case "Waspada":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Berisiko":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const TOTAL_GROWTH_DAYS = 120;

    const calculateDaysToHarvest = (harvestDate: string) => {
        // pakai tanggal hari ini beneran (bukan hardcode)
        const today = new Date();
        const harvest = new Date(harvestDate);
        const diff = Math.ceil((harvest.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };

    const progress = useMemo(() => {
        if (!selectedLahan) return 0;
        return Math.max(
            0,
            Math.min(100, 100 - (calculateDaysToHarvest(selectedLahan.harvestDate) / TOTAL_GROWTH_DAYS) * 100)
        );
    }, [selectedLahan]);

    // ===== CRUD Actions =====
    const openCreate = () => {
        setMode("create");
        setForm(emptyForm);
        setIsModalOpen(true);
    };

    const openEdit = () => {
        if (!selectedLahan) return;
        setMode("edit");
        const { id, activities, yieldHistory, ...rest } = selectedLahan;
        setForm({
            ...rest,
            area: Number(rest.area) || 0,
            health: Number(rest.health) || 0,
            plantDate: (rest.plantDate || "").slice(0, 10),
            harvestDate: (rest.harvestDate || "").slice(0, 10),
        });
        setIsModalOpen(true);
    };

    const createLahan = () => {
        const newLahan: Lahan = {
            id: uid(),
            ...form,
            area: Number(form.area) || 0,
            health: Math.max(0, Math.min(100, Number(form.health) || 0)),
            plantDate: form.plantDate,
            harvestDate: form.harvestDate,
            // default
            activities: [],
            yieldHistory: [
                { musim: "M1", hasil: 0 },
                { musim: "M2", hasil: 0 },
                { musim: "M3", hasil: 0 },
                { musim: "M4", hasil: 0 },
            ],
        };
        setLahanList((prev) => [newLahan, ...prev]);
        setSelectedId(newLahan.id);
        setIsModalOpen(false);
    };

    const updateLahan = () => {
        if (!selectedLahan) return;
        setLahanList((prev) =>
            prev.map((x) =>
                x.id === selectedLahan.id
                    ? {
                        ...x,
                        ...form,
                        area: Number(form.area) || 0,
                        health: Math.max(0, Math.min(100, Number(form.health) || 0)),
                        plantDate: form.plantDate,
                        harvestDate: form.harvestDate,
                    }
                    : x
            )
        );
        setIsModalOpen(false);
    };

    const deleteLahan = () => {
        if (!selectedLahan) return;
        const ok = confirm(`Hapus lahan "${selectedLahan.name}"?`);
        if (!ok) return;
        setLahanList((prev) => prev.filter((x) => x.id !== selectedLahan.id));
    };

    const resetToSeed = () => {
        const ok = confirm("Reset data lahan ke default? (localStorage akan ditimpa)");
        if (!ok) return;
        const seed = normalizeLahanForSave(initialLahanData as unknown as Lahan[]);
        setLahanList(seed);
        setSelectedId(seed[0]?.id ?? null);
    };

    const onChange = (key: keyof LahanFormState, value: any) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    if (!selectedLahan) {
        return (
            <div className="p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-700">Belum ada data lahan.</p>
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={openCreate}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:brightness-110 transition"
                    >
                        Tambah Lahan
                    </button>
                    <button
                        onClick={resetToSeed}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        Reset Data Default
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-linear-to-br from-green-50 via-white to-green-100 border border-green-200 p-6 flex items-center justify-between"
            >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-green-700">🗺️ Digital Farm Management</p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Manajemen Lahan</h2>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Pencatatan dan monitoring seluruh lahan pertanian secara digital & real-time
                    </p>

                    <button
                        onClick={resetToSeed}
                        className="mt-3 text-xs text-gray-600 underline hover:text-gray-900"
                        type="button"
                    >
                        Reset ke data default
                    </button>
                </div>

                <button
                    onClick={openCreate}
                    className="relative z-10 px-5 py-3 bg-linear-to-r from-green-600 to-green-500 text-white rounded-xl shadow-md hover:brightness-110 transition flex items-center gap-2"
                    type="button"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Tambah Lahan</span>
                </button>
            </motion.div>

            {/* Overview Stats (contoh sederhana, bisa kamu hitung dinamis) */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-2">
                        <Map className="w-8 h-8 text-green-600" />
                        <span className="text-2xl text-gray-900">{lahanList.length}</span>
                    </div>
                    <p className="text-gray-600">Total Lahan</p>
                    <p className="text-xs text-gray-500 mt-1">
                        {lahanList.reduce((acc, x) => acc + (Number(x.area) || 0), 0).toFixed(1)} hektar
                    </p>
                </motion.div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl text-gray-900">
                            {lahanList.reduce((acc, x) => {
                                const last = x.yieldHistory?.[x.yieldHistory.length - 1]?.hasil ?? 0;
                                return acc + Number(last || 0);
                            }, 0).toFixed(1)}
                        </span>
                    </div>
                    <p className="text-gray-600">Est. Panen Total</p>
                    <p className="text-xs text-gray-500 mt-1">ton (musim terakhir)</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8 text-amber-600" />
                        <span className="text-2xl text-gray-900">
                            {Math.round(
                                lahanList.reduce((acc, x) => acc + Math.max(0, calculateDaysToHarvest(x.harvestDate)), 0) /
                                Math.max(1, lahanList.length)
                            )}
                        </span>
                    </div>
                    <p className="text-gray-600">Rata-rata Hari ke Panen</p>
                    <p className="text-xs text-gray-500 mt-1">dari {lahanList.length} lahan</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Droplet className="w-8 h-8 text-cyan-600" />
                        <span className="text-2xl text-gray-900">
                            {Math.round(lahanList.reduce((acc, x) => acc + (Number(x.health) || 0), 0) / Math.max(1, lahanList.length))}
                            %
                        </span>
                    </div>
                    <p className="text-gray-600">Kesehatan Rata-rata</p>
                    <p className="text-xs text-green-600 mt-1">↑ Baik</p>
                </div>
            </div>

            {/* Lahan List & Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* List */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Daftar Lahan</h3>
                    <div className="space-y-3">
                        {lahanList.map((lahan) => (
                            <motion.button
                                key={lahan.id}
                                onClick={() => setSelectedId(lahan.id)}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className={`w-full text-left p-4 rounded-2xl border transition-all
                  ${selectedLahan.id === lahan.id
                                        ? "border-green-500 bg-green-50 shadow-md"
                                        : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                                    }`}
                                type="button"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-gray-900">{lahan.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {lahan.crop} • {lahan.area} ha
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(lahan.status)}`}>
                                        {lahan.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full ${lahan.health >= 90 ? "bg-green-500" : lahan.health >= 75 ? "bg-amber-500" : "bg-red-500"
                                                }`}
                                            style={{ width: `${lahan.health}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600">{lahan.health}%</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-gray-900">{selectedLahan.name}</h3>
                                <p className="text-gray-600 mt-1">{selectedLahan.location}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={openEdit}
                                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    type="button"
                                >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>

                                <button
                                    onClick={deleteLahan}
                                    className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Hapus</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Luas Lahan</p>
                                <p className="text-gray-900">{selectedLahan.area} ha</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Komoditas</p>
                                <p className="text-gray-900">{selectedLahan.crop}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Varietas</p>
                                <p className="text-gray-900">{selectedLahan.variety}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Kesehatan</p>
                                <p
                                    className={`${selectedLahan.health >= 90 ? "text-green-600" : selectedLahan.health >= 75 ? "text-amber-600" : "text-red-600"
                                        }`}
                                >
                                    {selectedLahan.health}%
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tanggal Tanam</p>
                                <p className="text-gray-900">
                                    {new Date(selectedLahan.plantDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Estimasi Panen</p>
                                <p className="text-gray-900">
                                    {new Date(selectedLahan.harvestDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-sm text-gray-600 mb-2">Progress ke Panen</p>
                                <div className="bg-gray-200 rounded-full h-3">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="bg-green-500 h-3 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{calculateDaysToHarvest(selectedLahan.harvestDate)} hari lagi</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Activity History */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Riwayat Aktivitas Terkini</h3>
                        <div className="space-y-3">
                            {(selectedLahan.activities || []).map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-gray-900">{activity.activity}</p>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {new Date(activity.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{activity.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            type="button"
                        >
                            Lihat Semua Riwayat
                        </button>
                    </div>

                    {/* Yield Trend */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Tren Hasil Panen (4 Musim Terakhir)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={selectedLahan.yieldHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="musim" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} label={{ value: "Ton", angle: -90, position: "insideLeft" }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "8px",
                                    }}
                                />
                                <Bar dataKey="hasil" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-900">
                                📈 Peningkatan produktivitas{" "}
                                {selectedLahan.yieldHistory?.length >= 2
                                    ? (
                                        ((selectedLahan.yieldHistory[selectedLahan.yieldHistory.length - 1].hasil -
                                            selectedLahan.yieldHistory[0].hasil) /
                                            Math.max(1, selectedLahan.yieldHistory[0].hasil)) *
                                        100
                                    ).toFixed(1)
                                    : "0.0"}
                                % dalam 1 tahun terakhir
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Modal Create/Edit ===== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/30" onClick={() => setIsModalOpen(false)} />
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="relative w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-xl p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-gray-900 text-lg font-semibold">
                                    {mode === "create" ? "Tambah Lahan" : "Edit Lahan"}
                                </h3>
                                <p className="text-sm text-gray-600">Data akan tersimpan otomatis ke localStorage.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                                type="button"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-600">Nama Lahan</label>
                                <input
                                    value={form.name}
                                    onChange={(e) => onChange("name", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Contoh: Lahan A"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Lokasi</label>
                                <input
                                    value={form.location}
                                    onChange={(e) => onChange("location", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Contoh: Sleman, DIY"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Luas (ha)</label>
                                <input
                                    type="number"
                                    value={form.area}
                                    onChange={(e) => onChange("area", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Komoditas</label>
                                <input
                                    value={form.crop}
                                    onChange={(e) => onChange("crop", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Contoh: Padi"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Varietas</label>
                                <input
                                    value={form.variety}
                                    onChange={(e) => onChange("variety", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Contoh: IR64"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Status</label>
                                <select
                                    value={form.status}
                                    onChange={(e) => onChange("status", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="Sehat">Sehat</option>
                                    <option value="Waspada">Waspada</option>
                                    <option value="Berisiko">Berisiko</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Kesehatan (%)</label>
                                <input
                                    type="number"
                                    value={form.health}
                                    onChange={(e) => onChange("health", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    min={0}
                                    max={100}
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Tanggal Tanam</label>
                                <input
                                    type="date"
                                    value={form.plantDate}
                                    onChange={(e) => onChange("plantDate", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-600">Estimasi Panen</label>
                                <input
                                    type="date"
                                    value={form.harvestDate}
                                    onChange={(e) => onChange("harvestDate", e.target.value)}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                type="button"
                            >
                                Batal
                            </button>
                            {mode === "create" ? (
                                <button
                                    onClick={createLahan}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:brightness-110"
                                    type="button"
                                >
                                    Simpan
                                </button>
                            ) : (
                                <button
                                    onClick={updateLahan}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:brightness-110"
                                    type="button"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
