import { Scan, Upload } from 'lucide-react';

export default function AIDetectionCTA() {
    return (
        <div className="mt-16 bg-linear-to-br from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Scan className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Butuh Diagnosa Instan dengan AI?
                </h3>
                <p className="mb-8 text-green-50 text-lg">
                    Upload foto tanaman Anda dan dapatkan analisis penyakit secara otomatis menggunakan teknologi AI FarmLens
                </p>
                <a href="/dashboard/deteksi" className="bg-white text-green-700 px-8 py-4 rounded-xl font-medium hover:bg-green-50 transition-all hover:scale-105 shadow-lg inline-flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Foto Tanaman
                </a>
            </div>
        </div>
    );
}
