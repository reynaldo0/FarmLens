import { NavLink } from 'react-router-dom';
import {
    ClipboardList,
    LayoutDashboard,
    Leaf,
    Map,
    Shield,
    ShoppingCart,
    TrendingUp,
    Wallet,
} from 'lucide-react';

const menuItems = [
    { path: 'overview', label: 'Dashboard Utama', icon: <LayoutDashboard />, role: 'petani' },
    { path: 'deteksi', label: 'Deteksi Penyakit', icon: <Leaf />, role: 'petani' },
    { path: 'rekomendasi', label: 'Rekomendasi', icon: <ClipboardList />, role: 'petani' },
    { path: 'lahan', label: 'Manajemen Lahan', icon: <Map />, role: 'petani' },
    { path: 'panen', label: 'Prediksi Panen', icon: <TrendingUp />, role: 'petani' },
    { path: 'keuangan', label: 'Keuangan', icon: <Wallet />, role: 'petani' },
    { path: 'marketplace', label: 'Marketplace', icon: <ShoppingCart />, role: 'all' },
    { path: 'admin', label: 'Panel Admin', icon: <Shield />, role: 'admin' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, userRole }: any) {
    return (
        <aside className={`fixed lg:sticky top-16 w-64 bg-white border-r`}>
            <nav className="p-4 space-y-1">
                {menuItems
                    .filter(i => i.role === 'all' || i.role === userRole)
                    .map(item => (
                        <NavLink
                            key={item.path}
                            to={`/dashboard/${item.path}`}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
            </nav>
        </aside>
    );
}
