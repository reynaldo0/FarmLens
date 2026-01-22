import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ArticleCTA() {
    return (
        <div className="mt-16 bg-linear-to-br from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-20">

            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">

                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Perlu Wawasan Sebelum Bertindak?
                </h3>

                {/* Description */}
                <p className="mb-8 text-green-50 text-lg leading-relaxed">
                    Pelajari panduan lengkap seputar perawatan tanaman, penyakit,
                    dan praktik pertanian terbaik melalui artikel edukatif FarmLens.
                </p>

                {/* CTA Button */}
                <Link
                    to="/artikel"
                    className="bg-white text-green-700 px-8 py-4 rounded-xl font-medium
                               hover:bg-green-50 transition-all hover:scale-105
                               shadow-lg inline-flex items-center gap-2"
                >
                    Baca Artikel Pertanian
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}
