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
Kamu adalah AI FarmLens 🌱
Ahli urban farming, penyakit tanaman, pupuk, dan cuaca.
Jawab ringkas, praktis, dan ramah petani.
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
