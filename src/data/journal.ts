export type JournalEntry = {
  id: string;
  dateISO: string; // "2026-01-05"
  image: string; // base64 / url
  description: string;
};

export type JournalByMonth = {
  monthLabel: string; // "Januari 2026"
  monthKey: string; // "2026-01"
  entries: JournalEntry[];
};
