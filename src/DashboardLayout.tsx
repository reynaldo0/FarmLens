import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import DashboardHeader from './components/DashboardHeader';
import Sidebar from './components/DashboardSidebar';

import DashboardPageTransition from './components/DashboardTransition';
import { AdminPanel } from './pages/dashboard/AdminPanel';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { DeteksiPenyakit } from './pages/dashboard/DeteksiPenyakit';
import { Keuangan } from './pages/dashboard/Keuangan';
import { ManajemenLahan } from './pages/dashboard/ManajemenLahan';
import { Marketplace } from './pages/dashboard/Marketplace';
import { PrediksiPanen } from './pages/dashboard/PrediksiPanen';
import { RekomendasiAgronomi } from './pages/dashboard/RekomendasiAgronomi';
import { WeatherRecommendationCard } from './pages/dashboard/Weather';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userRole: 'petani' | 'pembeli' | 'admin' = 'petani';

    const location = useLocation();

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
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route index element={<Navigate to="overview" replace />} />

                            <Route
                                path="overview"
                                element={
                                    <DashboardPageTransition>
                                        <DashboardOverview />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="deteksi"
                                element={
                                    <DashboardPageTransition>
                                        <DeteksiPenyakit />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="rekomendasi"
                                element={
                                    <DashboardPageTransition>
                                        <RekomendasiAgronomi />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="lahan"
                                element={
                                    <DashboardPageTransition>
                                        <ManajemenLahan />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="panen"
                                element={
                                    <DashboardPageTransition>
                                        <PrediksiPanen />
                                    </DashboardPageTransition>
                                }
                            />
                            <Route
                                path="weather"
                                element={
                                    <DashboardPageTransition>
                                        <WeatherRecommendationCard />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="keuangan"
                                element={
                                    <DashboardPageTransition>
                                        <Keuangan />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="marketplace"
                                element={
                                    <DashboardPageTransition>
                                        <Marketplace />
                                    </DashboardPageTransition>
                                }
                            />

                            <Route
                                path="admin"
                                element={
                                    <DashboardPageTransition>
                                        <AdminPanel />
                                    </DashboardPageTransition>
                                }
                            />
                        </Routes>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
