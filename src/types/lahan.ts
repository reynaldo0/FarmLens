export type Activity = {
  date: string;
  activity: string;
  note: string;
};

export type YieldHistory = {
  musim: string;
  hasil: number;
};

export type Lahan = {
  id: number;
  name: string;
  location: string;
  area: number;
  crop: string;
  variety: string;
  plantDate: string;
  harvestDate: string;
  status: "Sehat" | "Waspada" | "Berisiko";
  health: number;
  activities: Activity[];
  yieldHistory: YieldHistory[];
};
