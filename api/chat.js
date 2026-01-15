import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // GET (biar tidak 405)
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
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY tidak ditemukan");
    }

    const { messages } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
Kamu adalah AI FarmLens 🌱
Ahli urban farming, penyakit tanaman, pupuk, dan cuaca.
Jawab ringkas, praktis, dan ramah petani.
`,
    });

    const chat = model.startChat({
      history: messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const result = await chat.sendMessage(
      messages[messages.length - 1].content
    );

    return res.json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error("CHAT API ERROR:", err);
    return res.status(500).json({
      error: "Gagal memproses AI",
    });
  }
}
