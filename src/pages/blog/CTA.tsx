import { Sparkles } from 'lucide-react';

export default function NewsletterCTA() {
    return (
        <div className="mt-16 bg-linear-to-br from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Dapat Tips Baru Setiap Minggu!
                </h3>
                <p className="mb-8 text-green-50 text-lg">
                    Langsung ke inbox kamu - tips praktis, panduan musiman, dan solusi masalah tanaman
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Email kamu..."
                        className="flex-1 px-5 py-3 rounded-xl text-gray-100 border-2 border-white/20 focus:border-white focus:outline-none"
                    />
                    <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-medium hover:bg-green-50 transition-all hover:scale-105 shadow-lg">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
}
