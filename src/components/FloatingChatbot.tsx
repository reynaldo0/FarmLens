import { motion } from "framer-motion";
import { Bot, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function FloatingChatbot() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50"
        >
            {/* GLOW PULSE */}
            <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.15, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-green-500 blur-2xl"
            />

            <Link to="/chatbot">
                {/* ================= MOBILE ================= */}
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="
            relative flex items-center justify-center
            md:hidden
            w-14 h-14 rounded-full
            bg-gradient-to-br from-green-600 to-emerald-700
            text-white shadow-2xl
          "
                >
                    <motion.div
                        animate={{ rotate: [0, 6, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                    >
                        <Bot className="w-6 h-6" />
                    </motion.div>

                    {/* badge */}
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-green-600 flex items-center justify-center shadow"
                    >
                        <MessageCircle className="w-3 h-3" />
                    </motion.div>
                </motion.div>

                {/* ================= DESKTOP ================= */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="
            relative hidden md:flex items-center gap-3
            bg-gradient-to-br from-green-600 to-emerald-700
            text-white shadow-xl
            px-4 py-3 rounded-2xl
            max-w-[240px]
          "
                >
                    {/* ICON */}
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center"
                    >
                        <Bot className="w-5 h-5" />
                    </motion.div>

                    {/* TEXT (COMPACT) */}
                    <div className="leading-tight">
                        <div className="flex items-center gap-1">
                            <p className="text-sm font-semibold">FarmLens AI</p>
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        </div>
                        <p className="text-xs text-green-100">
                            Tanya hama & penyakit tanaman
                        </p>
                    </div>

                    {/* FLOAT BADGE */}
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-white text-green-600 rounded-full flex items-center justify-center shadow-lg"
                    >
                        <MessageCircle className="w-4 h-4" />
                    </motion.div>
                </motion.div>
            </Link>
        </motion.div>
    );
}
