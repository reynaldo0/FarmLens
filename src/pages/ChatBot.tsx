import { AnimatePresence, motion } from "framer-motion";
import {
    Bot,
    CornerDownLeft,
    Loader2,
    Send,
    Sparkles,
    Trash2
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";


const STORAGE_KEY = "farmlens_chatbot";

type ChatMessage = {
    id: string;
    role: "user" | "bot";
    content: string;
    createdAt: string;
};

const WELCOME: ChatMessage[] = [
    {
        id: "welcome",
        role: "bot",
        content:
            "Halo 👋 Aku FarmLens AI 🌱\n\nTanya apa saja seputar:\n• Penyakit tanaman\n• Hama & cuaca\n• Pemupukan\n• Urban farming\n\nJelaskan tanamannya ya biar jawabanku presisi 😊",
        createdAt: new Date().toISOString(),
    },
];

function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function Chatbot() {
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : WELCOME;
    });

    const [text, setText] = useState("");
    const [typing, setTyping] = useState(false);

    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const persist = (data: ChatMessage[]) => {
        setMessages(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    useEffect(() => {
        listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages.length, typing]);

    const canSend = useMemo(
        () => text.trim().length > 0 && !typing,
        [text, typing]
    );

    /* ================= SEND TO GEMINI ================= */

    const sendMessage = async (override?: string) => {
        const content = (override ?? text).trim();
        if (!content || typing) return;

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content,
            createdAt: new Date().toISOString(),
        };

        const next = [...messages, userMsg];
        persist(next);
        setText("");
        setTyping(true);

        try {
            const res = await fetch("https://farmlens-dev.vercel.app/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: next.map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();

            const botMsg: ChatMessage = {
                id: crypto.randomUUID(),
                role: "bot",
                content: data.reply || "Maaf, aku belum bisa menjawab 🙏",
                createdAt: new Date().toISOString(),
            };

            persist([...next, botMsg]);
        } catch {
            persist([
                ...next,
                {
                    id: crypto.randomUUID(),
                    role: "bot",
                    content: "⚠️ Gagal terhubung ke AI. Coba lagi sebentar ya.",
                    createdAt: new Date().toISOString(),
                },
            ]);
        } finally {
            setTyping(false);
        }
    };

    const resetChat = () => {
        persist(WELCOME);
        setText("");
        setTyping(false);
        inputRef.current?.focus();
    };

    const QUICK_TEMPLATES = [
        {
            label: "🌿 Penyakit Tanaman",
            text: "Daun tanaman saya menguning dan berbintik, apa penyebabnya dan bagaimana solusinya?",
        },
        {
            label: "🐛 Hama",
            text: "Tanaman saya sering dimakan ulat kecil, hama apa itu dan cara mengatasinya?",
        },
        {
            label: "🧪 Pemupukan",
            text: "Pupuk apa yang cocok untuk tanaman sayur agar tumbuh subur?",
        },
        {
            label: "🏙️ Urban Farming",
            text: "Bagaimana cara menanam sayur di lahan sempit atau pot di rumah?",
        },
    ];


    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-28 pb-12">
            <div className="max-w-6xl mx-auto px-4">
                {/* HERO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-4">
                        <Sparkles className="w-4 h-4" />
                        FarmLens AI
                    </div>
                    <h1 className="text-4xl md:text-5xl bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        Chatbot Urban Farming
                    </h1>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                        berbasis AI untuk membantu petani Indonesia 🌱
                    </p>
                </div>

                {/* CARD */}
                <section className="rounded-3xl bg-white/70 backdrop-blur ring-1 ring-black/5 shadow-2xl overflow-hidden">
                    {/* HEADER */}
                    <div className="flex items-center justify-between p-5 border-b border-black/5">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-green-600 text-white flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">FarmLens Assistant</p>
                                <p className="font-semibold">Online</p>
                            </div>
                        </div>

                        <button
                            onClick={resetChat}
                            className="px-3 py-2 text-sm border rounded-xl hover:bg-gray-50"
                        >
                            <Trash2 className="w-4 h-4 inline mr-1" />
                            Reset
                        </button>
                    </div>

                    {/* BODY */}
                    <div className="p-5">
                        <div
                            ref={listRef}
                            className="h-[520px] overflow-y-auto space-y-3"
                        >
                            <AnimatePresence>
                                {messages.map((m) => (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow ring-1 ring-black/5 ${m.role === "user"
                                                ? "bg-gray-900 text-white"
                                                : "bg-white"
                                                }`}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => (
                                                        <p className="mb-2 last:mb-0">{children}</p>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc pl-5 space-y-1">{children}</ul>
                                                    ),
                                                    li: ({ children }) => <li>{children}</li>,
                                                    strong: ({ children }) => (
                                                        <strong className="font-semibold">{children}</strong>
                                                    ),
                                                }}
                                            >
                                                {m.content}
                                            </ReactMarkdown>

                                            <div className="mt-1 text-[11px] opacity-60">
                                                {formatTime(m.createdAt)}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {typing && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Farmlens Assisten sedang mengetik…
                                </div>
                            )}
                        </div>

                        {/* INPUT */}
                        <div className="mb-3 flex flex-wrap gap-2">
                            {QUICK_TEMPLATES.map((q) => (
                                <button
                                    key={q.label}
                                    onClick={() => sendMessage(q.text)}
                                    disabled={typing}
                                    className="text-xs px-3 py-2 rounded-full border bg-white hover:bg-green-50 text-green-700 transition disabled:opacity-50"
                                >
                                    {q.label}
                                </button>
                            ))}
                        </div>
                    <div className="mt-4 flex gap-3">
                            <textarea
                                ref={inputRef}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={2}
                                placeholder="Tulis pertanyaan..."
                                className="flex-1 rounded-xl border px-4 py-3 text-sm"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!canSend}
                                className={`px-5 rounded-xl text-white ${canSend
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
                            <CornerDownLeft className="w-4 h-4" />
                            Enter untuk kirim • Shift+Enter baris baru
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
