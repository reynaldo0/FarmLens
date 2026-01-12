import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bug,
    AlertTriangle,
    ChevronDown,
    ShieldCheck,
    CloudRain,
    Sun,
} from "lucide-react";

/* ================= TYPES ================= */
type Season = "hujan" | "kemarau";
type RiskLevel = "rendah" | "sedang" | "tinggi";

type Pest = {
    name: string;
    icon: string;
    risk: RiskLevel;
    advice: string;
};

type BmkgDaily = {
    dateISO: string;
    rainMm: number;
};

/* ================= LOGIC ================= */
function detectSeasonFromBmkg(days: BmkgDaily[]): Season {
    const avgRain =
        days.reduce((s, d) => s + d.rainMm, 0) / Math.max(days.length, 1);

    // heuristic Indonesia: >5mm rata-rata = hujan
    return avgRain >= 5 ? "hujan" : "kemarau";
}

function getPests(season: Season, plant: string): Pest[] {
    if (season === "hujan") {
        return [
            {
                name: "Ulat Daun",
                icon: "🐛",
                risk: "sedang",
                advice: "Periksa daun setiap pagi dan lakukan sanitasi daun rusak.",
            },
            {
                name: "Jamur Daun",
                icon: "🍄",
                risk: "tinggi",
                advice: "Tingkatkan sirkulasi udara dan hindari penyiraman berlebih.",
            },
            {
                name: "Thrips",
                icon: "🪲",
                risk: plant === "cabai" ? "tinggi" : "sedang",
                advice: "Gunakan perangkap kuning dan semprot neem oil tiap 7 hari.",
            },
        ];
    }

    return [
        {
            name: "Tungau",
            icon: "🕷️",
            risk: "tinggi",
            advice: "Jaga kelembaban udara dan semprot air pada bagian bawah daun.",
        },
        {
            name: "Kutu Daun",
            icon: "🐜",
            risk: "sedang",
            advice: "Semprot pestisida nabati (bawang putih / sabun cair) mingguan.",
        },
    ];
}

function riskColor(risk: RiskLevel) {
    return {
        rendah: "bg-green-500",
        sedang: "bg-amber-500",
        tinggi: "bg-red-500",
    }[risk];
}

/* ================= COMPONENT ================= */
export function PestPredictionCard({ plant = "cabai" }: { plant?: string }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [season, setSeason] = useState<Season>("kemarau");
    const [bmkgDays, setBmkgDays] = useState<BmkgDaily[]>([]);

    useEffect(() => {
        fetch("https://farmlens-api.vercel.app/api/bmkg")
            .then((r) => r.json())
            .then((json) => {
                const raw = json?.data?.[0]?.cuaca;
                if (!Array.isArray(raw)) return;

                const flat = raw.flat();
                const byDate: Record<string, number> = {};

                flat.forEach((d: any) => {
                    const date = d.local_datetime.slice(0, 10);
                    byDate[date] = (byDate[date] ?? 0) + (d.tp ?? 0);
                });

                const days: BmkgDaily[] = Object.entries(byDate)
                    .slice(0, 7)
                    .map(([dateISO, rainMm]) => ({ dateISO, rainMm }));

                setBmkgDays(days);
                setSeason(detectSeasonFromBmkg(days));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const pests = useMemo(() => getPests(season, plant), [season, plant]);

    if (loading) {
        return (
            <div className="rounded-3xl bg-white/70 ring-1 ring-black/5 p-6 shadow animate-pulse">
                <div className="h-5 w-40 bg-black/10 rounded" />
                <div className="mt-4 h-4 w-64 bg-black/10 rounded" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white/80 backdrop-blur ring-1 ring-black/5 shadow-xl p-6"
        >
            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <Bug className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Prediksi Hama Musiman
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            {season === "hujan" ? (
                                <CloudRain className="w-4 h-4 text-blue-500" />
                            ) : (
                                <Sun className="w-4 h-4 text-amber-500" />
                            )}
                            Musim {season === "hujan" ? "Hujan" : "Kemarau"} • Data BMKG
                        </p>
                    </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    {plant.toUpperCase()}
                </span>
            </div>

            {/* PEST LIST */}
            <div className="mt-5 space-y-4">
                {pests.map((pest) => (
                    <div key={pest.name} className="rounded-2xl bg-white ring-1 ring-black/5 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{pest.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-900">{pest.name}</p>
                                    <p className="text-xs text-gray-500">Risiko {pest.risk}</p>
                                </div>
                            </div>
                            <AlertTriangle
                                className={`w-5 h-5 ${pest.risk === "tinggi"
                                        ? "text-red-600"
                                        : pest.risk === "sedang"
                                            ? "text-amber-500"
                                            : "text-green-600"
                                    }`}
                            />
                        </div>

                        {/* PROGRESS */}
                        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-2 rounded-full ${riskColor(pest.risk)}`}
                                style={{
                                    width:
                                        pest.risk === "tinggi"
                                            ? "90%"
                                            : pest.risk === "sedang"
                                                ? "60%"
                                                : "30%",
                                }}
                            />
                        </div>

                        {/* ACCORDION */}
                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 text-sm text-gray-600"
                                >
                                    {pest.advice}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* ACTION */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                >
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                    {open ? "Sembunyikan detail" : "Lihat detail pencegahan"}
                </button>

                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Pelajari Pencegahan
                </button>
            </div>
        </motion.div>
    );
}
