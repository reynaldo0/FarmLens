import { Calendar, Droplet, Edit, Map, Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { lahanData } from '../../data/lahanData';
import { motion } from "framer-motion";

export function ManajemenLahan() {
    const [selectedLahan, setSelectedLahan] = useState(lahanData[0]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Sehat': return 'bg-green-100 text-green-700 border-green-200';
            case 'Waspada': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Berisiko': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const TOTAL_GROWTH_DAYS = 120;

    
    
    const calculateDaysToHarvest = (harvestDate: string) => {
        const today = new Date('2025-06-29');
        const harvest = new Date(harvestDate);
        const diff = Math.ceil((harvest.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff;
    };
    
    const progress =
        Math.max(
            0,
            Math.min(
                100,
                100 -
                (calculateDaysToHarvest(selectedLahan.harvestDate) /
                    TOTAL_GROWTH_DAYS) *
                100
            )
        );
    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl
             bg-linear-to-br from-green-50 via-white to-green-100
             border border-green-200 p-6 flex items-center justify-between"
            >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-green-700">
                        🗺️ Digital Farm Management
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                        Manajemen Lahan
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Pencatatan dan monitoring seluruh lahan pertanian secara digital & real-time
                    </p>
                </div>

                <button
                    className="relative z-10 px-5 py-3
               bg-linear-to-r from-green-600 to-green-500
               text-white rounded-xl shadow-md
               hover:brightness-110 transition flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    <span className="hidden sm:inline">Tambah Lahan</span>
                </button>
            </motion.div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <motion.div whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-5 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-2">
                        <Map className="w-8 h-8 text-green-600" />
                        <span className="text-2xl text-gray-900">4</span>
                    </div>
                    <p className="text-gray-600">Total Lahan</p>
                    <p className="text-xs text-gray-500 mt-1">3.5 hektar</p>
                </motion.div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl text-gray-900">16.7</span>
                    </div>
                    <p className="text-gray-600">Est. Panen Total</p>
                    <p className="text-xs text-gray-500 mt-1">ton (musim ini)</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Calendar className="w-8 h-8 text-amber-600" />
                        <span className="text-2xl text-gray-900">37</span>
                    </div>
                    <p className="text-gray-600">Rata-rata Hari ke Panen</p>
                    <p className="text-xs text-gray-500 mt-1">dari 4 lahan</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Droplet className="w-8 h-8 text-cyan-600" />
                        <span className="text-2xl text-gray-900">89%</span>
                    </div>
                    <p className="text-gray-600">Kesehatan Rata-rata</p>
                    <p className="text-xs text-green-600 mt-1">↑ Baik</p>
                </div>
            </div>

            {/* Lahan List & Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lahan Cards */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Daftar Lahan</h3>
                    <div className="space-y-3">
                        {lahanData.map((lahan) => (
                            <motion.button
                                key={lahan.id}
                                onClick={() => setSelectedLahan(lahan)}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                                className={`w-full text-left p-4 rounded-2xl border transition-all
    ${selectedLahan.id === lahan.id
                                        ? "border-green-500 bg-green-50 shadow-md"
                                        : "border-gray-200 hover:border-green-300 hover:shadow-sm"
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="text-gray-900">{lahan.name}</p>
                                        <p className="text-sm text-gray-600">{lahan.crop} • {lahan.area} ha</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(lahan.status)}`}>
                                        {lahan.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full ${lahan.health >= 90 ? 'bg-green-500' :
                                                lahan.health >= 75 ? 'bg-amber-500' :
                                                    'bg-red-500'
                                                }`}
                                            style={{ width: `${lahan.health}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-gray-600">{lahan.health}%</span>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Detail Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Lahan Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-gray-900">{selectedLahan.name}</h3>
                                <p className="text-gray-600 mt-1">{selectedLahan.location}</p>
                            </div>
                            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Luas Lahan</p>
                                <p className="text-gray-900">{selectedLahan.area} ha</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Komoditas</p>
                                <p className="text-gray-900">{selectedLahan.crop}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Varietas</p>
                                <p className="text-gray-900">{selectedLahan.variety}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Kesehatan</p>
                                <p className={`${selectedLahan.health >= 90 ? 'text-green-600' :
                                    selectedLahan.health >= 75 ? 'text-amber-600' :
                                        'text-red-600'
                                    }`}>{selectedLahan.health}%</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tanggal Tanam</p>
                                <p className="text-gray-900">{new Date(selectedLahan.plantDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Estimasi Panen</p>
                                <p className="text-gray-900">{new Date(selectedLahan.harvestDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-sm text-gray-600 mb-2">Progress ke Panen</p>
                                <div className="bg-gray-200 rounded-full h-3">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="bg-green-500 h-3 rounded-full"
                                        style={{
                                            width: `${Math.max(0, Math.min(100, 100 - (calculateDaysToHarvest(selectedLahan.harvestDate) / 120 * 100)))}%`
                                        }}
                                    />
                                </div>
                                <p className="text-xs text-gray-600 mt-1">
                                    {calculateDaysToHarvest(selectedLahan.harvestDate)} hari lagi
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Activity History */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Riwayat Aktivitas Terkini</h3>
                        <div className="space-y-3">
                            {selectedLahan.activities.map((activity, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0" />
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-gray-900">{activity.activity}</p>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{activity.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Lihat Semua Riwayat
                        </button>
                    </div>

                    {/* Yield Trend */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Tren Hasil Panen (4 Musim Terakhir)</h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={selectedLahan.yieldHistory}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="musim" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 12 }} label={{ value: 'Ton', angle: -90, position: 'insideLeft' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar dataKey="hasil" fill="#10b981" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-900">
                                📈 Peningkatan produktivitas {
                                    ((selectedLahan.yieldHistory[selectedLahan.yieldHistory.length - 1].hasil -
                                        selectedLahan.yieldHistory[0].hasil) /
                                        selectedLahan.yieldHistory[0].hasil * 100).toFixed(1)
                                }% dalam 1 tahun terakhir
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
