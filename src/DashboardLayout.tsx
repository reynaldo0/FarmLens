import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import Sidebar from './components/DashboardSidebar';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DeteksiPenyakit } from './pages/dashboard/DeteksiPenyakit';
import { RekomendasiAgronomi } from './pages/dashboard/RekomendasiAgronomi';
import { ManajemenLahan } from './pages/dashboard/ManajemenLahan';
import { PrediksiPanen } from './pages/dashboard/PrediksiPanen';
import { Keuangan } from './pages/dashboard/Keuangan';
import { Marketplace } from './pages/dashboard/Marketplace';
import { AdminPanel } from './pages/dashboard/AdminPanel';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userRole: 'petani' | 'pembeli' | 'admin' = 'petani';

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                userRole={userRole}
            />

            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    userRole={userRole}
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route index element={<Navigate to="overview" />} />
                        <Route path="overview" element={<DashboardOverview />} />
                        <Route path="deteksi" element={<DeteksiPenyakit />} />
                        <Route path="rekomendasi" element={<RekomendasiAgronomi />} />
                        <Route path="lahan" element={<ManajemenLahan />} />
                        <Route path="panen" element={<PrediksiPanen />} />
                        <Route path="keuangan" element={<Keuangan />} />
                        <Route path="marketplace" element={<Marketplace />} />
                        <Route path="admin" element={<AdminPanel />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
