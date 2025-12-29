import React, { useState } from 'react';
import { Upload, AlertCircle, CheckCircle2, Info, Camera } from 'lucide-react';

export function DeteksiPenyakit() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
                setResult(null);
                // Simulate analysis after upload
                setTimeout(() => {
                    setAnalyzing(true);
                    setTimeout(() => {
                        setAnalyzing(false);
                        // Mock result
                        setResult({
                            disease: 'Bercak Daun (Leaf Spot)',
                            confidence: 87,
                            severity: 'Sedang',
                            risk: 'medium',
                            recommendations: [
                                'Pangkas daun yang terinfeksi dan buang dari area lahan',
                                'Semprot fungisida berbahan aktif mankozeb atau klorotalonil',
                                'Tingkatkan sirkulasi udara antar tanaman',
                                'Kurangi kelembaban dengan mengatur irigasi',
                                'Monitor perkembangan setiap 3-5 hari'
                            ],
                            prevention: [
                                'Rotasi tanaman setiap musim',
                                'Jaga jarak tanam optimal',
                                'Gunakan benih bersertifikat',
                                'Sanitasi lahan secara berkala'
                            ]
                        });
                    }, 2000);
                }, 300);
            };
            reader.readAsDataURL(file);
        }
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'low': return 'text-green-700 bg-green-100 border-green-200';
            case 'medium': return 'text-amber-700 bg-amber-100 border-amber-200';
            case 'high': return 'text-red-700 bg-red-100 border-red-200';
            default: return 'text-gray-700 bg-gray-100 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-gray-900">Deteksi Penyakit Tanaman</h2>
                <p className="text-gray-500 mt-1">
                    Unggah foto tanaman untuk analisis penyakit menggunakan AI
                </p>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-blue-900">Tips untuk hasil terbaik:</p>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                        <li>Ambil foto di siang hari dengan pencahayaan yang baik</li>
                        <li>Fokus pada bagian tanaman yang menunjukkan gejala</li>
                        <li>Pastikan foto jelas dan tidak buram</li>
                        <li>Sertakan daun atau batang yang terinfeksi</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Area */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Upload Foto Tanaman</h3>

                    {!uploadedImage ? (
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors min-h-[400px]">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Upload className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-gray-900 mb-2">Klik untuk unggah foto</p>
                            <p className="text-sm text-gray-500 text-center">
                                atau seret dan letakkan file di sini
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                PNG, JPG hingga 10MB
                            </p>
                        </label>
                    ) : (
                        <div className="space-y-4">
                            <div className="relative rounded-xl overflow-hidden border border-gray-200">
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded plant"
                                    className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                                />
                            </div>
                            <button
                                onClick={() => {
                                    setUploadedImage(null);
                                    setResult(null);
                                    setAnalyzing(false);
                                }}
                                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Unggah Foto Lain
                            </button>
                        </div>
                    )}

                    {analyzing && (
                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <p className="text-blue-900">Menganalisis foto...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-gray-900 mb-4">Hasil Analisis</h3>

                    {!result && !analyzing && (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Camera className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Unggah foto untuk melihat hasil analisis</p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-6">
                            {/* Disease Info */}
                            <div>
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">Terdeteksi</p>
                                        <p className="text-xl text-gray-900">{result.disease}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full border ${getRiskColor(result.risk)}`}>
                                        {result.severity}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <span className="text-gray-600">Tingkat Keyakinan:</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-green-500 h-2 rounded-full"
                                            style={{ width: `${result.confidence}%` }}
                                        />
                                    </div>
                                    <span className="text-gray-900">{result.confidence}%</span>
                                </div>
                            </div>

                            {/* Risk Alert */}
                            {result.risk === 'medium' && (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-amber-900">Perlu Tindakan Segera</p>
                                        <p className="text-sm text-amber-700 mt-1">
                                            Penyakit ini dapat menyebar jika tidak ditangani dengan cepat
                                        </p>
                                    </div>
                                </div>
                            )}

                            {result.risk === 'low' && (
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-green-900">Tingkat Risiko Rendah</p>
                                        <p className="text-sm text-green-700 mt-1">
                                            Penanganan preventif sudah cukup untuk mengendalikan penyakit
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Recommendations */}
                            <div>
                                <p className="text-gray-900 mb-3">Rekomendasi Penanganan</p>
                                <div className="space-y-2">
                                    {result.recommendations.map((rec: string, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-gray-700">{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prevention */}
                            <div>
                                <p className="text-gray-900 mb-3">Pencegahan ke Depan</p>
                                <ul className="space-y-2">
                                    {result.prevention.map((prev: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                            {prev}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-200">
                                <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    Simpan Hasil
                                </button>
                                <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Hubungi Penyuluh
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* History Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Riwayat Deteksi</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-gray-900">Hawar Daun Bakteri</p>
                            <p className="text-sm text-gray-600">Lahan A - Padi • 25 Jun 2025</p>
                        </div>
                        <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm border border-red-200">
                            Tinggi
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-gray-900">Karat Daun</p>
                            <p className="text-sm text-gray-600">Lahan B - Jagung • 18 Jun 2025</p>
                        </div>
                        <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm border border-amber-200">
                            Sedang
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors cursor-pointer">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-gray-900">Tanaman Sehat</p>
                            <p className="text-sm text-gray-600">Lahan D - Tomat • 12 Jun 2025</p>
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm border border-green-200">
                            Sehat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
