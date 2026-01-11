import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    CloudRain,
    Sprout,
    TrendingUp
} from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useBmkgJakarta } from '../../hooks/useBmkgJakarta';
import { useWeather } from '../../hooks/useWeather';

const trendData = [
    { bulan: 'Jan', kesehatan: 85 },
    { bulan: 'Feb', kesehatan: 88 },
    { bulan: 'Mar', kesehatan: 82 },
    { bulan: 'Apr', kesehatan: 90 },
    { bulan: 'Mei', kesehatan: 92 },
    { bulan: 'Jun', kesehatan: 89 },
];



export function DashboardOverview() {
    const { data: cuaca, loading } = useBmkgJakarta();
    const weather = useWeather(cuaca);

    if (loading || !cuaca) {
        return <p>Memuat cuaca BMKG…</p>;
    }

    const hujanLebat = cuaca.hujan >= 20;


    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Dashboard Utama</h2>
                <p className="text-gray-500 mt-1">Ringkasan kondisi pertanian Anda hari ini</p>
            </div>

            {/* Alert Cuaca */}
            <div
                className={`rounded-xl p-4 border flex gap-3
  ${hujanLebat
                        ? 'bg-red-50 border-red-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}
            >
                <CloudRain className="w-5 h-5 mt-0.5" />
                <div>
                    <p className="font-medium">
                        {hujanLebat ? 'Peringatan Cuaca Ekstrem' : 'Peringatan Cuaca'}
                    </p>
                    <p className="text-sm mt-1">
                        Hujan {cuaca.hujan} mm • Suhu {cuaca.suhu}°C • RH {cuaca.kelembaban}%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Sumber: BMKG</p>
                </div>
            </div>



            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-2xl text-green-600">4</span>
                    </div>
                    <p className="text-gray-600">Lahan Aktif</p>
                    <p className="text-xs text-gray-500 mt-1">Total 3.5 hektar</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-2xl text-green-600">89%</span>
                    </div>
                    <p className="text-gray-600">Kesehatan Rata-rata</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +3% dari minggu lalu
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-2xl text-amber-600">1</span>
                    </div>
                    <p className="text-gray-600">Lahan Waspada</p>
                    <p className="text-xs text-amber-600 mt-1">Perlu perhatian khusus</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-2xl text-blue-600">45</span>
                    </div>
                    <p className="text-gray-600">Hari ke Panen</p>
                    <p className="text-xs text-gray-500 mt-1">Est. 15 Agustus 2025</p>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Status Kesehatan Tanaman */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Status Kesehatan Tanaman</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <div>
                                    <p className="text-gray-900">Lahan A - Padi</p>
                                    <p className="text-sm text-gray-600">1.2 ha • Sehat</p>
                                </div>
                            </div>
                            <span className="text-green-700">95%</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <div>
                                    <p className="text-gray-900">Lahan B - Jagung</p>
                                    <p className="text-sm text-gray-600">0.8 ha • Sehat</p>
                                </div>
                            </div>
                            <span className="text-green-700">91%</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                                <div>
                                    <p className="text-gray-900">Lahan C - Cabai</p>
                                    <p className="text-sm text-gray-600">0.5 ha • Waspada</p>
                                </div>
                            </div>
                            <span className="text-amber-700">72%</span>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full" />
                                <div>
                                    <p className="text-gray-900">Lahan D - Tomat</p>
                                    <p className="text-sm text-gray-600">1.0 ha • Sehat</p>
                                </div>
                            </div>
                            <span className="text-green-700">88%</span>
                        </div>
                    </div>
                </div>

                {/* Tren Kesehatan */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Tren Kesehatan (6 Bulan)</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="kesehatan"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Estimasi Panen */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Estimasi Panen Mendatang</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 mb-2">Lahan A - Padi</p>
                        <p className="text-2xl text-gray-900">7.2 ton</p>
                        <p className="text-xs text-gray-500 mt-1">Est. 15 Agt 2025</p>
                        <div className="mt-3 bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">75 hari dari 90 hari</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 mb-2">Lahan B - Jagung</p>
                        <p className="text-2xl text-gray-900">4.8 ton</p>
                        <p className="text-xs text-gray-500 mt-1">Est. 10 Agt 2025</p>
                        <div className="mt-3 bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">70 hari dari 85 hari</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 mb-2">Lahan C - Cabai</p>
                        <p className="text-2xl text-gray-900">1.2 ton</p>
                        <p className="text-xs text-gray-500 mt-1">Est. 25 Jul 2025</p>
                        <div className="mt-3 bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">54 hari dari 60 hari</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-600 mb-2">Lahan D - Tomat</p>
                        <p className="text-2xl text-gray-900">3.5 ton</p>
                        <p className="text-xs text-gray-500 mt-1">Est. 5 Agt 2025</p>
                        <div className="mt-3 bg-gray-100 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">68 hari dari 80 hari</p>
                    </div>
                </div>
            </div>

            {/* Notifikasi & Aksi */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Tindakan yang Perlu Dilakukan</h3>
                <div className="space-y-3">
                    <div
                        className={`flex items-start gap-3 p-4 rounded-lg border
  ${weather.risk === 'bahaya'
                                ? 'bg-red-50 border-red-200'
                                : weather.risk === 'waspada'
                                    ? 'bg-amber-50 border-amber-200'
                                    : 'bg-green-50 border-green-200'
                            }`}
                    >
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="font-medium">{weather.actionTitle}</p>
                            <p className="text-sm mt-1">{weather.actionDescription}</p>
                        </div>
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm">
                            Lihat Detail
                        </button>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-blue-900">Jadwal pemupukan Lahan A & B besok</p>
                            <p className="text-sm text-blue-700 mt-1">Siapkan pupuk NPK 15-15-15 sebanyak 50 kg</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                            Lihat Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
