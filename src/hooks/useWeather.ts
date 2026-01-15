import type { BmkgWeather, WeatherInsight } from "../types/weather";

export function useWeather(cuaca: BmkgWeather | null): WeatherInsight {
  if (!cuaca) {
    return {
      summary: "belum tersedia",
      risk: "aman",
      actionTitle: "Memuat cuaca",
      actionDescription: "Menunggu data cuaca dari BMKG",
    };
  }

  if (cuaca.hujan >= 20) {
    return {
      summary: "hujan lebat",
      risk: "bahaya",
      actionTitle: "Hujan Lebat Terdeteksi",
      actionDescription:
        "Tunda penyemprotan, periksa drainase, dan lindungi tanaman dari genangan.",
    };
  }

  if (cuaca.suhu >= 32) {
    return {
      summary: "cuaca panas",
      risk: "waspada",
      actionTitle: "Cuaca Panas",
      actionDescription:
        "Tambahkan penyiraman pagi atau sore untuk mencegah stres tanaman.",
    };
  }

  return {
    summary: "cerah berawan",
    risk: "aman",
    actionTitle: "Cuaca Stabil",
    actionDescription: "Lanjutkan perawatan rutin dan pemantauan harian.",
  };
}
