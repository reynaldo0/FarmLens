import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Database,
    Image,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600" />
            <span className="text-sm text-gray-700 leading-relaxed">{children}</span>
        </li>
    );
}

function CardTitle({
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

export default function Privacy() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-green-50 via-white to-green-100 py-28 md:py-32">
            {/* Animated blobs */}
            <motion.div
                animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-36 -left-36 w-[520px] h-[520px] bg-green-300/25 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ x: [0, -45, 0], y: [0, 35, 0] }}
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
                        <Shield className="w-4 h-4" />
                        Farmlens • Kebijakan Privasi
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                        Kebijakan Privasi
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-2xl">
                        Halaman ini menjelaskan data apa yang kami kumpulkan, bagaimana kami
                        menggunakannya, dan pilihan kontrol yang kamu miliki. Untuk versi
                        prototype (tanpa backend), sebagian data hanya tersimpan di perangkatmu.
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
                        <CardTitle
                            icon={<Database className="w-5 h-5" />}
                            title="1. Data yang Dikumpulkan"
                            desc="Data minimal untuk mendukung fitur."
                        />
                        <ul className="space-y-2">
                            <Bullet>Data akun: nama, email, peran (role).</Bullet>
                            <Bullet>
                                Data marketplace: listing, penawaran, dan aktivitas toko (jika ada).
                            </Bullet>
                            <Bullet>
                                Data teknis sederhana: sesi login (cookie) untuk menjaga kamu tetap masuk.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 2 */}
                    <div className="space-y-4">
                        <CardTitle
                            icon={<Image className="w-5 h-5" />}
                            title="2. Foto Tanaman & Konten yang Kamu Unggah"
                            desc="Jika kamu mengunggah gambar tanaman, itu digunakan untuk proses analisis/edukasi."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Foto digunakan untuk membantu analisis kondisi tanaman dan pembelajaran.
                            </Bullet>
                            <Bullet>
                                Pada versi prototype, pemrosesan bisa bersifat lokal/terbatas.
                            </Bullet>
                            <Bullet>
                                Jangan unggah data sensitif yang tidak diperlukan.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 3 */}
                    <div className="space-y-4">
                        <CardTitle
                            icon={<Lock className="w-5 h-5" />}
                            title="3. Keamanan Data"
                            desc="Kami berupaya menjaga keamanan, namun tidak ada sistem yang 100% bebas risiko."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Password disimpan dalam bentuk hash (bukan plaintext) untuk simulasi login.
                            </Bullet>
                            <Bullet>
                                Session disimpan di cookie tanpa password hash.
                            </Bullet>
                            <Bullet>
                                Pastikan perangkatmu aman (terutama jika memakai komputer umum).
                            </Bullet>
                        </ul>

                        <div className="rounded-2xl border border-gray-100 bg-white/70 p-4">
                            <div className="text-xs text-gray-500">Catatan Prototype</div>
                            <div className="text-sm text-gray-700 mt-1">
                                Dalam mode tanpa backend, akun yang kamu buat tersimpan di{" "}
                                <span className="font-semibold">localStorage</span> browser perangkatmu.
                                Jika kamu hapus data browser, akun bisa ikut terhapus.
                            </div>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="space-y-4">
                        <CardTitle
                            icon={<Shield className="w-5 h-5" />}
                            title="4. Berbagi Data ke Pihak Ketiga"
                            desc="Kami tidak menjual data pribadi pengguna."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Data dapat dibagikan hanya jika diperlukan untuk operasional (misalnya layanan
                                pengiriman/kolaborasi), dan sesuai kebijakan internal.
                            </Bullet>
                            <Bullet>
                                Jika kelak ada integrasi pihak ketiga, kamu akan melihat pembaruan kebijakan di halaman ini.
                            </Bullet>
                        </ul>
                    </div>

                    {/* 5 */}
                    <div className="space-y-4">
                        <CardTitle
                            icon={<Shield className="w-5 h-5" />}
                            title="5. Hak & Kontrol Pengguna"
                            desc="Kamu punya kontrol atas akunmu."
                        />
                        <ul className="space-y-2">
                            <Bullet>
                                Kamu dapat logout kapan saja untuk menghapus sesi login dari cookie.
                            </Bullet>
                            <Bullet>
                                Untuk menghapus akun di mode prototype, kamu bisa menghapus data browser
                                (localStorage Farmlens).
                            </Bullet>
                        </ul>
                    </div>

                    {/* Footer CTA */}
                    <div className="pt-2">
                        <div className="rounded-2xl border border-green-100 bg-white/70 p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                            <div className="space-y-1">
                                <div className="text-sm font-bold text-gray-900">
                                    Ingin baca Syarat & Ketentuan?
                                </div>
                                <div className="text-sm text-gray-600">
                                    Detail aturan penggunaan layanan Farmlens.
                                </div>
                            </div>
                            <Link
                                to="/terms"
                                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg shadow-green-500/25 hover:brightness-110 transition"
                            >
                                Baca S&K
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
