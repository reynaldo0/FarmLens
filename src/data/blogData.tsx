export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    tags: string[];
    date: string;
    image: string;
    readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        title: '5 Kesalahan Fatal Petani Pemula yang Harus Dihindari',
        excerpt: 'Over-watering, salah pupuk, hingga lokasi tanam yang kurang tepat. Kenali kesalahan umum ini sebelum terlambat!',
        tags: ['Pemula', 'Tips Praktis'],
        date: '7 Januari 2026',
        readTime: '5 menit',
        image: 'https://images.unsplash.com/photo-1617532740648-0946d1110179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhcm1pbmclMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2Nzk3MDQ0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 2,
        title: 'Cara Merawat Cabai agar Berbuah Lebat di Pot Kecil',
        excerpt: 'Rahasia panen cabai 2-3kg per tanaman meski di pot 30cm. Teknik pemangkasan dan pemupukan yang tepat!',
        tags: ['Cabai', 'Perawatan'],
        date: '6 Januari 2026',
        readTime: '6 menit',
        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZ3xlbnwxfHx8fDE3Njc5NDQ0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 3,
        title: 'DIY Pupuk Organik dari Sampah Dapur - Hemat & Ramah Lingkungan',
        excerpt: 'Ubah kulit buah, sisa sayuran jadi pupuk cair berkualitas. Resep kompos teh dan bokashi praktis!',
        tags: ['DIY', 'Pupuk Organik'],
        date: '5 Januari 2026',
        readTime: '7 menit',
        image: 'https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwdG9tYXRvZXN8ZW58MXx8fHwxNjc5MTIyODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 4,
        title: 'Atasi Hama Tanpa Pestisida Kimia - 7 Solusi Alami',
        excerpt: 'Gunakan bahan dapur seperti bawang putih, cabai, dan sabun cuci piring untuk basmi hama secara aman!',
        tags: ['Hama & Penyakit', 'Tips Praktis'],
        date: '4 Januari 2026',
        readTime: '8 menit',
        image: 'https://images.unsplash.com/photo-1620055494738-248ba57ed714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMGRpc2Vhc2UlMjBsZWFmfGVufDF8fHx8MTc2NzkxMjgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 5,
        title: 'Bertani di Apartemen? Ini 10 Tanaman yang Cocok',
        excerpt: 'Cahaya terbatas? Ruang sempit? Tidak masalah! Pilih tanaman ini untuk hasil maksimal di hunian vertikal.',
        tags: ['Urban Farming', 'Pemula'],
        date: '2 Januari 2026',
        readTime: '6 menit',
        image: 'https://images.unsplash.com/photo-1630830921563-75b9b28e2154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJ0aWNhbCUyMGdhcmRlbiUyMGNpdHl8ZW58MXx8fHwxNjc5MTIyODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 6,
        title: 'Jadwal Tanam Terbaik Berdasarkan Musim di Indonesia',
        excerpt: 'Kalender tanam lengkap untuk musim hujan dan kemarau. Maksimalkan hasil panen dengan timing yang tepat!',
        tags: ['Perawatan', 'Tips Praktis'],
        date: '30 Desember 2025',
        readTime: '9 menit',
        image: 'https://images.unsplash.com/photo-1703932892707-96a68172d8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGFncmljdWx0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE2NzkxMjI4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 7,
        title: 'Water Drainage 101: Cegah Akar Busuk Selamanya',
        excerpt: 'Teknik drainase yang benar bisa selamatkan 90% tanaman mati. Tutorial lengkap pot berlapis!',
        tags: ['Perawatan', 'Pemula'],
        date: '28 Desember 2025',
        readTime: '5 menit',
        image: 'https://images.unsplash.com/photo-1714560560652-e923cb9e30c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoeWRyb3BvbmljJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE2NzkxMjI4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 8,
        title: 'Tomat Cherry vs Tomat Besar: Mana yang Lebih Cocok?',
        excerpt: 'Perbandingan lengkap dari sisi perawatan, hasil panen, dan cocok untuk pemula atau yang sudah ahli.',
        tags: ['Tomat', 'Tips Praktis'],
        date: '26 Desember 2025',
        readTime: '7 menit',
        image: 'https://images.unsplash.com/photo-1534940519139-f860fb3c6e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwdG9tYXRvZXN8ZW58MXx8fHwxNjc5MTIyODExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        id: 9,
        title: 'Regrow Your Food: 5 Sayuran yang Tumbuh dari Sisa Dapur',
        excerpt: 'Daun bawang, seledri, selada bisa tumbuh lagi dari akar! Tutorial regrow sayuran termudah.',
        tags: ['DIY', 'Urban Farming'],
        date: '24 Desember 2025',
        readTime: '4 menit',
        image: 'https://images.unsplash.com/photo-1617532740648-0946d1110179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGZhcm1pbmclMjB2ZWdldGFibGVzfGVufDF8fHx8MTY3OTEyMjgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

export const BLOG_TAGS = [
    'all',
    'Pemula',
    'Tips Praktis',
    'Perawatan',
    'Urban Farming',
    'DIY',
    'Hama & Penyakit',
    'Cabai',
    'Tomat',
    'Pupuk Organik',
];
