import {
    Calendar,
    CheckCircle2,
    MapPin,
    Package,
    Search,
    Star,
    TrendingUp,
    Phone,
    ShoppingCart
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Toaster, toast } from 'sonner';

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

export default function Marketplace() {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [detail, setDetail] = useState(null);

    const filtered = useMemo(() => {
        return listings.filter(item => {
            const s = search.toLowerCase();
            return (
                (item.komoditas.toLowerCase().includes(s) ||
                    item.lokasi.toLowerCase().includes(s)) &&
                (status === 'all' || item.status === status)
            );
        });
    }, [search, status]);

    const handleContact = () => {
        toast.info('Fitur Dalam Pengembangan', {
            description:
                'Integrasi WhatsApp & sistem pesan internal sedang kami siapkan agar komunikasi lebih aman dan terdokumentasi.'
        });
    };

    const handleOrderSuccess = () => {
        toast.success('Pesanan Berhasil Dicatat', {
            description:
                'Tim kami akan segera memproses transaksi dan menghubungi Anda untuk tahap selanjutnya.'
        });
        setDetail(null);
    };

    return (
        <div className="space-y-8">
            {/* TOASTER */}
            <Toaster position="bottom-right" richColors />

            {/* HEADER */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Marketplace Panen
                    </h1>
                    <p className="text-gray-500">
                        Pasokan pertanian terprediksi & terverifikasi
                    </p>
                </div>

                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Cari komoditas / lokasi"
                            className="pl-9 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="px-3 py-2 rounded-lg border"
                    >
                        <option value="all">Semua</option>
                        <option value="available">Tersedia</option>
                        <option value="reserved">Dipesan</option>
                    </select>
                </div>
            </header>

            {/* LISTINGS */}
            <section className="grid md:grid-cols-3 gap-6">
                {filtered.map(item => (
                    <article
                        key={item.id}
                        className="rounded-2xl border bg-white p-5 hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                    {item.komoditas}
                                    {item.verified && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    )}
                                </h3>
                                <p className="text-sm text-gray-500">{item.petani}</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Tersedia
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Package className="w-4 h-4" /> {item.volume} ton
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />{' '}
                                {new Date(item.tanggalPanen).toLocaleDateString('id-ID')}
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" /> Rp{' '}
                                {item.harga.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4" /> {item.rating}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-lg mt-4">
                            <MapPin className="w-4 h-4" /> {item.lokasi}
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span>Reliabilitas</span>
                                <span>{item.reliabilitas}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-green-500 rounded-full"
                                    style={{ width: `${item.reliabilitas}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 mt-5">
                            <button
                                onClick={handleContact}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50"
                            >
                                <Phone className="w-4 h-4" /> Hubungi
                            </button>

                            <button
                                onClick={() => setDetail(item)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
                            >
                                <ShoppingCart className="w-4 h-4" /> Pesan
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {/* DETAIL + KONFIRMASI */}
            {detail && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-3">
                            Konfirmasi Pesanan
                        </h3>

                        <div className="text-sm text-gray-600 mb-4 space-y-1">
                            <p><strong>Komoditas:</strong> {detail.komoditas}</p>
                            <p><strong>Petani:</strong> {detail.petani}</p>
                            <p><strong>Volume:</strong> {detail.volume} ton</p>
                            <p><strong>Harga:</strong> Rp {detail.harga.toLocaleString()} / kg</p>
                            <p><strong>Panen:</strong> {new Date(detail.tanggalPanen).toLocaleDateString('id-ID')}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setDetail(null)}
                                className="flex-1 border rounded-lg py-2"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleOrderSuccess}
                                className="flex-1 bg-green-600 text-white rounded-lg py-2"
                            >
                                Konfirmasi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}