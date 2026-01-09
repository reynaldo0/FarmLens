import {
    Calendar,
    CheckCircle2,
    Filter,
    MapPin,
    Package,
    Search,
    Star,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

const listings = [
    {
        id: 1,
        komoditas: 'Padi - IR64',
        petani: 'Budi Santoso',
        lokasi: 'Desa Sukamaju, Jawa Barat',
        volume: 7.2,
        volumeRange: '6.8 - 7.5',
        tanggalPanen: '2025-08-15',
        harga: 5500,
        kualitas: 'Grade A',
        reliabilitas: 92,
        rating: 4.8,
        status: 'available',
        verified: true
    },
    {
        id: 2,
        komoditas: 'Jagung - Hibrida NK212',
        petani: 'Siti Rahayu',
        lokasi: 'Desa Makmur, Jawa Tengah',
        volume: 5.5,
        volumeRange: '5.2 - 5.8',
        tanggalPanen: '2025-08-12',
        harga: 4200,
        kualitas: 'Grade A',
        reliabilitas: 88,
        rating: 4.9,
        status: 'available',
        verified: true
    },
    {
        id: 3,
        komoditas: 'Cabai Merah Keriting',
        petani: 'Ahmad Dahlan',
        lokasi: 'Desa Sejahtera, Jawa Timur',
        volume: 2.5,
        volumeRange: '2.2 - 2.8',
        tanggalPanen: '2025-07-28',
        harga: 18000,
        kualitas: 'Grade A',
        reliabilitas: 90,
        rating: 4.7,
        status: 'available',
        verified: true
    },
    {
        id: 4,
        komoditas: 'Tomat Gondol',
        petani: 'Ibu Sari',
        lokasi: 'Desa Subur, Jawa Barat',
        volume: 4.0,
        volumeRange: '3.8 - 4.2',
        tanggalPanen: '2025-08-08',
        harga: 6500,
        kualitas: 'Grade A',
        reliabilitas: 87,
        rating: 4.6,
        status: 'available',
        verified: true
    },
    {
        id: 5,
        komoditas: 'Bawang Merah',
        petani: 'Pak Joko',
        lokasi: 'Desa Mekar, Jawa Tengah',
        volume: 3.2,
        volumeRange: '3.0 - 3.5',
        tanggalPanen: '2025-08-20',
        harga: 15000,
        kualitas: 'Grade B',
        reliabilitas: 85,
        rating: 4.5,
        status: 'reserved',
        verified: true
    },
    {
        id: 6,
        komoditas: 'Padi - Ciherang',
        petani: 'Kelompok Tani Maju',
        lokasi: 'Desa Tani, Jawa Barat',
        volume: 12.0,
        volumeRange: '11.5 - 12.5',
        tanggalPanen: '2025-08-18',
        harga: 5300,
        kualitas: 'Grade A',
        reliabilitas: 94,
        rating: 4.9,
        status: 'available',
        verified: true
    },
];

export function Marketplace() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredListings = listings.filter(item => {
        const matchSearch = item.komoditas.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = filterStatus === 'all' || item.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Marketplace Panen</h2>
                <p className="text-gray-500 mt-1">
                    Temukan komoditas pertanian dengan pasokan terprediksi dan terverifikasi
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Package className="w-8 h-8 text-green-600" />
                        <span className="text-2xl text-gray-900">{filteredListings.length}</span>
                    </div>
                    <p className="text-gray-600">Listing Tersedia</p>
                    <p className="text-xs text-gray-500 mt-1">Panen mendatang</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-blue-600" />
                        <span className="text-2xl text-gray-900">34.4</span>
                    </div>
                    <p className="text-gray-600">Total Volume</p>
                    <p className="text-xs text-gray-500 mt-1">ton (estimasi)</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <CheckCircle2 className="w-8 h-8 text-amber-600" />
                        <span className="text-2xl text-gray-900">89%</span>
                    </div>
                    <p className="text-gray-600">Reliabilitas</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata akurasi</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-2">
                        <Star className="w-8 h-8 text-yellow-600" />
                        <span className="text-2xl text-gray-900">4.7</span>
                    </div>
                    <p className="text-gray-600">Rating Petani</p>
                    <p className="text-xs text-gray-500 mt-1">Rata-rata</p>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari komoditas atau lokasi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="all">Semua Status</option>
                            <option value="available">Tersedia</option>
                            <option value="reserved">Dipesan</option>
                        </select>
                        <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredListings.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-gray-900">{item.komoditas}</h3>
                                        {item.verified && (
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">{item.petani}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm border ${item.status === 'available'
                                        ? 'bg-green-100 text-green-700 border-green-200'
                                        : 'bg-amber-100 text-amber-700 border-amber-200'
                                    }`}>
                                    {item.status === 'available' ? 'Tersedia' : 'Dipesan'}
                                </span>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Package className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-600">Volume</span>
                                    </div>
                                    <p className="text-gray-900">{item.volume} ton</p>
                                    <p className="text-xs text-gray-500">±{item.volumeRange} ton</p>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-600">Panen</span>
                                    </div>
                                    <p className="text-gray-900">
                                        {new Date(item.tanggalPanen).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Star className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-600">Kualitas</span>
                                    </div>
                                    <p className="text-gray-900">{item.kualitas}</p>
                                    <p className="text-xs text-gray-500">Rating {item.rating}/5</p>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-600">Harga</span>
                                    </div>
                                    <p className="text-gray-900">Rp {item.harga.toLocaleString()}</p>
                                    <p className="text-xs text-gray-500">per kg</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                <p className="text-sm text-blue-900">{item.lokasi}</p>
                            </div>

                            {/* Reliability */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-600">Reliabilitas Pasokan</span>
                                    <span className="text-gray-900">{item.reliabilitas}%</span>
                                </div>
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${item.reliabilitas >= 90 ? 'bg-green-500' :
                                                item.reliabilitas >= 80 ? 'bg-blue-500' :
                                                    'bg-amber-500'
                                            }`}
                                        style={{ width: `${item.reliabilitas}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Berdasarkan prediksi AI dan riwayat petani
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                {item.status === 'available' ? (
                                    <>
                                        <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            Hubungi Petani
                                        </button>
                                        <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                            Pesan Sekarang
                                        </button>
                                    </>
                                ) : (
                                    <button className="w-full px-4 py-3 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed">
                                        Sudah Dipesan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredListings.length === 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Tidak ada listing yang sesuai dengan pencarian</p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setFilterStatus('all');
                        }}
                        className="mt-4 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                        Reset Filter
                    </button>
                </div>
            )}

            {/* Info Section */}
            <div className="bg-linear-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
                <div className="max-w-3xl">
                    <h3 className="text-white mb-2">Keunggulan Marketplace Kami</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <p className="text-green-100">Prediksi Akurat</p>
                                <p className="text-sm text-green-100 mt-1">
                                    Volume & waktu panen diprediksi dengan AI
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <p className="text-green-100">Petani Terverifikasi</p>
                                <p className="text-sm text-green-100 mt-1">
                                    Semua petani telah melalui proses verifikasi
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                            <div>
                                <p className="text-green-100">Transaksi Aman</p>
                                <p className="text-sm text-green-100 mt-1">
                                    Sistem escrow melindungi pembeli & penjual
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
