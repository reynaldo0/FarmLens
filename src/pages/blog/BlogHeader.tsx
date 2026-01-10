import { Sparkles } from 'lucide-react';

export default function BlogHeader() {
    return (
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                Tips & Trik Praktis
            </div>

            <h1 className="text-4xl md:text-5xl mb-4">
                <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                    Blog FarmLens
                </span>
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
                Panduan praktis dan tips harian untuk sukses urban farming
            </p>
        </div>
    );
}
