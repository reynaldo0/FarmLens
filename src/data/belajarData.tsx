import {
    Droplet,
    Leaf,
    Sprout,
    Thermometer,
    Wind,
    Sun
} from 'lucide-react';

export type TabType = 'tanaman' | 'perawatan' | 'media';

export type BelajarItem = {
    title: string;
    icon: any;
    color: string;
    duration: string;
    content: string[];
};

export const BELAJAR_CONTENT: Record<TabType, BelajarItem[]> = {
    tanaman: [
        {
            title: 'Cabai: Tanaman Penghasil Terbaik untuk Pemula',
            icon: Sprout,
            color: 'from-red-500 to-orange-500',
            duration: '15 menit',
            content: [
                'Pilih varietas cabai yang cocok untuk iklim lokal (cabai rawit, keriting, atau merah besar)',
                'Tanam di pot berukuran minimal 30cm dengan drainase baik',
                'Butuh sinar matahari minimal 6-8 jam per hari',
                'Siram 1-2 kali sehari, jaga kelembaban tanah',
                'Panen perdana dalam 75-90 hari setelah tanam',
                'Perhatikan hama kutu daun dan ulat yang sering menyerang'
            ]
        },
        {
            title: 'Tomat: Sumber Vitamin untuk Keluarga',
            icon: Sprout,
            color: 'from-red-600 to-red-700',
            duration: '18 menit',
            content: [
                'Pilih varietas cherry untuk pemula karena lebih mudah',
                'Gunakan pot minimal 40cm dengan ajir/tongkat penyangga',
                'Posisi tanam harus terkena sinar penuh (8+ jam)',
                'Berikan pupuk NPK setiap 2 minggu sekali',
                'Buang tunas lateral untuk fokus pada buah utama',
                'Panen dalam 60-80 hari tergantung varietas'
            ]
        },
        {
            title: 'Selada & Sayuran Hijau (Lettuce)',
            icon: Leaf,
            color: 'from-green-500 to-emerald-500',
            duration: '12 menit',
            content: [
                'Cocok untuk sistem hidroponik atau pot kecil',
                'Tumbuh cepat: 30-45 hari sudah bisa dipanen',
                'Butuh sinar tidak langsung, hindari panas ekstrem',
                'Siram secara teratur, jaga kelembaban tinggi',
                'Panen dengan metode "cut and come again"',
                'Ideal untuk balkon atau indoor farming'
            ]
        },
        {
            title: 'Pakcoy: Sayuran Asia yang Praktis',
            icon: Leaf,
            color: 'from-green-400 to-green-600',
            duration: '10 menit',
            content: [
                'Tumbuh super cepat: 25-40 hari sudah siap panen',
                'Toleran terhadap kondisi teduh',
                'Media tanam harus kaya nutrisi dan gembur',
                'Siram pagi dan sore untuk hasil maksimal',
                'Cegah hama ulat dengan pestisida organik',
                'Bisa ditanam sepanjang tahun di Indonesia'
            ]
        },
        {
            title: 'Daun Bawang: Pelengkap Dapur Sehari-hari',
            icon: Sprout,
            color: 'from-green-600 to-teal-600',
            duration: '8 menit',
            content: [
                'Paling mudah: tumbuh dari sisa akar daun bawang',
                'Cukup air dan cahaya sedang',
                'Bisa dipanen berkali-kali (regrow)',
                'Cocok untuk pot kecil atau botol bekas',
                'Panen dalam 3-4 minggu',
                'Tidak butuh perawatan khusus'
            ]
        },
    ],

    perawatan: [
        {
            title: 'Waktu Terbaik Menyiram Tanaman',
            icon: Droplet,
            color: 'from-blue-500 to-cyan-500',
            duration: '10 menit',
            content: [
                'Pagi hari (06:00-08:00): Waktu terbaik, air terserap optimal',
                'Sore hari (16:00-18:00): Alternatif baik di musim kering',
                'Hindari menyiram siang hari: air cepat menguap, akar bisa "terbakar"',
                'Hindari malam hari: risiko jamur dan penyakit tinggi',
                'Tes kelembaban tanah dengan jari sebelum menyiram',
                'Siram hingga air keluar dari lubang drainase pot'
            ]
        },
        {
            title: 'Kebutuhan Sinar Matahari per Jenis Tanaman',
            icon: Sun,
            color: 'from-yellow-500 to-orange-500',
            duration: '12 menit',
            content: [
                'Full Sun (8+ jam): Cabai, tomat, terong',
                'Partial Sun (4-6 jam): Selada, bayam, kangkung',
                'Shade Tolerant (2-4 jam): Pakcoy, sawi, kemangi',
                'Rotasi pot jika area tidak mendapat sinar merata',
                'Gunakan reflektor (aluminium foil) untuk maksimalkan cahaya',
                'Perhatikan tanda kekurangan cahaya: batang kurus, daun pucat'
            ]
        },
        {
            title: 'Sirkulasi Udara & Kelembaban',
            icon: Wind,
            color: 'from-teal-500 to-green-500',
            duration: '8 menit',
            content: [
                'Jarak antar tanaman minimal 20-30cm',
                'Ventilasi baik mencegah jamur dan penyakit',
                'Kelembaban ideal: 60-70% untuk sayuran hijau',
                'Gunakan kipas kecil untuk indoor farming',
                'Semprot air halus untuk tingkatkan kelembaban',
                'Hindari area tertutup tanpa sirkulasi udara'
            ]
        },
        {
            title: 'Suhu & Temperatur Optimal',
            icon: Thermometer,
            color: 'from-red-500 to-pink-500',
            duration: '10 menit',
            content: [
                'Sayuran hijau: 18-24°C (cocok untuk dataran tinggi)',
                'Cabai & tomat: 24-30°C (toleran panas)',
                'Lindungi tanaman dari suhu ekstrem (<15°C atau >35°C)',
                'Gunakan naungan saat gelombang panas',
                'Mulsa untuk stabilkan suhu tanah',
                'Monitor dengan termometer digital untuk presisi'
            ]
        }
    ],

    media: [
        {
            title: 'Media Tanam Dasar untuk Pemula',
            icon: Sprout,
            color: 'from-amber-600 to-yellow-700',
            duration: '15 menit',
            content: [
                'Campuran ideal: 60% tanah, 30% kompos, 10% sekam bakar',
                'Pastikan pH tanah 6.0-7.0 (netral)',
                'Tambahkan perlite/vermikulit untuk drainase',
                'Sterilisasi media dengan cara dijemur 2-3 hari',
                'Ganti media tanam setiap 3-4 bulan',
                'Hindari tanah bekas tanaman sakit'
            ]
        },
        {
            title: 'Jenis Pupuk & Kapan Menggunakannya',
            icon: Leaf,
            color: 'from-green-700 to-lime-700',
            duration: '20 menit',
            content: [
                'Pupuk dasar (kompos): saat tanam awal',
                'Pupuk NPK (15:15:15): fase pertumbuhan vegetatif',
                'Pupuk tinggi P (Fosfor): saat berbunga',
                'Pupuk organik cair: seminggu sekali sebagai suplemen',
                'Pupuk kandang fermentasi: sebulan sekali',
                'Hindari over-fertilizing: bisa "membakar" tanaman'
            ]
        },
        {
            title: 'Sistem Drainase yang Baik',
            icon: Droplet,
            color: 'from-blue-600 to-indigo-600',
            duration: '10 menit',
            content: [
                'Pot harus punya lubang drainase di dasar',
                'Lapisan pertama: kerikil/pecahan genteng (3-5cm)',
                'Lapisan kedua: media tanam yang gembur',
                'Air tidak boleh menggenang lebih dari 30 menit',
                'Pot berjenis terracotta lebih breathable',
                'Cek lubang drainase secara berkala jangan tersumbat'
            ]
        },
        {
            title: 'Transplanting: Memindahkan Bibit dengan Benar',
            icon: Sprout,
            color: 'from-emerald-600 to-green-700',
            duration: '12 menit',
            content: [
                'Waktu ideal: sore hari atau cuaca mendung',
                'Siram tanaman 1 jam sebelum dipindah',
                'Pindahkan dengan hati-hati, jangan rusak akar',
                'Tanam di lubang yang lebih besar dari root ball',
                'Padatkan tanah di sekitar batang, lalu siram',
                'Beri naungan 2-3 hari pertama untuk adaptasi'
            ]
        }
    ],
};
