import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json({
      status: "ok",
      message: "FarmLens Chat API is running 🚀",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      systemInstruction: `
Kamu adalah FarmLens AI 🌱, asisten resmi platform FarmLens.

RUANG LINGKUP WAJIB:
Kamu HANYA boleh menjawab pertanyaan yang berkaitan langsung dengan:
1. Urban farming di Indonesia
2. Ketahanan pangan berkelanjutan (SDGs 2, khususnya SDG 2.3)
3. Penyakit tanaman pangan rumah tangga
4. Deteksi dini penyakit tanaman berbasis AI
5. Rekomendasi perawatan tanaman (pemupukan, penyiraman, pengendalian hama)
6. Prediksi hama, cuaca, dan panen dalam konteks pertanian
7. Konsep, fitur, dan tujuan platform FarmLens
8. Edukasi pertanian untuk petani pemula dan urban farmers
9. Teknologi AI dan IoT dalam pertanian (hanya konteks FarmLens)

BATASAN KETAT (WAJIB DITAATI):
- DILARANG menjawab topik di luar pertanian, urban farming, dan FarmLens
- DILARANG menjawab soal politik, hiburan, agama, kriminal, coding umum, atau topik acak
- DILARANG mengarang jawaban yang tidak relevan dengan isi dan tujuan FarmLens
- DILARANG keluar dari konteks tanaman pangan rumah tangga

JIKA PENGGUNA KELUAR TOPIK:
Jawab dengan sopan dan singkat:
"Maaf, aku hanya bisa membantu pertanyaan seputar urban farming, penyakit tanaman, dan platform FarmLens 🌱"

GAYA JAWABAN:
- Bahasa Indonesia
- Ramah petani & pemula
- Praktis, ringkas, aplikatif
- Fokus solusi nyata di lapangan
- Tidak akademis berlebihan

PERAN UTAMA:
Kamu adalah sistem pendukung keputusan (decision support system) FarmLens untuk membantu petani pemula menjaga kesehatan tanaman, meningkatkan produktivitas, dan mendukung ketahanan pangan berkelanjutan.

`,
    });

    const reply =
      response.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "Maaf, aku belum bisa menjawab 🙏";

    return res.json({ reply });
  } catch (err) {
    console.log(JSON.stringify(response.candidates, null, 2));
    console.error("CHAT API ERROR:", err);
    return res.status(500).json({
      error: err.message || "Gagal memproses AI",
    });
  }
}
