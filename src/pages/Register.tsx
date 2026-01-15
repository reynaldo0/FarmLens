import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../utils/auth";
import type { AuthUser } from "../types/auth";
import { motion } from "framer-motion";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user: AuthUser = {
            name,
            email,
            role: "petani",
        };

        setAuth(user);
        navigate("/dashboard");
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-100">
            {/* Animated background blobs */}
            <motion.div
                animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-green-300/30 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-green-400/30 rounded-full blur-3xl"
            />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl shadow-2xl px-8 py-10"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-semibold tracking-tight text-gray-900">
                            Create Account
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Daftar untuk mulai menggunakan Farmlens
                        </p>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative"
                        >
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nama"
                                className="peer w-full bg-transparent border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition"
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-green-600"
                            >
                                Full Name
                            </label>
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="relative"
                        >
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="peer w-full bg-transparent border border-gray-300 rounded-xl px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition"
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-green-600"
                            >
                                Email Address
                            </label>
                        </motion.div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300, damping: 18 }}
                            type="submit"
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-lg shadow-green-500/30 hover:brightness-110"
                        >
                            Create Account
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm text-center text-gray-600 mt-6"
                    >
                        Sudah punya akun?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-green-600 hover:underline"
                        >
                            Login
                        </Link>
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
}
