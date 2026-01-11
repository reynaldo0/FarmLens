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
        const areas = json?.data?.[0]?.area;

        if (!Array.isArray(areas)) {
          throw new Error("BMKG area tidak tersedia");
        }

        const area = areas.find(
          (a: any) => Array.isArray(a.parameter)
        );

        if (!area) {
          throw new Error("BMKG parameter tidak tersedia");
        }

        const params = area.parameter;

        const getLatestValue = (id: string): string => {
          const param = params.find((p: any) => p.id === id);
          if (!param?.timerange?.length) return "0";

          const latest = param.timerange[param.timerange.length - 1];
          const value = latest?.value?.[0]?.text;

          if (!value || value === "-" || value === "") return "0";
          return value;
        };

        setData({
          suhu: Number(getLatestValue("t")),
          kelembaban: Number(getLatestValue("hu")),
          hujan: Number(getLatestValue("tp")),
          cuaca: getLatestValue("weather"),
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
