import {
    AlertTriangle,
    Bug,
    Calendar,
    CheckCircle2,
    Clock,
    Droplet,
    Sprout,
    Sun
} from 'lucide-react';

const recommendations = [
    {
        id: 1,
        priority: 'urgent',
        title: 'Penyiraman Intensif',
        location: 'Lahan C - Cabai',
        action: 'Tingkatkan frekuensi penyiraman menjadi 2x sehari (pagi & sore)',
        reason: 'Suhu tinggi (>32°C) terdeteksi, tanaman membutuhkan kelembaban ekstra',
        deadline: 'Hari ini',
        icon: <Droplet className="w-5 h-5" />,
        status: 'pending'
    },
    {
        id: 2,
        priority: 'high',
        title: 'Aplikasi Fungisida',
        location: 'Lahan C - Cabai',
        action: 'Semprot fungisida berbahan aktif mankozeb 80% dengan dosis 2g/liter',
        reason: 'Deteksi bercak daun pada analisis terakhir',
        deadline: 'Besok pagi (06:00-09:00)',
        icon: <Bug className="w-5 h-5" />,
        status: 'pending'
    },
    {
        id: 3,
        priority: 'medium',
        title: 'Pemupukan Susulan',
        location: 'Lahan A & B',
        action: 'Aplikasi pupuk NPK 15-15-15 sebanyak 50 kg (25 kg per lahan)',
        reason: 'Fase pertumbuhan vegetatif memerlukan nutrisi tambahan',
        deadline: '30 Juni 2025',
        icon: <Sprout className="w-5 h-5" />,
        status: 'scheduled'
    },
    {
        id: 4,
        priority: 'low',
        title: 'Penyiangan Gulma',
        location: 'Lahan D - Tomat',
        action: 'Bersihkan gulma di sekitar tanaman, terutama area parit',
        reason: 'Gulma dapat menjadi inang hama dan bersaing nutrisi',
        deadline: '3 Juli 2025',
        icon: <Sun className="w-5 h-5" />,
        status: 'upcoming'
    },
    {
        id: 5,
        priority: 'info',
        title: 'Monitoring Rutin',
        location: 'Semua Lahan',
        action: 'Lakukan inspeksi visual harian untuk deteksi dini masalah',
        reason: 'Pencegahan lebih baik daripada penanganan',
        deadline: 'Setiap hari',
        icon: <Calendar className="w-5 h-5" />,
        status: 'ongoing'
    }
];

const weatherSchedule = [
    { day: 'Hari ini', date: '29 Jun', weather: 'Cerah', temp: '28-34°C', rain: '10%', suitable: true },
    { day: 'Besok', date: '30 Jun', weather: 'Cerah', temp: '27-33°C', rain: '15%', suitable: true },
    { day: 'Lusa', date: '1 Jul', weather: 'Hujan', temp: '24-28°C', rain: '80%', suitable: false },
    { day: 'Rabu', date: '2 Jul', weather: 'Hujan', temp: '23-27°C', rain: '75%', suitable: false },
    { day: 'Kamis', date: '3 Jul', weather: 'Berawan', temp: '25-30°C', rain: '30%', suitable: true },
];

export function RekomendasiAgronomi() {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'border-red-300 bg-red-50';
            case 'high': return 'border-amber-300 bg-amber-50';
            case 'medium': return 'border-blue-300 bg-blue-50';
            case 'low': return 'border-green-300 bg-green-50';
            default: return 'border-gray-300 bg-gray-50';
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
            case 'high': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'low': return 'bg-green-100 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Rekomendasi Agronomi</h2>
                <p className="text-gray-500 mt-1">
                    Panduan tindakan berdasarkan kondisi lahan, cuaca, dan analisis AI
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Mendesak</p>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-700">2</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Terjadwal</p>
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700">3</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Selesai Minggu Ini</p>
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700">7</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">Berkelanjutan</p>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-700">1</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recommendations List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Daftar Rekomendasi</h3>
                        <div className="space-y-3">
                            {recommendations.map((rec) => (
                                <div
                                    key={rec.id}
                                    className={`border rounded-xl p-4 ${getPriorityColor(rec.priority)}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${rec.priority === 'urgent' ? 'bg-red-200 text-red-700' :
                                                rec.priority === 'high' ? 'bg-amber-200 text-amber-700' :
                                                    rec.priority === 'medium' ? 'bg-blue-200 text-blue-700' :
                                                        rec.priority === 'low' ? 'bg-green-200 text-green-700' :
                                                            'bg-gray-200 text-gray-700'
                                            }`}>
                                            {rec.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div>
                                                    <p className="text-gray-900">{rec.title}</p>
                                                    <p className="text-sm text-gray-600">{rec.location}</p>
                                                </div>
                                                <span className={`px-2 py-1 rounded-full text-xs border whitespace-nowrap ${getPriorityBadge(rec.priority)}`}>
                                                    {rec.priority === 'urgent' ? 'Mendesak' :
                                                        rec.priority === 'high' ? 'Tinggi' :
                                                            rec.priority === 'medium' ? 'Sedang' :
                                                                rec.priority === 'low' ? 'Rendah' : 'Info'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mb-2">{rec.action}</p>
                                            <div className="flex items-center gap-4 text-xs text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    <span>{rec.reason}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-300">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm text-gray-700">Target: {rec.deadline}</span>
                                                <button className="ml-auto px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                                    Tandai Selesai
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Weather & Schedule */}
                <div className="space-y-6">
                    {/* Weather Forecast */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Prakiraan Cuaca 5 Hari</h3>
                        <div className="space-y-3">
                            {weatherSchedule.map((day, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg border ${day.suitable
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-red-50 border-red-200'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <p className="text-sm text-gray-900">{day.day}</p>
                                            <p className="text-xs text-gray-600">{day.date}</p>
                                        </div>
                                        <div className={`px-2 py-1 rounded-full text-xs ${day.suitable
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}>
                                            {day.suitable ? 'Cocok' : 'Tidak Cocok'}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-600 space-y-1">
                                        <p>Cuaca: {day.weather}</p>
                                        <p>Suhu: {day.temp}</p>
                                        <p>Hujan: {day.rain}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
                            💡 Hindari penyemprotan pestisida saat hujan. Aplikasi pupuk cair
                            lebih efektif saat cuaca cerah.
                        </p>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-gray-900 mb-4">Aksi Cepat</h3>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-left flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Catat Aktivitas Hari Ini</span>
                            </button>
                            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                <span>Atur Pengingat</span>
                            </button>
                            <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center gap-3">
                                <Sprout className="w-5 h-5" />
                                <span>Konsultasi Penyuluh</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Aktivitas Selesai (7 Hari Terakhir)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <p className="text-gray-900">Pemupukan Dasar</p>
                        </div>
                        <p className="text-sm text-gray-600">Lahan A & B • 25 Jun</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <p className="text-gray-900">Penyiangan Gulma</p>
                        </div>
                        <p className="text-sm text-gray-600">Lahan C • 24 Jun</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <p className="text-gray-900">Inspeksi Hama</p>
                        </div>
                        <p className="text-sm text-gray-600">Semua Lahan • 23 Jun</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
