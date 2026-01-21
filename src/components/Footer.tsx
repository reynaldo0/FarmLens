import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-linear-to-b  from-green-50 to-white border-t border-green-100">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* TOP */}
                <div className="grid gap-12 md:grid-cols-4">
                    {/* BRAND */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <span className="text-xl font-bold text-gray-900">
                                FarmLens
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Platform berbasis AI untuk membantu petani dan urban farmer
                            mendeteksi penyakit tanaman, meningkatkan hasil panen,
                            dan mendukung ketahanan pangan berkelanjutan.
                        </p>
                    </div>

                    {/* NAV */}
                    <FooterColumn
                        title="Navigasi"
                        links={[
                            { label: 'Beranda', to: '/' },
                            { label: 'Belajar', to: '/belajar' },
                            { label: 'Artikel', to: '/artikel' },
                            { label: 'Blog', to: '/blog' },
                            { label: 'Kamus Tanaman', to: '/kamus' },
                        ]}
                    />

                    {/* PRODUCT */}
                    <FooterColumn
                        title="Fitur"
                        links={[
                            { label: 'Dashboard', to: '/dashboard' },
                            { label: 'Deteksi Penyakit', to: '/dashboard/deteksi' },
                            { label: 'Rekomendasi Agronomi', to: '/dashboard/rekomendasi' },
                            { label: 'Manajemen Lahan', to: '/dashboard/lahan' },
                            { label: 'Prediksi Panen', to: '/dashboard/panen' },
                        ]}
                    />

                    {/* SUPPORT */}
                    <FooterColumn
                        title="Tim FarmLens"
                        links={[
                            { label: 'Reynaldo Yusellino', to: '#' },
                            { label: 'Alya Irhamni Malawat', to: '#' },
                            { label: 'Muhammad Sakha Ar-Rafi', to: '#' },
                            { label: 'Zhafirah Naswa Naufariza', to: '#' },
                            { label: 'Siti Aisyah', to: '#' },
                        ]}
                    />
                </div>

                {/* DIVIDER */}
                <div className="my-10 h-px bg-green-200/50" />

                {/* BOTTOM */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                    <p>
                        © {new Date().getFullYear()} <span className="font-medium">FarmLens</span>.
                        All rights reserved.
                    </p>

                    <p className="flex items-center gap-1">
                        Dibangun untuk masa depan pangan Indonesia
                    </p>
                </div>
            </div>
        </footer>
    );
}

/* ================= HELPERS ================= */

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { label: string; to: string }[];
}) {
    return (
        <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
                {title}
            </h4>
            <ul className="space-y-3">
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            to={link.to}
                            className="text-sm text-gray-600 hover:text-green-700 transition"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}