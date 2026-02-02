import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    Bug,
    Calendar,
    CheckCircle2,
    Clock,
    Droplet,
    Sprout,
    Sun,
    X,
    Bell,
    MessageSquareText,
} from "lucide-react";

type Priority = "urgent" | "high" | "medium" | "low" | "info";
type Status = "pending" | "scheduled" | "upcoming" | "ongoing";
type CompletedTask = { id: string; title: string; meta: string; dateISO: string };

type Recommendation = {
    id: number;
    priority: Priority;
    title: string;
    location: string;
    action: string;
    reason: string;
    deadline: string;
    icon: React.ReactNode;
    status: Status;
};

type WeatherItem = {
    day: string;
    date: string;
    weather: string;
    temp: string;
    rain: string;
    suitable: boolean;
};

type Reminder = {
    id: string;
    title: string;
    when: string; // bebas (string)
    note?: string;
    createdAt: string;
};

type Consultation = {
    id: string;
    topic: string;
    field: string;
    message: string;
    createdAt: string;
};

const STORAGE_KEYS = {
    completed: "farmlens_completed_tasks_v1",
    reminders: "farmlens_reminders_v1",
    consults: "farmlens_consults_v1",
};

const initialRecommendations: Recommendation[] = [
    {
        id: 1,
        priority: "urgent",
        title: "Penyiraman Intensif",
        location: "Lahan C - Cabai",
        action: "Tingkatkan frekuensi penyiraman menjadi 2x sehari (pagi & sore)",
        reason: "Suhu tinggi (>32°C) terdeteksi, tanaman membutuhkan kelembaban ekstra",
        deadline: "Hari ini",
        icon: <Droplet className="w-5 h-5" />,
        status: "pending",
    },
    {
        id: 2,
        priority: "high",
        title: "Aplikasi Fungisida",
        location: "Lahan C - Cabai",
        action: "Semprot fungisida berbahan aktif mankozeb 80% dengan dosis 2g/liter",
        reason: "Deteksi bercak daun pada analisis terakhir",
        deadline: "Besok pagi (06:00-09:00)",
        icon: <Bug className="w-5 h-5" />,
        status: "pending",
    },
    {
        id: 3,
        priority: "medium",
        title: "Pemupukan Susulan",
        location: "Lahan A & B",
        action: "Aplikasi pupuk NPK 15-15-15 sebanyak 50 kg (25 kg per lahan)",
        reason: "Fase pertumbuhan vegetatif memerlukan nutrisi tambahan",
        deadline: "30 Juni 2025",
        icon: <Sprout className="w-5 h-5" />,
        status: "scheduled",
    },
    {
        id: 4,
        priority: "low",
        title: "Penyiangan Gulma",
        location: "Lahan D - Tomat",
        action: "Bersihkan gulma di sekitar tanaman, terutama area parit",
        reason: "Gulma dapat menjadi inang hama dan bersaing nutrisi",
        deadline: "3 Juli 2025",
        icon: <Sun className="w-5 h-5" />,
        status: "upcoming",
    },
    {
        id: 5,
        priority: "info",
        title: "Monitoring Rutin",
        location: "Semua Lahan",
        action: "Lakukan inspeksi visual harian untuk deteksi dini masalah",
        reason: "Pencegahan lebih baik daripada penanganan",
        deadline: "Setiap hari",
        icon: <Calendar className="w-5 h-5" />,
        status: "ongoing",
    },
];

const weatherSchedule: WeatherItem[] = [
    { day: "Hari ini", date: "29 Jun", weather: "Cerah", temp: "28-34°C", rain: "10%", suitable: true },
    { day: "Besok", date: "30 Jun", weather: "Cerah", temp: "27-33°C", rain: "15%", suitable: true },
    { day: "Lusa", date: "1 Jul", weather: "Hujan", temp: "24-28°C", rain: "80%", suitable: false },
    { day: "Rabu", date: "2 Jul", weather: "Hujan", temp: "23-27°C", rain: "75%", suitable: false },
    { day: "Kamis", date: "3 Jul", weather: "Berawan", temp: "25-30°C", rain: "30%", suitable: true },
];

function cx(...classes: Array<string | false | undefined | null>) {
    return classes.filter(Boolean).join(" ");
}

function safeParse<T>(raw: string | undefined, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

function uid(prefix = "id") {
    return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function ModalShell({
    open,
    title,
    subtitle,
    children,
    onClose,
    footer,
}: {
    open: boolean;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    onClose: () => void;
    footer?: React.ReactNode;
}) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.button
                        type="button"
                        onClick={onClose}
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
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <div>
                                <div className="text-gray-900 font-semibold">{title}</div>
                                {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
                            </div>
                            <button
                                onClick={onClose}
                                className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm inline-flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Tutup
                            </button>
                        </div>

                        <div className="p-6">{children}</div>

                        {footer && <div className="px-6 py-4 border-t border-gray-200">{footer}</div>}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export function RekomendasiAgronomi() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>(initialRecommendations);

    // ✅ Completed tasks (persist)
    const [completed, setCompleted] = useState<CompletedTask[]>(() =>
        safeParse<CompletedTask[]>(localStorage.getItem(STORAGE_KEYS.completed) ?? undefined, [
            { id: uid("done"), title: "Pemupukan Dasar", meta: "Lahan A & B • 25 Jun", dateISO: new Date().toISOString() },
            { id: uid("done"), title: "Penyiangan Gulma", meta: "Lahan C • 24 Jun", dateISO: new Date().toISOString() },
            { id: uid("done"), title: "Inspeksi Hama", meta: "Semua Lahan • 23 Jun", dateISO: new Date().toISOString() },
        ])
    );

    // ✅ Reminders + Consultation (persist)
    const [reminders, setReminders] = useState<Reminder[]>(() =>
        safeParse<Reminder[]>(localStorage.getItem(STORAGE_KEYS.reminders) ?? undefined, [])
    );
    const [consults, setConsults] = useState<Consultation[]>(() =>
        safeParse<Consultation[]>(localStorage.getItem(STORAGE_KEYS.consults) ?? undefined, [])
    );

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.completed, JSON.stringify(completed));
    }, [completed]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.reminders, JSON.stringify(reminders));
    }, [reminders]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.consults, JSON.stringify(consults));
    }, [consults]);

    // ========= MODALS =========
    const [openLog, setOpenLog] = useState(false);
    const [openReminder, setOpenReminder] = useState(false);
    const [openConsult, setOpenConsult] = useState(false);

    // Form states
    const [logTitle, setLogTitle] = useState("");
    const [logMeta, setLogMeta] = useState("");

    const [remTitle, setRemTitle] = useState("");
    const [remWhen, setRemWhen] = useState("");
    const [remNote, setRemNote] = useState("");

    const [conTopic, setConTopic] = useState("");
    const [conField, setConField] = useState("");
    const [conMsg, setConMsg] = useState("");

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case "urgent":
                return "border-red-300 bg-red-50";
            case "high":
                return "border-amber-300 bg-amber-50";
            case "medium":
                return "border-blue-300 bg-blue-50";
            case "low":
                return "border-green-300 bg-green-50";
            default:
                return "border-gray-300 bg-gray-50";
        }
    };

    const getPriorityBadge = (priority: Priority) => {
        switch (priority) {
            case "urgent":
                return "bg-red-100 text-red-700 border-red-200";
            case "high":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "medium":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "low":
                return "bg-green-100 text-green-700 border-green-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    // ========= ACTIONS =========
    function markDone(rec: Recommendation) {
        // pindahkan ke completed
        const meta = `${rec.location} • ${rec.deadline}`;
        const newDone: CompletedTask = {
            id: uid("done"),
            title: rec.title,
            meta,
            dateISO: new Date().toISOString(),
        };
        setCompleted((prev) => [newDone, ...prev].slice(0, 12)); // keep last 12

        // remove dari list rekomendasi
        setRecommendations((prev) => prev.filter((x) => x.id !== rec.id));
    }

    function submitLog() {
        if (!logTitle.trim()) {
            alert("Nama aktivitas wajib diisi.");
            return;
        }
        const task: CompletedTask = {
            id: uid("done"),
            title: logTitle.trim(),
            meta: logMeta.trim() ? logMeta.trim() : "Aktivitas dicatat manual",
            dateISO: new Date().toISOString(),
        };
        setCompleted((prev) => [task, ...prev].slice(0, 12));
        setLogTitle("");
        setLogMeta("");
        setOpenLog(false);
    }

    function submitReminder() {
        if (!remTitle.trim()) return alert("Judul pengingat wajib diisi.");
        if (!remWhen.trim()) return alert("Waktu/jadwal pengingat wajib diisi.");

        const r: Reminder = {
            id: uid("rem"),
            title: remTitle.trim(),
            when: remWhen.trim(),
            note: remNote.trim() ? remNote.trim() : undefined,
            createdAt: new Date().toISOString(),
        };
        setReminders((prev) => [r, ...prev]);
        setRemTitle("");
        setRemWhen("");
        setRemNote("");
        setOpenReminder(false);

        alert("Pengingat tersimpan ✅ (disimpan di localStorage)");
    }

    function submitConsult() {
        if (!conTopic.trim()) return alert("Topik konsultasi wajib diisi.");
        if (!conField.trim()) return alert("Lahan/Lokasi wajib diisi.");
        if (!conMsg.trim()) return alert("Pesan wajib diisi.");

        const c: Consultation = {
            id: uid("con"),
            topic: conTopic.trim(),
            field: conField.trim(),
            message: conMsg.trim(),
            createdAt: new Date().toISOString(),
        };
        setConsults((prev) => [c, ...prev]);
        setConTopic("");
        setConField("");
        setConMsg("");
        setOpenConsult(false);

        alert("Permintaan konsultasi terkirim ✅ (mock, tersimpan di localStorage)");
    }

    // ========= STATS =========
    const summary = useMemo(() => {
        const urgent = recommendations.filter((r) => r.priority === "urgent" || r.priority === "high").length;
        const scheduled = recommendations.filter((r) => r.status === "scheduled").length;
        const done7d = completed.length; // mock: count shown
        const ongoing = recommendations.filter((r) => r.status === "ongoing").length;
        return { urgent, scheduled, done7d, ongoing };
    }, [recommendations, completed]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-green-200
             bg-gradient-to-br from-green-50 via-white to-green-100 p-6"
            >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-green-700">🌱 Smart Agronomy Recommendation</p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Rekomendasi Agronomi</h2>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Panduan tindakan berbasis kondisi lahan, cuaca, dan analisis AI untuk hasil panen optimal.
                    </p>
                </div>
            </motion.div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-4 shadow-sm"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Mendesak</p>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-700">{summary.urgent}</span>
                        </div>
                    </div>
                </motion.div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Terjadwal</p>
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700">{summary.scheduled}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Selesai (terakhir)</p>
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700">{summary.done7d}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Berkelanjutan</p>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-700">{summary.ongoing}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recommendations List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Daftar Rekomendasi</h3>

                        <div className="space-y-3">
                            {recommendations.length === 0 ? (
                                <div className="py-10 text-center text-gray-500">
                                    Semua rekomendasi sudah ditandai selesai ✅
                                </div>
                            ) : (
                                recommendations.map((rec) => (
                                    <motion.div
                                        key={rec.id}
                                        whileHover={{ y: -3 }}
                                        transition={{ type: "spring", stiffness: 250, damping: 22 }}
                                        className={cx("border rounded-2xl p-4 shadow-sm hover:shadow-lg", getPriorityColor(rec.priority))}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={cx(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                                    rec.priority === "urgent"
                                                        ? "bg-red-200 text-red-700"
                                                        : rec.priority === "high"
                                                            ? "bg-amber-200 text-amber-700"
                                                            : rec.priority === "medium"
                                                                ? "bg-blue-200 text-blue-700"
                                                                : rec.priority === "low"
                                                                    ? "bg-green-200 text-green-700"
                                                                    : "bg-gray-200 text-gray-700"
                                                )}
                                            >
                                                {rec.icon}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <div>
                                                        <p className="text-gray-900">{rec.title}</p>
                                                        <p className="text-sm text-gray-600">{rec.location}</p>
                                                    </div>

                                                    <span className={cx("px-3 py-1 rounded-full text-xs font-medium border", getPriorityBadge(rec.priority))}>
                                                        {rec.priority === "urgent"
                                                            ? "Mendesak"
                                                            : rec.priority === "high"
                                                                ? "Tinggi"
                                                                : rec.priority === "medium"
                                                                    ? "Sedang"
                                                                    : rec.priority === "low"
                                                                        ? "Rendah"
                                                                        : "Info"}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-700 mb-2">{rec.action}</p>

                                                <div className="flex items-center gap-4 text-xs text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <AlertTriangle className="w-3 h-3" />
                                                        <span>{rec.reason}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-300">
                                                    <Clock className="w-4 h-4 text-gray-500" />
                                                    <span className="text-sm text-gray-700">Target: {rec.deadline}</span>

                                                    <button
                                                        onClick={() => markDone(rec)}
                                                        className="ml-auto px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm inline-flex items-center gap-2"
                                                        type="button"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                        Tandai Selesai
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Saved Reminders / Consultation quick view */}
                    {(reminders.length > 0 || consults.length > 0) && (
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h3 className="text-gray-900 mb-4">Catatan Tersimpan</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Bell className="w-4 h-4 text-amber-600" />
                                        <p className="text-gray-900">Pengingat</p>
                                        <span className="ml-auto text-xs text-gray-500">{reminders.length}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {reminders.slice(0, 3).map((r) => (
                                            <div key={r.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="text-sm text-gray-900">{r.title}</div>
                                                <div className="text-xs text-gray-600 mt-1">⏰ {r.when}</div>
                                            </div>
                                        ))}
                                        {reminders.length === 0 && <div className="text-sm text-gray-500">Belum ada pengingat.</div>}
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquareText className="w-4 h-4 text-blue-600" />
                                        <p className="text-gray-900">Konsultasi</p>
                                        <span className="ml-auto text-xs text-gray-500">{consults.length}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {consults.slice(0, 3).map((c) => (
                                            <div key={c.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <div className="text-sm text-gray-900">{c.topic}</div>
                                                <div className="text-xs text-gray-600 mt-1">📍 {c.field}</div>
                                            </div>
                                        ))}
                                        {consults.length === 0 && <div className="text-sm text-gray-500">Belum ada konsultasi.</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Weather & Schedule */}
                <div className="space-y-6">
                    {/* Weather Forecast */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-6 shadow-sm"
                    >
                        <h3 className="text-gray-900 mb-4">Prakiraan Cuaca 5 Hari</h3>

                        <div className="space-y-3">
                            {weatherSchedule.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={cx(
                                        "p-3 rounded-lg border",
                                        day.suitable ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                                    )}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="text-sm text-gray-900">{day.day}</p>
                                            <p className="text-xs text-gray-600">{day.date}</p>
                                        </div>

                                        <div
                                            className={cx(
                                                "px-2 py-1 rounded-full text-xs",
                                                day.suitable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            )}
                                        >
                                            {day.suitable ? "Cocok" : "Tidak Cocok"}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-600 space-y-1">
                                        <p>Cuaca: {day.weather}</p>
                                        <p>Suhu: {day.temp}</p>
                                        <p>Hujan: {day.rain}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
                            💡 Hindari penyemprotan pestisida saat hujan. Aplikasi pupuk cair lebih efektif saat cuaca cerah.
                        </p>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Aksi Cepat</h3>

                        <div className="space-y-2">
                            <button
                                onClick={() => setOpenLog(true)}
                                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left flex items-center gap-3"
                                type="button"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Catat Aktivitas Hari Ini</span>
                            </button>

                            <button
                                onClick={() => setOpenReminder(true)}
                                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                                type="button"
                            >
                                <Calendar className="w-5 h-5" />
                                <span>Atur Pengingat</span>
                            </button>

                            <button
                                onClick={() => setOpenConsult(true)}
                                className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                                type="button"
                            >
                                <Sprout className="w-5 h-5" />
                                <span>Konsultasi Penyuluh</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Aktivitas Selesai (Terbaru)</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {completed.slice(0, 9).map((it) => (
                        <div
                            key={it.id}
                            className="p-4 bg-gray-50/80 rounded-2xl border border-gray-200 hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <CheckCircle2 className="w-5 h-5" />
                                <p className="text-gray-900">{it.title}</p>
                            </div>
                            <p className="text-sm text-gray-600">{it.meta}</p>
                            <p className="text-xs text-gray-400 mt-2">
                                {new Date(it.dateISO).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                            </p>
                        </div>
                    ))}
                    {completed.length === 0 && (
                        <div className="py-10 text-center text-gray-500 col-span-full">Belum ada aktivitas selesai.</div>
                    )}
                </div>
            </div>

            {/* ===== MODALS ===== */}
            <ModalShell
                open={openLog}
                onClose={() => setOpenLog(false)}
                title="Catat Aktivitas Hari Ini"
                subtitle="Tambahkan aktivitas yang sudah kamu lakukan (manual)."
                footer={
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={() => setOpenLog(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                            type="button"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitLog}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                            type="button"
                        >
                            Simpan
                        </button>
                    </div>
                }
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Nama Aktivitas</label>
                        <input
                            value={logTitle}
                            onChange={(e) => setLogTitle(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Penyiraman pagi, pemangkasan, cek daun..."
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Catatan Singkat</label>
                        <input
                            value={logMeta}
                            onChange={(e) => setLogMeta(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Lahan C • selesai jam 07:30"
                        />
                    </div>
                </div>
            </ModalShell>

            <ModalShell
                open={openReminder}
                onClose={() => setOpenReminder(false)}
                title="Atur Pengingat"
                subtitle="Pengingat disimpan di localStorage (mock)."
                footer={
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={() => setOpenReminder(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                            type="button"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitReminder}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                            type="button"
                        >
                            Simpan Pengingat
                        </button>
                    </div>
                }
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Judul Pengingat</label>
                        <input
                            value={remTitle}
                            onChange={(e) => setRemTitle(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Semprot fungisida"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Kapan?</label>
                        <input
                            value={remWhen}
                            onChange={(e) => setRemWhen(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Besok 07:00 / Jumat sore / 30 Juni 2025"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Catatan (opsional)</label>
                        <textarea
                            value={remNote}
                            onChange={(e) => setRemNote(e.target.value)}
                            className="mt-1 w-full min-h-[90px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: dosis 2g/liter, semprot jam 06:00-09:00"
                        />
                    </div>
                </div>
            </ModalShell>

            <ModalShell
                open={openConsult}
                onClose={() => setOpenConsult(false)}
                title="Konsultasi Penyuluh"
                subtitle="Ini mock request: tersimpan di localStorage (tanpa backend)."
                footer={
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={() => setOpenConsult(false)}
                            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm"
                            type="button"
                        >
                            Batal
                        </button>
                        <button
                            onClick={submitConsult}
                            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                            type="button"
                        >
                            Kirim
                        </button>
                    </div>
                }
            >
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Topik</label>
                        <input
                            value={conTopic}
                            onChange={(e) => setConTopic(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Bercak daun pada cabai"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Lahan / Lokasi</label>
                        <input
                            value={conField}
                            onChange={(e) => setConField(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Contoh: Lahan C - Cabai (Brebes)"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="text-sm text-gray-700">Pesan</label>
                        <textarea
                            value={conMsg}
                            onChange={(e) => setConMsg(e.target.value)}
                            className="mt-1 w-full min-h-[110px] px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                            placeholder="Ceritakan gejala, kapan muncul, tindakan yang sudah dilakukan, dll."
                        />
                    </div>

                </div>
            </ModalShell>
        </div>
    );
}
