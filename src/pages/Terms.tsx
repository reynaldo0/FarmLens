import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    Leaf,
    Shield,
    Store,
    Truck,
    AlertTriangle,
    ArrowLeft,
} from "lucide-react";

function SectionTitle({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc?: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                {icon}
            </div>
            <div className="min-w-0">
                <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}
            </div>
        </div>
    );
}

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600" />
            <span className="text-sm text-gray-700 leading-relaxed">{children}</span>
        </li>
    );
}

export default function Terms() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-green-50 via-white to-green-100 pt-28 md:pt-32">
            {/* Animated blobs */}
            <motion.div
                animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-36 -left-36 w-[520px] h-[520px] bg-green-300/25 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-36 -right-36 w-[520px] h-[520px] bg-emerald-400/25 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8"
                >
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>

                    <div className="mt-4 ml-5 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                        <Leaf className="w-4 h-4" />
                        Farmlens • Syarat & Ketentuan
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                        Syarat & Ketentuan Penggunaan
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                        Dokumen ini menjelaskan aturan penggunaan layanan Farmlens (platform
                        edukasi urban farming, deteksi penyakit tanaman, dan marketplace).
                        Dengan menggunakan layanan ini, kamu setuju dengan ketentuan di
                        bawah.
                    </p>

                    <div className="mt-4 text-xs text-gray-500">
                        Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
                    </div>
                </motion.div>

                {/* Content card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-10"
                >
                    {/* 1 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Shield className="w-5 h-5" />}
                            title="1. Akun & Keamanan"
                            desc="Kamu bertanggung jawab atas keamanan akunmu."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Jangan membagikan password kepada siapa pun dan gunakan password
                                yang kuat.
                            </Bullet>
                            <Bullet>
                                Informasi akun yang kamu isi harus benar dan dapat
                                dipertanggungjawabkan.
                            </Bullet>
                            <Bullet>
                                Farmlens dapat menonaktifkan akun yang terindikasi penyalahgunaan
                                atau pelanggaran.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 2 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Leaf className="w-5 h-5" />}
                            title="2. Konten Edukasi & Rekomendasi AI"
                            desc="Konten edukasi dan saran AI bersifat bantuan, bukan jaminan hasil."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Rekomendasi AI (misalnya deteksi penyakit) adalah estimasi berbasis
                                data dan dapat tidak akurat pada kondisi tertentu.
                            </Bullet>
                            <Bullet>
                                Keputusan budidaya dan penggunaan pestisida tetap tanggung jawab
                                pengguna.
                            </Bullet>
                            <Bullet>
                                Jika ragu, konsultasikan dengan penyuluh/ahli pertanian setempat.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 3 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Store className="w-5 h-5" />}
                            title="3. Marketplace & Transaksi"
                            desc="Farmlens memfasilitasi koneksi penjual–pembeli, bukan penjamin transaksi."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Informasi listing (harga, volume, kualitas) harus sesuai kondisi
                                nyata.
                            </Bullet>
                            <Bullet>
                                Penjual wajib menjaga reliabilitas: respon cepat, stok valid,
                                dan komitmen pengiriman.
                            </Bullet>
                            <Bullet>
                                Pembeli wajib memeriksa detail produk sebelum menyetujui
                                penawaran.
                            </Bullet>
                        </ul>

                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-700 mt-0.5" />
                            <div className="text-sm text-amber-800">
                                <div className="font-semibold">Catatan</div>
                                <div className="mt-1 text-amber-800/90">
                                    Sengketa transaksi sebaiknya diselesaikan secara musyawarah.
                                    Farmlens dapat membantu mediasi sesuai kebijakan internal.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Truck className="w-5 h-5" />}
                            title="4. Pengiriman, Penawaran, dan Kolaborasi"
                            desc="Aturan dasar agar kolaborasi tetap profesional."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Estimasi pengiriman merupakan perkiraan dan bisa berubah karena
                                faktor logistik.
                            </Bullet>
                            <Bullet>
                                Permintaan penawaran (kolaborasi) harus menggunakan bahasa yang
                                sopan dan jelas.
                            </Bullet>
                            <Bullet>
                                Dilarang mengirim spam, penipuan, atau melakukan tindakan yang
                                merugikan pihak lain.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 5 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Shield className="w-5 h-5" />}
                            title="5. Larangan"
                            desc="Beberapa hal yang tidak diperbolehkan di Farmlens."
                        />
                        <ul className="space-y-2">
                            <Bullet>Konten palsu, menyesatkan, atau menipu.</Bullet>
                            <Bullet>Pelanggaran hak cipta/merek dan konten tanpa izin.</Bullet>
                            <Bullet>
                                Aktivitas yang mengganggu sistem: scraping, DDoS, eksploitasi,
                                dll.
                            </Bullet>
                            <Bullet>Ujaran kebencian, pelecehan, atau ancaman.</Bullet>
                        </ul>
                    </div>

                    {/* 6 */}
                    <div className="space-y-4">
                        <SectionTitle
                            icon={<Shield className="w-5 h-5" />}
                            title="6. Perubahan Ketentuan"
                            desc="Kami dapat memperbarui ketentuan sewaktu-waktu."
                        />
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Farmlens dapat mengubah S&K sesuai kebutuhan. Versi terbaru akan
                            ditampilkan di halaman ini. Dengan tetap menggunakan layanan setelah
                            pembaruan, kamu dianggap menyetujui perubahan tersebut.
                        </p>
                    </div>

                    {/* Footer CTA */}
                    <div className="pt-2">
                        <div className="rounded-2xl border border-green-100 bg-white/70 p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <div className="text-sm font-bold text-gray-900">
                                    Punya pertanyaan?
                                </div>
                                <div className="text-sm text-gray-600">
                                    Lihat juga halaman Kebijakan Privasi untuk detail pengelolaan
                                    data.
                                </div>
                            </div>
                            <Link
                                to="/privacy"
                                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg shadow-green-500/25 hover:brightness-110 transition"
                            >
                                Baca Kebijakan Privasi
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center text-xs text-gray-500 mt-8">
                    © {new Date().getFullYear()} Farmlens. Semua hak dilindungi.
                </div>
            </div>
        </div>
    );
}
