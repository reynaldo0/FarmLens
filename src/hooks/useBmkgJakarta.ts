import { useEffect, useState } from "react";

export function useBmkgJakarta() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bmkg")
      .then((res) => res.json())
      .then((json) => {
        const area = json.data[0].area[0];
        const params = area.parameter;

        const get = (id) =>
          params.find((p) => p.id === id)?.timerange?.[0]?.value?.[0]?.text;

        setData({
          suhu: Number(get("t")),
          kelembaban: Number(get("hu")),
          hujan: Number(get("tp")),
          cuaca: get("weather"),
        });

        setLoading(false);
      });
  }, []);

  return { data, loading };
}
