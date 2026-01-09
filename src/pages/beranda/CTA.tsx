import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-3xl p-12 text-center shadow-lg border border-green-100">

                <h2 className="text-3xl md:text-4xl mb-4">
                    <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        Siap Memulai Perjalanan Urban Farming Anda?
                    </span>
                </h2>

                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                    Bergabunglah dengan ribuan petani urban yang telah meningkatkan hasil
                    panen mereka dengan FarmLens.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/belajar"
                        className="group bg-linear-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2"
                    >
                        Mulai Belajar Sekarang
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/artikel"
                        className="bg-white text-green-700 px-8 py-4 rounded-xl border-2 border-green-200 hover:border-green-300 hover:bg-green-50 transition-all"
                    >
                        Baca Artikel
                    </Link>
                </div>
            </div>
        </section>
    );
}
