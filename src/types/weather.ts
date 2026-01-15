export type BmkgWeather = {
  suhu: number;
  kelembaban: number;
  hujan: number;
  cuaca: string;
};

export type WeatherRisk = "aman" | "waspada" | "bahaya";

export type WeatherInsight = {
  summary: string;
  risk: WeatherRisk;
  actionTitle: string;
  actionDescription: string;
};

export type BmkgDaily = {
  dateISO: string;
  rainMm: number;
};
