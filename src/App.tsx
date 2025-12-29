import React, { useState } from 'react';

import {
  LayoutDashboard,
  Leaf,
  ClipboardList,
  Map,
  TrendingUp,
  Wallet,
  ShoppingCart,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { DashboardOverview } from './components/DashboardOverview';
import { DeteksiPenyakit } from './components/DeteksiPenyakit';
import { RekomendasiAgronomi } from './components/RekomendasiAgronomi';
import { ManajemenLahan } from './components/ManajemenLahan';
import { PrediksiPanen } from './components/PrediksiPanen';
import { Keuangan } from './components/Keuangan';
import { Marketplace } from './components/Marketplace';
import { AdminPanel } from './components/AdminPanel';

type MenuItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  role?: 'petani' | 'pembeli' | 'admin' | 'all';
};

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Dashboard Utama', icon: <LayoutDashboard className="w-5 h-5" />, component: DashboardOverview, role: 'petani' },
  { id: 'deteksi', label: 'Deteksi Penyakit', icon: <Leaf className="w-5 h-5" />, component: DeteksiPenyakit, role: 'petani' },
  { id: 'rekomendasi', label: 'Rekomendasi', icon: <ClipboardList className="w-5 h-5" />, component: RekomendasiAgronomi, role: 'petani' },
  { id: 'lahan', label: 'Manajemen Lahan', icon: <Map className="w-5 h-5" />, component: ManajemenLahan, role: 'petani' },
  { id: 'panen', label: 'Prediksi Panen', icon: <TrendingUp className="w-5 h-5" />, component: PrediksiPanen, role: 'petani' },
  { id: 'keuangan', label: 'Keuangan', icon: <Wallet className="w-5 h-5" />, component: Keuangan, role: 'petani' },
  { id: 'marketplace', label: 'Marketplace', icon: <ShoppingCart className="w-5 h-5" />, component: Marketplace, role: 'all' },
  { id: 'admin', label: 'Panel Admin', icon: <Shield className="w-5 h-5" />, component: AdminPanel, role: 'admin' },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole] = useState<'petani' | 'pembeli' | 'admin'>('petani');

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component || DashboardOverview;

  const filteredMenuItems = menuItems.filter(item =>
    item.role === 'all' || item.role === userRole
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-700">Agrikultur Cerdas AI</h1>
                <p className="text-xs text-gray-500">Platform Pertanian Terintegrasi</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-gray-900">Budi Santoso</p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700">BS</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 w-64 z-30
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <nav className="p-4 space-y-1">
            {filteredMenuItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${activeMenu === item.id
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
