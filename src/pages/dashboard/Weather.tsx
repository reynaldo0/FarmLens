import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
    CloudRain,
    CloudSun,
    CloudLightning,
    Sun,
    Wind,
    Droplets,
    ThermometerSun,
    Sparkles,
} from "lucide-react";

/* ================= TYPES ================= */

type RiskLevel = "aman" | "waspada" | "bahaya";
type Condition = "cerah" | "berawan" | "hujan" | "badai" | "panas_ekstrem";

type DailyForecast = {
    dateISO: string;
    condition: Condition;
    tempC: number;
    humidityPct: number;
    rainMm: number;
    windKmh: number;
};

type WeatherData = {
    locationLabel: string;
    updatedAtISO: string;
    today: DailyForecast;
    next7Days: DailyForecast[];
};

/* ================= CONFIG ================= */

const API_URL = "https://farmlens-dev.vercel.app/api/bmkg";

/* ================= HELPERS ================= */

function mapBmkgCondition(code: number): Condition {
    if ([95, 97].includes(code)) return "badai";
    if ([61, 63, 80].includes(code)) return "hujan";
    if ([0, 1].includes(code)) return "cerah";
    return "berawan";
}

function conditionIcon(c: Condition) {
    return {
        cerah: Sun,
        berawan: CloudSun,
        hujan: CloudRain,
        badai: CloudLightning,
        panas_ekstrem: ThermometerSun,
    }[c];
}

function conditionGradient(c: Condition) {
    return {
        cerah: "from-amber-300/30 via-orange-200/20 to-white",
        berawan: "from-sky-300/30 via-slate-200/20 to-white",
        hujan: "from-blue-400/30 via-sky-300/20 to-white",
        badai: "from-purple-400/30 via-indigo-300/20 to-white",
        panas_ekstrem: "from-red-400/30 via-orange-300/20 to-white",
    }[c];
}

function riskBadge(level: RiskLevel) {
    return {
        aman: "bg-emerald-500/10 text-emerald-700 ring-emerald-400/30",
        waspada: "bg-amber-500/10 text-amber-700 ring-amber-400/30",
        bahaya: "bg-red-500/10 text-red-700 ring-red-400/30",
    }[level];
}

function computeRisk(today: DailyForecast): { level: RiskLevel; reason: string } {
    if (today.tempC >= 35) return { level: "bahaya", reason: "Suhu ekstrem" };
    if (today.rainMm >= 20) return { level: "bahaya", reason: "Hujan deras" };
    if (today.windKmh >= 25) return { level: "bahaya", reason: "Angin kencang" };

    if (today.tempC >= 32 || today.rainMm >= 10)
        return { level: "waspada", reason: "Cuaca cukup ekstrem" };

    return { level: "aman", reason: "Cuaca stabil" };
}

function advice(today: DailyForecast, risk: RiskLevel) {
    if (today.tempC >= 35)
        return {
            emoji: "🌞",
            title: "Panas Ekstrem",
            text: "Tambahkan penyiraman pagi & sore, serta beri naungan sementara.",
        };

    if (today.rainMm >= 20 || today.windKmh >= 25)
        return {
            emoji: "⚠️",
            title: "Cuaca Ekstrem",
            text: "Pindahkan pot ke area terlindung dan pastikan drainase lancar.",
        };

    if (risk === "waspada")
        return {
            emoji: "🟡",
            title: "Perlu Perhatian",
            text: "Pantau kelembaban media dan sesuaikan frekuensi penyiraman.",
        };

    return {
        emoji: "🟢",
        title: "Kondisi Aman",
        text: "Lanjutkan perawatan rutin seperti biasa.",
    };
}

/* ================= COMPONENT ================= */

export function WeatherRecommendationCard() {
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(API_URL)
            .then((r) => r.json())
            .then((json) => {
                const raw = json.data[0].cuaca.flat();
                const byDate: Record<string, any[]> = {};

                raw.forEach((d: any) => {
                    const date = d.local_datetime.slice(0, 10);
                    byDate[date] ??= [];
                    byDate[date].push(d);
                });

                const days: DailyForecast[] = Object.entries(byDate)
                    .slice(0, 7)
                    .map(([date, items]) => ({
                        dateISO: date,
                        condition: mapBmkgCondition(items[0].weather),
                        tempC: Math.round(items.reduce((s, i) => s + i.t, 0) / items.length),
                        humidityPct: Math.round(items.reduce((s, i) => s + i.hu, 0) / items.length),
                        rainMm: Math.round(items.reduce((s, i) => s + (i.tp ?? 0), 0) * 10) / 10,
                        windKmh: Math.round(Math.max(...items.map((i) => i.ws ?? 0))),
                    }));

                setData({
                    locationLabel: json.lokasi?.desa ?? "Lokasi",
                    updatedAtISO: new Date().toISOString(),
                    today: days[0],
                    next7Days: days,
                });
                setLoading(false);
            });
    }, []);

    const computed = useMemo(() => {
        if (!data) return null;
        const r = computeRisk(data.today);
        return { risk: r, advice: advice(data.today, r.level) };
    }, [data]);

    if (loading || !data || !computed) {
        return (
            <div className="rounded-3xl p-8 bg-white/70 backdrop-blur ring-1 ring-black/5 animate-pulse">
                Memuat cuaca…
            </div>
        );
    }

    const Icon = conditionIcon(data.today.condition);

    return (
        <>
            {/* ===== PAGE HEADER ===== */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl border border-green-200
             bg-gradient-to-br from-green-50 via-white to-green-100 p-6 mb-20"
            >

                <div className="relative">
                    <p className="text-sm font-medium text-sky-700">
                        🌦️ Smart Weather Intelligence
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-1">
                        Rekomendasi Cuaca & Perawatan
                    </h2>
                    <p className="text-neutral-600 mt-2 max-w-xl">
                        Analisis cuaca harian berbasis BMKG dan rekomendasi tindakan
                        untuk menjaga kesehatan tanaman secara optimal.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br  ${conditionGradient(
                    data.today.condition
                )} ring-1 ring-black/5 shadow-2xl`}
            >
                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/40 blur-3xl" />

                <div className="relative p-8">
                    {/* HEADER */}
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4 items-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 flex items-center justify-center shadow">
                                <Icon className="w-7 h-7 text-neutral-800" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-900">
                                    Prediksi Cuaca
                                </h3>
                                <p className="text-sm text-neutral-500">
                                    {data.locationLabel} • BMKG
                                </p>
                            </div>
                        </div>

                        <span
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold ring-1 ${riskBadge(
                                computed.risk.level
                            )}`}
                        >
                            {computed.risk.level.toUpperCase()}
                        </span>
                    </div>

                    {/* HERO */}
                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="text-sm text-neutral-500">Hari ini</p>
                            <p className="text-5xl font-bold text-neutral-900">
                                {data.today.tempC}°
                            </p>
                            <p className="mt-1 text-sm text-neutral-600">
                                Hujan {data.today.rainMm} mm • RH {data.today.humidityPct}%
                            </p>
                        </div>
                        <Sparkles className="w-8 h-8 text-amber-400" />
                    </div>

                    {/* STATS */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Stat label="Suhu" value={`${data.today.tempC}°C`} icon={<ThermometerSun />} />
                        <Stat label="Kelembaban" value={`${data.today.humidityPct}%`} icon={<Droplets />} />
                        <Stat label="Hujan" value={`${data.today.rainMm} mm`} icon={<CloudRain />} />
                        <Stat label="Angin" value={`${data.today.windKmh} km/j`} icon={<Wind />} />
                    </div>

                    {/* ADVICE */}
                    <div className="mt-6 rounded-2xl bg-white/80 backdrop-blur ring-1 ring-black/5 p-5">
                        <p className="font-semibold text-neutral-900">
                            {computed.advice.emoji} {computed.advice.title}
                        </p>
                        <p className="mt-1 text-sm text-neutral-600">
                            {computed.advice.text}
                        </p>
                    </div>

                    {/* WEEK */}
                    <div className="mt-6">
                        <p className="text-sm font-semibold mb-3">7 Hari ke Depan</p>
                        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {data.next7Days.map((d) => (
                                <div
                                    key={d.dateISO}
                                    className="rounded-xl p-3 bg-white/80 backdrop-blur ring-1 ring-black/5 text-center"
                                >
                                    <p className="text-xs text-neutral-500">{d.dateISO.slice(5)}</p>
                                    <p className="font-semibold text-neutral-900">{d.tempC}°</p>
                                    <p className="text-xs text-neutral-500">{d.rainMm} mm</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

/* ================= SMALL COMPONENT ================= */

function Stat({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl p-3 bg-white/80 backdrop-blur ring-1 ring-black/5">
            <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>{label}</span>
                {icon}
            </div>
            <p className="mt-1 text-lg font-semibold text-neutral-900">{value}</p>
        </div>
    );
}
