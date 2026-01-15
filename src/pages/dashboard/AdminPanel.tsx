import {
    Activity,
    AlertTriangle,
    BookOpen,
    CheckCircle2,
    FileText,
    MapPin,
    TrendingUp,
    Users
} from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const wilayahStats = [
    { wilayah: 'Jawa Barat', petani: 245, lahan: 876, kesehatan: 87 },
    { wilayah: 'Jawa Tengah', petani: 198, lahan: 654, kesehatan: 85 },
    { wilayah: 'Jawa Timur', petani: 312, lahan: 1023, kesehatan: 89 },
    { wilayah: 'Banten', petani: 156, lahan: 432, kesehatan: 82 },
    { wilayah: 'DI Yogyakarta', petani: 89, lahan: 234, kesehatan: 90 },
];

const statusDistribusi = [
    { name: 'Sehat', value: 72, color: '#10b981' },
    { name: 'Waspada', value: 23, color: '#f59e0b' },
    { name: 'Berisiko', value: 5, color: '#ef4444' },
];

const komoditasData = [
    { komoditas: 'Padi', luas: 2450, petani: 450 },
    { komoditas: 'Jagung', luas: 1890, petani: 380 },
    { komoditas: 'Cabai', luas: 890, petani: 280 },
    { komoditas: 'Tomat', luas: 760, petani: 210 },
    { komoditas: 'Bawang', luas: 650, petani: 190 },
];

const validasiQueue = [
    { id: 1, petani: 'Budi Santoso', lokasi: 'Sukamaju, Jabar', komoditas: 'Padi', tanggal: '2025-06-28', status: 'pending' },
    { id: 2, petani: 'Ahmad Rifai', lokasi: 'Makmur, Jateng', komoditas: 'Cabai', tanggal: '2025-06-28', status: 'pending' },
    { id: 3, petani: 'Siti Nurhaliza', lokasi: 'Sejahtera, Jatim', komoditas: 'Tomat', tanggal: '2025-06-27', status: 'pending' },
];

const edukasiMateri = [
    { judul: 'Panduan Pengendalian Hama Terpadu', kategori: 'Pest Management', views: 1234, downloads: 456 },
    { judul: 'Teknik Budidaya Padi Organik', kategori: 'Agronomi', views: 2341, downloads: 892 },
    { judul: 'Optimalisasi Pemupukan Berimbang', kategori: 'Nutrisi', views: 1876, downloads: 654 },
    { judul: 'Sistem Irigasi Hemat Air', kategori: 'Teknologi', views: 1543, downloads: 521 },
];

export function AdminPanel() {
    const totalPetani = wilayahStats.reduce((sum, item) => sum + item.petani, 0);
    const totalLahan = wilayahStats.reduce((sum, item) => sum + item.lahan, 0);
    const avgKesehatan = Math.round(wilayahStats.reduce((sum, item) => sum + item.kesehatan, 0) / wilayahStats.length);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Panel Admin & Penyuluh</h2>
                <p className="text-gray-500 mt-1">
                    Monitoring agregat, validasi data, dan manajemen edukasi
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Users className="w-8 h-8 text-green-600" />
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{totalPetani}</p>
                    <p className="text-gray-600 mt-1">Total Petani</p>
                    <p className="text-xs text-green-600 mt-1">+12% bulan ini</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{totalLahan}</p>
                    <p className="text-gray-600 mt-1">Lahan Terdaftar</p>
                    <p className="text-xs text-gray-500 mt-1">{(totalLahan / 100).toFixed(1)} ribu hektar</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Activity className="w-8 h-8 text-amber-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{avgKesehatan}%</p>
                    <p className="text-gray-600 mt-1">Kesehatan Rata-rata</p>
                    <p className="text-xs text-gray-500 mt-1">Seluruh wilayah</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{validasiQueue.length}</p>
                    <p className="text-gray-600 mt-1">Validasi Pending</p>
                    <p className="text-xs text-red-600 mt-1">Perlu review</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regional Stats */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Statistik per Wilayah</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={wilayahStats}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="wilayah" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="petani" fill="#10b981" name="Petani" radius={[8, 8, 0, 0]} />
                            <Bar dataKey="lahan" fill="#3b82f6" name="Lahan" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Health Distribution */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Distribusi Status Kesehatan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusDistribusi}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {statusDistribusi.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        {statusDistribusi.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-gray-700">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Commodity Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Overview Komoditas Nasional</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-gray-700">Komoditas</th>
                                <th className="text-right py-3 px-4 text-gray-700">Luas Tanam (ha)</th>
                                <th className="text-right py-3 px-4 text-gray-700">Jumlah Petani</th>
                                <th className="text-right py-3 px-4 text-gray-700">Rata-rata per Petani</th>
                                <th className="text-center py-3 px-4 text-gray-700">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {komoditasData.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-900">{item.komoditas}</td>
                                    <td className="py-3 px-4 text-right text-gray-900">
                                        {item.luas.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-900">
                                        {item.petani}
                                    </td>
                                    <td className="py-3 px-4 text-right text-gray-600">
                                        {(item.luas / item.petani).toFixed(2)} ha
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span className="text-green-600 flex items-center justify-center gap-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="text-sm">+{(Math.random() * 10 + 2).toFixed(1)}%</span>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Validation Queue */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">Antrian Validasi Deteksi Penyakit</h3>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200">
                        {validasiQueue.length} Pending
                    </span>
                </div>
                <div className="space-y-3">
                    {validasiQueue.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-gray-900">{item.petani}</p>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-sm text-gray-600">{item.lokasi}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span>Komoditas: {item.komoditas}</span>
                                    <span>•</span>
                                    <span>Tanggal: {new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    Validasi
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Education Module */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-900">Modul Edukasi & Dokumentasi</h3>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Tambah Materi</span>
                    </button>
                </div>
                <div className="space-y-3">
                    {edukasiMateri.map((materi, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="w-8 h-8 text-blue-600 shrink-0" />
                            <div className="flex-1">
                                <p className="text-gray-900">{materi.judul}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                        {materi.kategori}
                                    </span>
                                    <span>{materi.views.toLocaleString()} views</span>
                                    <span>•</span>
                                    <span>{materi.downloads.toLocaleString()} downloads</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    Edit
                                </button>
                                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                    Lihat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
                    <p className="text-green-900 mb-1">Data Terverifikasi</p>
                    <p className="text-sm text-green-700">
                        87% data petani telah tervalidasi dan dapat dipercaya
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                    <Users className="w-8 h-8 text-blue-600 mb-3" />
                    <p className="text-blue-900 mb-1">Engagement Tinggi</p>
                    <p className="text-sm text-blue-700">
                        Rata-rata petani aktif menggunakan sistem 4.2x per minggu
                    </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <Activity className="w-8 h-8 text-amber-600 mb-3" />
                    <p className="text-amber-900 mb-1">Monitoring Real-time</p>
                    <p className="text-sm text-amber-700">
                        Data kesehatan tanaman diupdate setiap 24 jam
                    </p>
                </div>
            </div>

            {/* Export & Reports */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Laporan & Export Data</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Export Data Petani
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Laporan Bulanan
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Statistik Wilayah
                    </button>
                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Analisis Komoditas
                    </button>
                </div>
            </div>
        </div>
    );
}
