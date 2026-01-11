import { useEffect, useState } from "react";
import type { BmkgWeather } from "../types/weather";

const API_BASE = "https://farmlens-dev.vercel.app";

export function useBmkgJakarta() {
  const [data, setData] = useState<BmkgWeather | null>(null);
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

        // 🔥 Ambil prakiraan TERDEKAT
        const nearest = cuacaGroup.flat()?.[0];

        if (!nearest) {
          throw new Error("BMKG data cuaca kosong");
        }

        setData({
          suhu: Number(nearest.t),
          kelembaban: Number(nearest.hu),
          hujan: Number(nearest.tp),
          cuaca: nearest.weather_desc,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("BMKG error:", err);
        setData(null);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
