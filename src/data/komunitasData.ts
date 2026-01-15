export type Category = "tanya" | "pengalaman" | "tips";

export type Comment = {
  id: string;
  author: string;
  content: string;
};

export type Post = {
  id: string;
  author: string;
  category: Category;
  content: string;
  comments: Comment[];
  createdAt: string;
};

export const KOMUNITAS_DUMMY: Post[] = [
  {
    id: "1",
    author: "Budi Santoso",
    category: "tanya",
    content:
      "Daun cabai saya keriting dan muncul bercak putih. Apakah ini hama thrips?",
    createdAt: "2025-06-18T08:00:00Z",
    comments: [
      {
        id: "1-1",
        author: "Penyuluh FarmLens",
        content: "Kemungkinan besar thrips. Coba insektisida nabati dulu.",
      },
    ],
  },
  {
    id: "2",
    author: "Ahmad Dahlan",
    category: "pengalaman",
    content: "Panen cabai meningkat setelah rutin pakai pupuk organik cair.",
    createdAt: "2025-06-20T10:30:00Z",
    comments: [],
  },
  {
    id: "3",
    author: "Ibu Sari",
    category: "tips",
    content: "Gunakan pot minimal 30cm dan pastikan drainase lancar.",
    createdAt: "2025-06-22T06:45:00Z",
    comments: [],
  },
];
