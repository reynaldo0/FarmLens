import {
    ArrowLeft,
    BookOpen,
    Bug,
    ClipboardList,
    LayoutDashboard,
    Leaf,
    Map,
    Shield,
    ShoppingCart,
    Sparkles,
    Store,
    TrendingUp,
    Wallet
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import type { UserRole } from "../types/auth"; // sesuaikan path

type MenuRole = UserRole | "all";

const menuItems: Array<{
    path: string;
    label: string;
    icon: React.ElementType;
    roles: MenuRole[];
}> = [
        // umum (yang login)
        { path: "overview", label: "Dashboard", icon: LayoutDashboard, roles: ["all"] },

        // fitur petani
        { path: "deteksi", label: "Deteksi Penyakit", icon: Leaf, roles: ["petani", "admin"] },
        { path: "rekomendasi", label: "Rekomendasi", icon: ClipboardList, roles: ["petani", "admin"] },
        { path: "lahan", label: "Manajemen Lahan", icon: Map, roles: ["petani", "admin"] },
        { path: "panen", label: "Prediksi Panen", icon: TrendingUp, roles: ["petani", "admin"] },
        { path: "hama", label: "Prediksi Hama", icon: Bug, roles: ["petani", "admin"] },
        { path: "journaling", label: "Journaling", icon: BookOpen, roles: ["petani", "admin"] },

        // keuangan bisa juga owner
        { path: "keuangan", label: "Keuangan", icon: Wallet, roles: ["petani", "pemilik_marketplace", "admin"] },

        // marketplace umum
        { path: "marketplace", label: "Marketplace", icon: ShoppingCart, roles: ["all"] },

        // ✅ FITUR 1: onboarding daftar marketplace (petani)
        {
            path: "marketplace-onboarding",
            label: "Daftar Marketplace",
            icon: Sparkles,
            roles: ["pemilik_marketplace"],
        },

        // ✅ FITUR 2: panel owner/admin CRUD produk
        {
            path: "marketplace-owner",
            label: "Kelola Produk",
            icon: Store,
            roles: ["pemilik_marketplace", "admin"],
        },

        // admin panel hanya admin
        { path: "admin", label: "Admin", icon: Shield, roles: ["admin"] },
    ];

type Props = {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userRole: UserRole;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen, userRole }: Props) {
    return (
        <>
            {/* OVERLAY (mobile) */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity
          ${sidebarOpen ? "opacity-100 lg:hidden" : "opacity-0 pointer-events-none"}
        `}
            />

            {/* SIDEBAR */}
            <aside
                className={`
          fixed z-50 top-0 left-0 w-64 h-full
          bg-white/90 backdrop-blur-xl border-r border-gray-200
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]
        `}
            >
                {/* MENU */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto mt-16 lg:mt-0">
                    {menuItems
                        .filter((i) => i.roles.includes("all") || i.roles.includes(userRole))
                        .map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.path}
                                    to={`/dashboard/${item.path}`}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `
                      group relative flex items-center gap-3
                      px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-100"}
                    `
                                    }
                                >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-green-600 opacity-0 group-[.active]:opacity-100" />
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                </nav>

                {/* BACK */}
                <div className="p-4 border-t border-gray-200">
                    <Link
                        to="/"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>
            </aside>
        </>
    );
}
