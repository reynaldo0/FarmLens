export type Season = "hujan" | "kemarau";
export type RainIntensity = "tidak_hujan" | "ringan" | "sedang" | "lebat";

export function detectSeasonProfessional(nearest: any): {
  seasonToday: Season;
  rainIntensity: RainIntensity;
  confidence: number;
} {
  const desc = String(nearest?.weather_desc || "").toLowerCase();
  const tp = Number(nearest?.tp) || 0;
  const weatherCode = Number(nearest?.weather) || 0;

  let score = 0;

  // 1️⃣ DESKRIPSI CUACA (PALING KUAT)
  if (
    desc.includes("hujan") ||
    desc.includes("badai") ||
    desc.includes("petir")
  ) {
    score += 3;
  }

  // 2️⃣ KODE BMKG
  if (weatherCode >= 60) {
    score += 2;
  }

  // 3️⃣ CURAH HUJAN
  if (tp > 0) {
    score += 1;
  }

  const seasonToday: Season = score >= 2 ? "hujan" : "kemarau";

  let rainIntensity: RainIntensity = "tidak_hujan";
  if (tp >= 20) rainIntensity = "lebat";
  else if (tp >= 5) rainIntensity = "sedang";
  else if (tp > 0) rainIntensity = "ringan";

  const confidence = Math.min(100, score * 33);

  return {
    seasonToday,
    rainIntensity,
    confidence,
  };
}
