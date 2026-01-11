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
        const area = json.data?.[0]?.area?.[0];
        const params = area?.parameter as any[];

        const get = (id: string): string =>
          params?.find((p: any) => p.id === id)
            ?.timerange?.[0]?.value?.[0]?.text ?? "0";

        setData({
          suhu: Number(get("t")),
          kelembaban: Number(get("hu")),
          hujan: Number(get("tp")),
          cuaca: get("weather"),
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("BMKG error:", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
