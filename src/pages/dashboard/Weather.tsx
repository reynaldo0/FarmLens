import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRain,
  CloudSun,
  CloudLightning,
  Sun,
  Wind,
  Droplets,
  ThermometerSun,
  Info,
} from "lucide-react";

// =========================
// Types
// =========================

type RiskLevel = "aman" | "waspada" | "bahaya";

type DailyForecast = {
  dateISO: string; // e.g. 2026-01-11
  condition: "cerah" | "berawan" | "hujan" | "badai" | "panas_ekstrem";
  tempC: number;
  humidityPct: number;
  rainMm: number;
  windKmh?: number;
};

type WeatherData = {
  locationLabel: string;
  updatedAtISO: string;
  today: DailyForecast;
  next7Days: DailyForecast[];
};

// =========================
// Utilities
// =========================

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatDateShort(iso: string) {
  // Minimal formatting (no Intl options to keep consistent)
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

function getConditionLabel(c: DailyForecast["condition"]) {
  switch (c) {
    case "cerah":
      return "Cerah";
    case "berawan":
      return "Berawan";
    case "hujan":
      return "Hujan";
    case "badai":
      return "Badai";
    case "panas_ekstrem":
      return "Panas Ekstrem";
  }
}

function getConditionIcon(c: DailyForecast["condition"]) {
  switch (c) {
    case "cerah":
      return Sun;
    case "berawan":
      return CloudSun;
    case "hujan":
      return CloudRain;
    case "badai":
      return CloudLightning;
    case "panas_ekstrem":
      return ThermometerSun;
  }
}

function computeRisk(today: DailyForecast, next7Days: DailyForecast[]): { level: RiskLevel; reason: string } {
  const t = today.tempC;
  const r = today.rainMm;
  const w = today.windKmh ?? 0;

  // consecutive rainy days
  let rainyStreak = 0;
  for (const d of next7Days) {
    if (d.rainMm >= 5) rainyStreak++;
    else break;
  }

  const extremeHeat = t >= 35;
  const heavyRain = r >= 20;
  const strongWind = w >= 25;

  if (extremeHeat || heavyRain || strongWind) {
    const reasons: string[] = [];
    if (extremeHeat) reasons.push("suhu sangat tinggi");
    if (heavyRain) reasons.push("curah hujan tinggi");
    if (strongWind) reasons.push("angin kencang");
    return { level: "bahaya", reason: reasons.join(", ") };
  }

  if (t >= 32 || r >= 10 || rainyStreak >= 3) {
    const reasons: string[] = [];
    if (t >= 32) reasons.push("suhu cukup panas");
    if (r >= 10) reasons.push("potensi hujan sedang");
    if (rainyStreak >= 3) reasons.push("hujan beberapa hari beruntun");
    return { level: "waspada", reason: reasons.join(", ") };
  }

  return { level: "aman", reason: "kondisi relatif stabil" };
}

function generateAdvice(today: DailyForecast, risk: RiskLevel, next7Days: DailyForecast[]) {
  const t = today.tempC;
  const r = today.rainMm;
  const w = today.windKmh ?? 0;

  // consecutive rainy days for drainage advice
  let rainyStreak = 0;
  for (const d of next7Days) {
    if (d.rainMm >= 5) rainyStreak++;
    else break;
  }

  // A small rule-based "AI". Later you can swap this to LLM.
  if (t >= 35) {
    return {
      emoji: "🌞",
      title: "Panas ekstrem",
      text: "Tambahkan frekuensi penyiraman pagi & sore. Hindari menyiram siang hari agar tanaman tidak stres.",
      why: "Suhu tinggi meningkatkan penguapan dan membuat media tanam cepat kering.",
    };
  }

  if (r >= 20 || today.condition === "badai" || w >= 25) {
    return {
      emoji: "⚠️",
      title: "Hujan deras / angin kencang",
      text: "Pindahkan pot ke area terlindung. Pastikan penyangga kuat agar tanaman tidak roboh.",
      why: "Angin dan hujan deras bisa merusak batang/daun serta memicu genangan di pot.",
    };
  }

  if (rainyStreak >= 3 || r >= 10) {
    return {
      emoji: "🌧️",
      title: "Potensi lembap berlebih",
      text: "Kurangi penyiraman dan cek lubang drainase. Angkat pot sedikit agar air tidak menggenang.",
      why: "Media terlalu basah meningkatkan risiko busuk akar pada tanaman pot.",
    };
  }

  if (risk === "waspada") {
    return {
      emoji: "🟡",
      title: "Perlu perhatian",
      text: "Pantau kelembaban media. Jika permukaan kering, siram secukupnya; jika masih lembap, tunda.",
      why: "Perubahan cuaca sedang dapat membuat kebutuhan air tanaman berubah cepat.",
    };
  }

  return {
    emoji: "🟢",
    title: "Kondisi aman",
    text: "Lanjutkan perawatan rutin. Siram saat media mulai kering dan pastikan tanaman mendapat cahaya cukup.",
    why: "Cuaca stabil membuat perawatan lebih konsisten dan risiko stres tanaman lebih rendah.",
  };
}

function riskBadgeClasses(level: RiskLevel) {
  switch (level) {
    case "aman":
      return "bg-green-50 text-green-700 ring-1 ring-green-200";
    case "waspada":
      return "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200";
    case "bahaya":
      return "bg-red-50 text-red-700 ring-1 ring-red-200";
  }
}

function cardGradientClasses(condition: DailyForecast["condition"], risk: RiskLevel) {
  // Subtle dynamic gradient without hard-coded colors in JS; Tailwind handles.
  // Adjust to taste.
  if (risk === "bahaya") return "from-red-50 to-white";
  if (condition === "hujan" || condition === "badai") return "from-blue-50 to-white";
  if (condition === "panas_ekstrem") return "from-orange-50 to-white";
  if (condition === "cerah") return "from-amber-50 to-white";
  return "from-slate-50 to-white";
}

// =========================
// Skeleton
// =========================

function WeatherCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="h-5 w-44 rounded bg-black/10 animate-pulse" />
            <div className="h-4 w-64 rounded bg-black/10 animate-pulse" />
          </div>
          <div className="h-9 w-24 rounded-full bg-black/10 animate-pulse" />
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl p-3 ring-1 ring-black/5 bg-white">
              <div className="h-4 w-16 rounded bg-black/10 animate-pulse" />
              <div className="mt-2 h-6 w-20 rounded bg-black/10 animate-pulse" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl ring-1 ring-black/5 bg-white p-4">
          <div className="h-4 w-40 rounded bg-black/10 animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-4 w-full rounded bg-black/10 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-black/10 animate-pulse" />
          </div>
        </div>

        <div className="mt-6">
          <div className="h-4 w-28 rounded bg-black/10 animate-pulse" />
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="rounded-xl p-3 ring-1 ring-black/5 bg-white">
                <div className="h-3 w-10 rounded bg-black/10 animate-pulse" />
                <div className="mt-2 h-5 w-10 rounded bg-black/10 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================
// Tooltip (simple, no portal)
// =========================

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-xl bg-neutral-900 text-white text-xs leading-relaxed px-3 py-2 shadow-xl"
            role="tooltip"
          >
            {label}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-neutral-900" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// =========================
// Main Component
// =========================

export function WeatherRecommendationCard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Simulated fetch — replace with your API call.
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    const t = setTimeout(() => {
      if (!alive) return;

      const now = new Date();
      const isoToday = now.toISOString().slice(0, 10);

      // Fake 7-day forecast
      const base: DailyForecast[] = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(now);
        d.setDate(d.getDate() + i);
        const dateISO = d.toISOString().slice(0, 10);

        // Simple pattern for demo
        const temp = 30 + Math.round(Math.sin(i / 1.5) * 4);
        const rain = clamp(Math.round(Math.max(0, Math.cos(i / 1.3) * 18)), 0, 30);
        const wind = clamp(10 + Math.round(Math.sin(i) * 10), 0, 40);

        const condition: DailyForecast["condition"] =
          temp >= 35
            ? "panas_ekstrem"
            : rain >= 20
              ? "badai"
              : rain >= 8
                ? "hujan"
                : temp >= 31
                  ? "cerah"
                  : "berawan";

        return {
          dateISO,
          condition,
          tempC: temp,
          humidityPct: clamp(65 + Math.round(Math.cos(i / 1.2) * 15), 35, 95),
          rainMm: rain,
          windKmh: wind,
        };
      });

      const payload: WeatherData = {
        locationLabel: "Lokasi kamu",
        updatedAtISO: new Date().toISOString(),
        today: { ...base[0], dateISO: isoToday },
        next7Days: base,
      };

      setData(payload);
      setLoading(false);
    }, 700);

    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);

  const computed = useMemo(() => {
    if (!data) return null;
    const risk = computeRisk(data.today, data.next7Days);
    const advice = generateAdvice(data.today, risk.level, data.next7Days);
    return { risk, advice };
  }, [data]);

  if (loading) return <WeatherCardSkeleton />;

  if (error || !data || !computed) {
    return (
      <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-lg p-6">
        <div className="text-sm font-semibold text-neutral-900">Cuaca & Rekomendasi</div>
        <p className="mt-2 text-sm text-neutral-600">
          Gagal memuat data cuaca. {error ? error : "Coba refresh halaman."}
        </p>
      </div>
    );
  }

  const ConditionIcon = getConditionIcon(data.today.condition);
  const { risk, advice } = computed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-lg overflow-hidden"
    >
      <div className={`bg-gradient-to-b ${cardGradientClasses(data.today.condition, risk.level)}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm">
                  <ConditionIcon className="w-5 h-5 text-neutral-800" />
                </div>
                <div>
                  <div className="text-base font-semibold text-neutral-900">Prediksi Cuaca</div>
                  <div className="text-xs text-neutral-500">
                    {data.locationLabel} • Update {new Date(data.updatedAtISO).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm text-neutral-700">
                <span className="font-medium">{getConditionLabel(data.today.condition)}</span>
                <span className="text-neutral-400"> • </span>
                <span>{data.today.tempC}°C</span>
                <span className="text-neutral-400"> • </span>
                <span>{data.today.rainMm} mm</span>
              </div>
            </div>

            <div className={`shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold ${riskBadgeClasses(risk.level)}`}>
              <span className="inline-block w-2 h-2 rounded-full bg-current opacity-70" />
              {risk.level === "aman" ? "Aman" : risk.level === "waspada" ? "Waspada" : "Bahaya"}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatTile label="Suhu" value={`${data.today.tempC}°C`} icon={<ThermometerSun className="w-4 h-4" />} />
            <StatTile label="Kelembaban" value={`${data.today.humidityPct}%`} icon={<Droplets className="w-4 h-4" />} />
            <StatTile label="Curah hujan" value={`${data.today.rainMm} mm`} icon={<CloudRain className="w-4 h-4" />} />
            <StatTile label="Angin" value={`${data.today.windKmh ?? 0} km/j`} icon={<Wind className="w-4 h-4" />} />
          </div>

          {/* Recommendation */}
          <div className="mt-6 rounded-2xl ring-1 ring-black/5 bg-white/80 backdrop-blur p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-neutral-900">{advice.emoji} Saran Perawatan</div>
                <div className="mt-1 text-xs text-neutral-500">{advice.title}</div>
              </div>

              <Tooltip label={advice.why}>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-neutral-900 transition px-2 py-1 rounded-lg hover:bg-black/5"
                  aria-label="Kenapa saran ini muncul?"
                >
                  <Info className="w-4 h-4" />
                  Kenapa?
                </button>
              </Tooltip>
            </div>

            <p className="mt-3 text-sm text-neutral-700 leading-relaxed">{advice.text}</p>

            <div className="mt-3 text-xs text-neutral-500">
              Basis risiko: <span className="font-medium text-neutral-700">{risk.reason}</span>
            </div>
          </div>

          {/* Weekly forecast */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-neutral-900">Minggu ini</div>
              <div className="text-xs text-neutral-500">7 hari</div>
            </div>

            <div className="mt-3 grid grid-cols-4 sm:grid-cols-7 gap-2">
              {data.next7Days.slice(0, 7).map((d) => (
                <MiniDay key={d.dateISO} day={d} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl p-3 ring-1 ring-black/5 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500">{label}</div>
        <div className="text-neutral-700">{icon}</div>
      </div>
      <div className="mt-1 text-lg font-semibold text-neutral-900">{value}</div>
    </div>
  );
}

function MiniDay({ day }: { day: DailyForecast }) {
  const Icon = getConditionIcon(day.condition);
  return (
    <div className="rounded-xl p-3 ring-1 ring-black/5 bg-white/85 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-neutral-500">{formatDateShort(day.dateISO)}</div>
        <Icon className="w-4 h-4 text-neutral-700" />
      </div>
      <div className="mt-2 text-sm font-semibold text-neutral-900">{day.tempC}°</div>
      <div className="mt-0.5 text-[11px] text-neutral-500">{day.rainMm} mm</div>
    </div>
  );
}

/*
===========================================
HOW TO INTEGRATE WITH REAL WEATHER API
===========================================

1) Replace the simulated setTimeout() fetch with your API call.
2) Map API response to DailyForecast[] and WeatherData.
3) If you also store plant types, pass them into generateAdvice() to tailor advice.

Example shape you want:
{
  locationLabel: "Bandung",
  updatedAtISO: new Date().toISOString(),
  today: { dateISO, condition, tempC, humidityPct, rainMm, windKmh },
  next7Days: [...]
}

*/
