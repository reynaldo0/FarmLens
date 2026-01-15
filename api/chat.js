import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages is required" });
    }

    // ================= GEMINI MODEL =================
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: `
Kamu adalah FarmLens AI 🌱

Tugas utama:
- Membantu petani & urban farming
- Diagnosa penyakit tanaman
- Memberi solusi pemupukan
- Analisis hama & cuaca

Gaya jawaban:
- Bahasa Indonesia
- Ramah & praktis
- Gunakan bullet point bila perlu
- Fokus solusi lapangan
- Jangan terlalu panjang kecuali diminta
`,
    });

    // ================= CHAT HISTORY =================
    const chat = model.startChat({
      history: messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    // ================= SEND LAST MESSAGE =================
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);

    return res.json({
      reply: result.response.text(),
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    return res.status(500).json({
      error: "Gagal memproses permintaan AI",
    });
  }
}
