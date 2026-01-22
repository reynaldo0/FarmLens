import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import DashboardHeader from "./components/DashboardHeader";
import Sidebar from "./components/DashboardSidebar";
import DashboardPageTransition from "./components/DashboardTransition";

import { AdminPanel } from "./pages/dashboard/AdminPanel";
import { DashboardOverview } from "./pages/dashboard/DashboardOverview";
import { DeteksiPenyakit } from "./pages/dashboard/DeteksiPenyakit";
import { HamaPrediction } from "./pages/dashboard/HamaPrediction";
import { Keuangan } from "./pages/dashboard/Keuangan";
import { ManajemenLahan } from "./pages/dashboard/ManajemenLahan";
import Marketplace from "./pages/dashboard/Marketplace";
import { PrediksiPanen } from "./pages/dashboard/PrediksiPanen";
import { RekomendasiAgronomi } from "./pages/dashboard/RekomendasiAgronomi";
import { WeatherRecommendationCard } from "./pages/dashboard/Weather";
import Journaling from "./pages/dashboard/Journaling";

import { getAuth } from "./utils/auth"; // sesuaikan path kalau utils ada di src/utils/auth
import RequireRole from "./components/RequiredRole";
import MarketplaceOwnerPanel from "./pages/dashboard/marketplace/MarketplaceOwnerPanel";
import MarketplaceOnBoarding from "./pages/dashboard/marketplace/MarletplaceOnBoarding";

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const user = getAuth();
    const userRole = user?.role; // "petani" | "pemilik_marketplace" | "pembeli" | "admin" | undefined

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    userRole={userRole ?? "petani"} // fallback biar prop Sidebar tidak error
                />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            {/* OVERVIEW: semua role yang sudah login */}
                            <Route
                                path="overview"
                                element={
                                    <RequireRole allow={["petani", "pemilik_marketplace", "pembeli", "admin"]}>
                                        <DashboardPageTransition>
                                            <DashboardOverview />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            {/* FITUR PETANI */}
                            <Route
                                path="deteksi"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <DeteksiPenyakit />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="rekomendasi"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <RekomendasiAgronomi />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="lahan"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <ManajemenLahan />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="panen"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <PrediksiPanen />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="hama"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <HamaPrediction />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="journaling"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <Journaling />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="weather"
                                element={
                                    <RequireRole allow={["petani", "admin"]}>
                                        <DashboardPageTransition>
                                            <WeatherRecommendationCard />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="keuangan"
                                element={
                                    <RequireRole allow={["petani", "pemilik_marketplace", "admin"]}>
                                        <DashboardPageTransition>
                                            <Keuangan />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            {/* MARKETPLACE: bisa untuk petani (jual), pembeli (beli), pemilik_marketplace (kelola), admin */}
                            <Route
                                path="marketplace"
                                element={
                                    <RequireRole allow={["petani", "pemilik_marketplace", "pembeli", "admin"]}>
                                        <DashboardPageTransition>
                                            <Marketplace />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />
                            <Route
                                path="marketplace-owner"
                                element={
                                    <RequireRole allow={["pemilik_marketplace", "admin"]}>
                                        <DashboardPageTransition>
                                            <MarketplaceOwnerPanel />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            <Route
                                path="marketplace-onboarding"
                                element={
                                    <RequireRole allow={['pemilik_marketplace']}>
                                        <DashboardPageTransition>
                                            <MarketplaceOnBoarding />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />

                            {/* ADMIN PANEL: khusus admin */}
                            <Route
                                path="admin"
                                element={
                                    <RequireRole allow={["admin"]}>
                                        <DashboardPageTransition>
                                            <AdminPanel />
                                        </DashboardPageTransition>
                                    </RequireRole>
                                }
                            />
                        </Routes>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
