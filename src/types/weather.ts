export type BmkgWeather = {
  suhu: number;
  kelembaban: number;
  hujan: number;
  cuaca: string;
};

export type WeatherRisk = "aman" | "waspada" | "bahaya";

export type WeatherInsight = {
  risk: WeatherRisk;
  actionTitle: string;
  actionDescription: string;
};
