import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bug,
    AlertTriangle,
    ChevronDown,
    ShieldCheck,
    Info,
} from "lucide-react";
import type { Season } from "../utils/detectSeason";

type RiskLevel = "rendah" | "sedang" | "tinggi";

type Pest = {
    name: string;
    icon: string;
    risk: RiskLevel;
    advice: string;
};

type Props = {
    crop: string;
    lahanStatus: "Sehat" | "Waspada" | "Berisiko";
    season: Season;
};

/* ================= LOGIC ================= */

function getPests(
    season: Season,
    crop: string,
    lahanStatus: "Sehat" | "Waspada" | "Berisiko"
): Pest[] {
    const boost =
        lahanStatus === "Berisiko"
            ? 2
            : lahanStatus === "Waspada"
                ? 1
                : 0;

    const up = (risk: RiskLevel): RiskLevel =>
        boost === 0 ? risk : risk === "rendah" ? "sedang" : "tinggi";

    if (season === "hujan") {
        return [
            {
                name: "Ulat Daun",
                icon: "🐛",
                risk: up("sedang"),
                advice:
                    "Periksa daun setiap pagi. Pangkas daun berlubang dan buang jauh dari lahan.",
            },
            {
                name: "Jamur Daun",
                icon: "🍄",
                risk: up("tinggi"),
                advice:
                    "Kurangi kelembaban berlebih, perbaiki sirkulasi udara, dan hindari penyiraman sore.",
            },
            ...(crop.toLowerCase() === "cabai"
                ? [
                    {
                        name: "Thrips",
                        icon: "🪲",
                        risk: up("tinggi"),
                        advice:
                            "Gunakan perangkap kuning dan semprot neem oil setiap 7 hari.",
                    },
                ]
                : []),
        ];
    }

    return [
        {
            name: "Tungau",
            icon: "🕷️",
            risk: up("tinggi"),
            advice:
                "Jaga kelembaban udara dan semprot air pada bagian bawah daun di pagi hari.",
        },
        {
            name: "Kutu Daun",
            icon: "🐜",
            risk: up("sedang"),
            advice:
                "Gunakan pestisida nabati (bawang putih / sabun cair) mingguan.",
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

function riskPercent(risk: RiskLevel) {
    return risk === "tinggi" ? 90 : risk === "sedang" ? 60 : 30;
}

/* ================= COMPONENT ================= */

export function PestPredictionCard({ crop, lahanStatus, season }: Props) {
    const [open, setOpen] = useState(false);

    const pests = useMemo(
        () => getPests(season, crop, lahanStatus),
        [season, crop, lahanStatus]
    );

    const highestRisk = pests.some((p) => p.risk === "tinggi")
        ? "tinggi"
        : pests.some((p) => p.risk === "sedang")
            ? "sedang"
            : "rendah";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white ring-1 ring-black/5 shadow-xl p-6 space-y-5"
        >
            {/* HEADER */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                        <Bug className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Prediksi Hama Musiman
                        </h3>
                        <p className="text-sm text-gray-500">
                            Tanaman <b>{crop}</b> • Musim{" "}
                            <b>{season === "hujan" ? "Hujan" : "Kemarau"}</b>
                        </p>
                    </div>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${highestRisk === "tinggi"
                        ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                        : highestRisk === "sedang"
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                            : "bg-green-50 text-green-700 ring-1 ring-green-200"
                        }`}
                >
                    Risiko {highestRisk}
                </span>
            </div>

            {/* INSIGHT */}
            <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 p-4 text-sm text-gray-700 flex gap-2">
                <Info className="w-4 h-4 mt-0.5 text-gray-500" />
                <p>
                    Terdeteksi <b>{pests.length} potensi hama</b> pada kondisi saat ini.
                    Risiko dipengaruhi oleh musim <b>{season}</b> dan status lahan{" "}
                    <b>{lahanStatus}</b>.
                </p>
            </div>

            {/* PEST LIST */}
            <div className="space-y-4">
                {pests.map((p) => (
                    <div
                        key={p.name}
                        className="rounded-2xl ring-1 ring-black/5 p-4 bg-white"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-start">
                                <span className="text-2xl">{p.icon}</span>
                                <div>
                                    <p className="font-medium text-gray-900">{p.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Tingkat risiko: <b>{p.risk}</b>
                                    </p>
                                </div>
                            </div>

                            <AlertTriangle
                                className={
                                    p.risk === "tinggi"
                                        ? "text-red-600"
                                        : p.risk === "sedang"
                                            ? "text-amber-500"
                                            : "text-green-600"
                                }
                            />
                        </div>

                        {/* PROGRESS */}
                        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className={`h-2 rounded-full ${riskColor(p.risk)}`}
                                style={{ width: `${riskPercent(p.risk)}%` }}
                            />
                        </div>

                        <AnimatePresence>
                            {open && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 text-sm text-gray-600"
                                >
                                    💡 {p.advice}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* ACTION */}
            <div className="flex justify-between items-center pt-2">
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-700"
                >
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                    {open ? "Sembunyikan detail" : "Lihat detail pencegahan"}
                </button>

                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold flex gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Pelajari Pencegahan
                </button>
            </div>
        </motion.div>
    );
}
