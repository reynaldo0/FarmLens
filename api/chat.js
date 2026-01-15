import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // ===============================
  // ✅ CORS HEADERS (WAJIB)
  // ===============================
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ===============================
  // ✅ HANDLE PREFLIGHT
  // ===============================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("API KEY EXIST:", !!process.env.GEMINI_API_KEY);

    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: `
Kamu adalah AI asisten FarmLens 🌱
Fokus membantu:
- Urban farming
- Penyakit tanaman
- Pemupukan
- Hama & cuaca
Jawab dengan bahasa Indonesia yang jelas, praktis, dan ramah petani.
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

    return res.status(200).json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error("Gemini error:", err);
    return res.status(500).json({
      error: "Gagal memproses AI",
    });
  }
}
