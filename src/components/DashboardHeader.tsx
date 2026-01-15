import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, removeAuth } from "../utils/auth";

interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function DashboardHeader({
    sidebarOpen,
    setSidebarOpen,
}: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    const user = getAuth();

    const displayName =
        user?.name ?? user?.email?.split("@")[0] ?? "Akun";

    const initials = displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = () => {
        removeAuth();
        navigate("/register");
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200">
            <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>

                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition">
                                Farmlens
                            </h1>
                            <p className="hidden md:block text-xs text-gray-500">
                                Smart Agriculture Dashboard
                            </p>
                        </div>
                    </Link>
                </div>

                {/* RIGHT – ACCOUNT */}
                <div ref={ref} className="relative">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-gray-100 transition"
                    >
                        <div className="hidden sm:block text-right leading-tight">
                            <p className="text-sm font-medium text-gray-900">
                                {displayName}
                            </p>
                            {user?.email && (
                                <p className="text-xs text-gray-500">{user.email}</p>
                            )}
                        </div>

                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold shadow">
                                {initials}
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                        </div>

                        <ChevronDown
                            className={`w-4 h-4 transition ${open ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-56 rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {displayName}
                                    </p>
                                    {user?.email && (
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 transition"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
