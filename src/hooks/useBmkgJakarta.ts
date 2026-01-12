import { useEffect, useState } from "react";
import type { BmkgWeather, BmkgDaily } from "../types/weather";
import type { Season } from "../utils/detectSeason";

const API_BASE = "https://farmlens-dev.vercel.app";

function detectSeasonToday(nearest: any): Season {
  const desc = String(nearest.weather_desc || "").toLowerCase();
  const rainMm = Number(nearest.tp) || 0;
  const weatherCode = Number(nearest.weather);

  // 🔥 PRIORITAS 1: DESKRIPSI
  if (
    desc.includes("hujan") ||
    desc.includes("badai") ||
    desc.includes("petir")
  ) {
    return "hujan";
  }

  // 🔥 PRIORITAS 2: KODE CUACA BMKG
  // 60+ = hujan
  if (weatherCode >= 60) {
    return "hujan";
  }

  // 🔥 PRIORITAS 3: CURAH HUJAN
  if (rainMm > 0) {
    return "hujan";
  }

  return "kemarau";
}

export function useBmkgJakarta() {
  const [data, setData] = useState<BmkgWeather | null>(null);
  const [daily, setDaily] = useState<BmkgDaily[]>([]);
  const [seasonToday, setSeasonToday] = useState<Season>("kemarau");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/bmkg`)
      .then((res) => {
        if (!res.ok) throw new Error("BMKG fetch failed");
        return res.json();
      })
      .then((json: any) => {
        const cuacaGroup = json?.data?.[0]?.cuaca;
        if (!Array.isArray(cuacaGroup)) {
          throw new Error("BMKG cuaca tidak tersedia");
        }

        const flat = cuacaGroup.flat();

        /** 🔥 DATA HARI INI (TERDEKAT) */
        const today = flat[0];
        if (!today) throw new Error("BMKG kosong");

        setData({
          suhu: Number(today.t),
          kelembaban: Number(today.hu),
          hujan: Number(today.tp),
          cuaca: today.weather_desc,
        });

        setSeasonToday(detectSeasonToday(today));

        /** 📅 DATA HARIAN (7 HARI) */
        const byDate: Record<string, number> = {};
        flat.forEach((d: any) => {
          const date = d.local_datetime.slice(0, 10);
          byDate[date] = (byDate[date] ?? 0) + (Number(d.tp) || 0);
        });

        const dailyData: BmkgDaily[] = Object.entries(byDate)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(0, 7)
          .map(([dateISO, rainMm]) => ({ dateISO, rainMm }));

        setDaily(dailyData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("BMKG error:", err);
        setLoading(false);
      });
  }, []);

  return {
    data,
    daily,
    seasonToday, // 👈 INI MUSIM HARI INI
    loading,
  };
}
