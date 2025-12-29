import { AlertCircle, Calendar, CheckCircle2, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const harvestPredictions = [
    {
        lahan: 'Lahan A - Padi',
        estimasiMin: 6.8,
        estimasiMax: 7.5,
        estimasiAvg: 7.2,
        tanggalPanen: '2025-08-15',
        reliabilitas: 92,
        status: 'optimal',
        kualitas: 'Grade A',
        hargaPasar: 5500,
    },
    {
        lahan: 'Lahan B - Jagung',
        estimasiMin: 4.5,
        estimasiMax: 5.0,
        estimasiAvg: 4.8,
        tanggalPanen: '2025-08-10',
        reliabilitas: 89,
        status: 'optimal',
        kualitas: 'Grade A',
        hargaPasar: 4200,
    },
    {
        lahan: 'Lahan C - Cabai',
        estimasiMin: 1.0,
        estimasiMax: 1.4,
        estimasiAvg: 1.2,
        tanggalPanen: '2025-07-25',
        reliabilitas: 78,
        status: 'waspada',
        kualitas: 'Grade B',
        hargaPasar: 18000,
    },
    {
        lahan: 'Lahan D - Tomat',
        estimasiMin: 3.2,
        estimasiMax: 3.7,
        estimasiAvg: 3.5,
        tanggalPanen: '2025-08-05',
        reliabilitas: 87,
        status: 'optimal',
        kualitas: 'Grade A',
        hargaPasar: 6500,
    },
];

const monthlyForecast = [
    { bulan: 'Jul', panen: 1.2, target: 1.4 },
    { bulan: 'Agt', panen: 16.5, target: 15.5 },
    { bulan: 'Sep', panen: 0, target: 0 },
    { bulan: 'Okt', panen: 0, target: 0 },
    { bulan: 'Nov', panen: 8.2, target: 8.0 },
    { bulan: 'Des', panen: 5.5, target: 6.0 },
];

const compareData = [
    { kategori: 'Musim Lalu', volume: 15.8 },
    { kategori: 'Prediksi Saat Ini', volume: 16.7 },
    { kategori: 'Target Optimal', volume: 17.5 },
];

export function PrediksiPanen() {
    const totalEstimasi = harvestPredictions.reduce((sum, item) => sum + item.estimasiAvg, 0);
    const totalRevenue = harvestPredictions.reduce((sum, item) => sum + (item.estimasiAvg * item.hargaPasar * 1000), 0);
    const avgReliabilitas = harvestPredictions.reduce((sum, item) => sum + item.reliabilitas, 0) / harvestPredictions.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Prediksi Panen & Perencanaan</h2>
                <p className="text-gray-500 mt-1">
                    Estimasi hasil panen berdasarkan kondisi lahan dan analisis AI
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Package className="w-8 h-8 text-green-600" />
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{totalEstimasi.toFixed(1)} ton</p>
                    <p className="text-gray-600 mt-1">Total Est. Panen</p>
                    <p className="text-xs text-green-600 mt-1">+5.7% vs musim lalu</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <DollarSign className="w-8 h-8 text-blue-600" />
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl text-gray-900">Rp {(totalRevenue / 1000000).toFixed(1)}jt</p>
                    <p className="text-gray-600 mt-1">Est. Pendapatan</p>
                    <p className="text-xs text-gray-500 mt-1">Harga pasar saat ini</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <CheckCircle2 className="w-8 h-8 text-amber-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{avgReliabilitas.toFixed(0)}%</p>
                    <p className="text-gray-600 mt-1">Reliabilitas</p>
                    <p className="text-xs text-gray-500 mt-1">Akurasi prediksi</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Calendar className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-2xl text-gray-900">27-47</p>
                    <p className="text-gray-600 mt-1">Hari ke Panen</p>
                    <p className="text-xs text-gray-500 mt-1">Rentang waktu</p>
                </div>
            </div>

            {/* Predictions Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Detail Prediksi per Lahan</h3>
                <div className="space-y-4">
                    {harvestPredictions.map((pred, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <p className="text-gray-900">{pred.lahan}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Target: {new Date(pred.tanggalPanen).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm border ${pred.status === 'optimal'
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-amber-100 text-amber-700 border-amber-200'
                                    }`}>
                                    {pred.status === 'optimal' ? 'Optimal' : 'Waspada'}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Estimasi Volume</p>
                                    <p className="text-gray-900">{pred.estimasiAvg} ton</p>
                                    <p className="text-xs text-gray-500 mt-1">{pred.estimasiMin} - {pred.estimasiMax} ton</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Kualitas Prediksi</p>
                                    <p className="text-gray-900">{pred.kualitas}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Harga Pasar</p>
                                    <p className="text-gray-900">Rp {pred.hargaPasar.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500 mt-1">per kg</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-xs text-gray-600 mb-1">Est. Pendapatan</p>
                                    <p className="text-gray-900">
                                        Rp {((pred.estimasiAvg * pred.hargaPasar * 1000) / 1000000).toFixed(1)}jt
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-gray-600">Reliabilitas Prediksi</span>
                                        <span className="text-gray-900">{pred.reliabilitas}%</span>
                                    </div>
                                    <div className="bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${pred.reliabilitas >= 90 ? 'bg-green-500' :
                                                    pred.reliabilitas >= 80 ? 'bg-blue-500' :
                                                        'bg-amber-500'
                                                }`}
                                            style={{ width: `${pred.reliabilitas}%` }}
                                        />
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors whitespace-nowrap">
                                    Rencanakan Penjualan
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Forecast */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Proyeksi Panen 6 Bulan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyForecast}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} label={{ value: 'Ton', angle: -90, position: 'insideLeft' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="panen"
                                stroke="#10b981"
                                strokeWidth={3}
                                name="Prediksi Panen"
                                dot={{ fill: '#10b981', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#94a3b8"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                                dot={{ fill: '#94a3b8', r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Comparison */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Perbandingan Hasil</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={compareData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" tick={{ fontSize: 12 }} label={{ value: 'Ton', position: 'bottom' }} />
                            <YAxis dataKey="kategori" type="category" tick={{ fontSize: 12 }} width={120} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="volume" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                            💡 Prediksi musim ini menunjukkan peningkatan 5.7% dibanding musim lalu
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Rekomendasi Tindakan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-green-900">Optimalisasi Lahan A & B</p>
                                <p className="text-sm text-green-700 mt-1">
                                    Kondisi optimal. Pertahankan pola perawatan saat ini untuk mencapai target maksimal.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-amber-900">Perhatian Khusus Lahan C</p>
                                <p className="text-sm text-amber-700 mt-1">
                                    Reliabilitas 78%. Tingkatkan monitoring dan penanganan penyakit untuk menjaga kualitas.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-blue-900">Rencanakan Penjualan Awal</p>
                                <p className="text-sm text-blue-700 mt-1">
                                    Hubungi pembeli potensial 2-3 minggu sebelum panen untuk harga terbaik.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-purple-900">Persiapan Pasca Panen</p>
                                <p className="text-sm text-purple-700 mt-1">
                                    Siapkan gudang penyimpanan dan logistik distribusi sejak sekarang.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
                <div className="flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white mb-2">Siap Merencanakan Penjualan?</h3>
                        <p className="text-green-100">
                            Hubungi pembeli melalui marketplace atau konsultasi dengan tim marketing kami untuk mendapatkan harga terbaik.
                        </p>
                    </div>
                    <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors whitespace-nowrap">
                        Akses Marketplace
                    </button>
                </div>
            </div>
        </div>
    );
}
