import { Scan, Upload } from 'lucide-react';

export default function AIDetectionCTA() {
    return (
        <div className="mt-16 bg-linear-to-br from-green-600 to-emerald-700 rounded-3xl p-12 text-white text-center shadow-2xl">
            <Scan className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">
                Butuh Diagnosa Instan dengan AI?
            </h3>
            <p className="mb-8 text-green-50">
                Upload foto tanaman dan dapatkan analisis penyakit otomatis
            </p>

            <button className="bg-white text-green-700 px-8 py-4 rounded-xl flex gap-2 mx-auto">
                <Upload /> Upload Foto <span className="text-xs">(Coming Soon)</span>
            </button>
        </div>
    );
}
