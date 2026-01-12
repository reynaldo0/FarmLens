import {
    ArrowLeft,
    Bug,
    ClipboardList,
    CloudSun,
    LayoutDashboard,
    Leaf,
    Map,
    Shield,
    ShoppingCart,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const menuItems = [
    {
        path: "overview",
        label: "Dashboard",
        icon: LayoutDashboard,
        role: "petani",
    },
    {
        path: "deteksi",
        label: "Deteksi Penyakit",
        icon: Leaf, // tanaman + penyakit
        role: "petani",
    },
    {
        path: "rekomendasi",
        label: "Rekomendasi",
        icon: ClipboardList, // checklist / saran
        role: "petani",
    },
    {
        path: "lahan",
        label: "Manajemen Lahan",
        icon: Map, // lokasi lahan
        role: "petani",
    },
    {
        path: "panen",
        label: "Prediksi Panen",
        icon: TrendingUp, // growth / yield
        role: "petani",
    },
    {
        path: "hama",
        label: "Prediksi Hama",
        icon: Bug, // 🔥 paling tepat
        role: "petani",
    },
    {
        path: "keuangan",
        label: "Keuangan",
        icon: Wallet, // uang / cashflow
        role: "petani",
    },
    {
        path: "weather",
        label: "Cuaca",
        icon: CloudSun, // cuaca (lebih jelas dari TrendingUp)
        role: "petani",
    },
    {
        path: "marketplace",
        label: "Marketplace",
        icon: ShoppingCart,
        role: "all",
    },
    {
        path: "admin",
        label: "Admin",
        icon: Shield,
        role: "petani",
    },
];

export default function Sidebar({ setSidebarOpen, userRole }: any) {
    return (
        <aside className="
            fixed lg:sticky top-16
            w-64 h-[calc(100vh-4rem)]
            bg-white/80 backdrop-blur-xl
            border-r border-gray-200
            flex flex-col
        ">
            {/* MENU */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {menuItems
                    .filter(i => i.role === 'all' || i.role === userRole)
                    .map(item => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={`/dashboard/${item.path}`}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `
                                    group relative flex items-center gap-3
                                    px-4 py-3 rounded-xl
                                    text-sm font-medium
                                    transition-all
                                    ${isActive
                                        ? 'bg-green-50 text-green-700'
                                        : 'text-gray-700 hover:bg-gray-100'}
                                `
                                }
                            >
                                {/* Active indicator */}
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-green-600 opacity-0 group-[.active]:opacity-100" />

                                <Icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        );
                    })}
            </nav>

            {/* BACK TO HOME */}
            <div className="p-4 border-t border-gray-200">
                <Link
                    to="/"
                    onClick={() => setSidebarOpen(false)}
                    className="
                        flex items-center gap-3
                        px-4 py-3 rounded-xl
                        text-sm font-medium
                        text-gray-600
                        hover:text-gray-900
                        hover:bg-gray-100
                        transition
                    "
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>
            </div>
        </aside>
    );
}
