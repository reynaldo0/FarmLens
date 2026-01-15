import { ArrowRight, MessageCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityCTA() {
    return (
        <div className="mt-16 bg-linear-to-br from-emerald-600 to-green-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">

            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2 blur-2xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">

                {/* Icon */}
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl 
                                flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Punya Pertanyaan atau Pengalaman?
                </h3>

                {/* Description */}
                <p className="mb-8 text-green-50 text-lg leading-relaxed">
                    Diskusikan isi artikel, ajukan pertanyaan, atau bagikan pengalaman
                    langsung dengan sesama petani di komunitas FarmLens.
                </p>

                {/* CTA Button */}
                <Link
                    to="/komunitas"
                    className="bg-white text-green-700 px-8 py-4 rounded-xl font-medium
                               hover:bg-green-50 transition-all hover:scale-105
                               shadow-lg inline-flex items-center gap-2"
                >
                    Mulai Diskusi di Komunitas
                    <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Secondary hint */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-100">
                    <MessageCircle className="w-4 h-4" />
                    Tanya • Diskusi • Berbagi Tips
                </div>
            </div>
        </div>
    );
}
