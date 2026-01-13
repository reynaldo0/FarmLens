import {
    AlertCircle,
    Camera,
    CheckCircle2,
    Info,
    X,
    Phone
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

/* ================= CONFIG ================= */
const USER_ID = 'FarmlensAcc';
const PENYULUH_WA = '62895384435283';

/* ================= TYPES ================= */
type DetectionHistory = {
    id: string;
    image: string;
    date: string;
    result: any;
};

/* ================= ANALYSIS RESULT ================= */
function AnalysisResult({
    result,
    onSave,
    onContact
}: {
    result: any;
    onSave?: () => void;
    onContact?: () => void;
}) {
    const riskStyle = {
        low: 'bg-green-100 text-green-700',
        medium: 'bg-amber-100 text-amber-700',
        high: 'bg-red-100 text-red-700'
    }[result.risk];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500">Terdeteksi</p>
                    <h3 className="text-xl font-semibold">{result.disease}</h3>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${riskStyle}`}>
                    {result.severity}
                </span>
            </div>

            {/* Confidence */}
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Tingkat Keyakinan</span>
                    <span className="font-medium">{result.confidence}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-2 bg-green-500 rounded-full transition-all"
                        style={{ width: `${result.confidence}%` }}
                    />
                </div>
            </div>

            {/* Alert */}
            {result.risk !== 'low' && (
                <div className="flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                        <p className="font-medium text-amber-900">
                            Perlu Tindakan
                        </p>
                        <p className="text-sm text-amber-700">
                            Penyakit berpotensi menyebar jika tidak ditangani
                        </p>
                    </div>
                </div>
            )}

            {/* Recommendations */}
            <div>
                <p className="font-medium mb-3">Rekomendasi Penanganan</p>
                <div className="space-y-2">
                    {result.recommendations.map((rec: string, i: number) => (
                        <div
                            key={i}
                            className="flex gap-3 p-3 rounded-xl bg-gray-50"
                        >
                            <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                                {i + 1}
                            </div>
                            <p className="text-sm">{rec}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Prevention */}
            <div>
                <p className="font-medium mb-3">Pencegahan</p>
                <ul className="space-y-2">
                    {result.prevention.map((p: string, i: number) => (
                        <li key={i} className="flex gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                            {p}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
                {onSave && (
                    <button
                        onClick={onSave}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
                    >
                        Simpan Hasil
                    </button>
                )}

                <button
                    onClick={onContact}
                    className="flex-1 border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                >
                    <Phone className="w-4 h-4" />
                    Hubungi Penyuluh
                </button>
            </div>
        </div>
    );
}

/* ================= MAIN ================= */
export function DeteksiPenyakit() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [history, setHistory] = useState<DetectionHistory[]>([]);
    const [selectedHistory, setSelectedHistory] = useState<DetectionHistory | null>(null);
    const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const mockResult = {
        disease: 'Bercak Daun (Leaf Spot)',
        confidence: 87,
        severity: 'Sedang',
        risk: 'medium',
        recommendations: [
            'Pangkas daun yang terinfeksi',
            'Semprot fungisida sesuai dosis',
            'Perbaiki sirkulasi udara',
            'Kurangi kelembaban'
        ],
        prevention: [
            'Rotasi tanaman',
            'Gunakan benih sehat',
            'Sanitasi lahan'
        ]
    };

    useEffect(() => {
        const saved = localStorage.getItem(`detections_${USER_ID}`);
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const saveHistory = (image: string, result: any) => {
        const item = {
            id: crypto.randomUUID(),
            image,
            date: new Date().toLocaleString('id-ID'),
            result
        };
        const updated = [item, ...history];
        setHistory(updated);
        localStorage.setItem(`detections_${USER_ID}`, JSON.stringify(updated));
    };

    const runAnalysis = (image: string) => {
        setAnalyzing(true);
        setResult(null);
        setTimeout(() => {
            setAnalyzing(false);
            setResult(mockResult);
            saveHistory(image, mockResult);
        }, 1800);
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = reader.result as string;
            setUploadedImage(img);
            runAnalysis(img);
        };
        reader.readAsDataURL(file);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            streamRef.current = stream;
            if (videoRef.current) videoRef.current.srcObject = stream;
        } catch {
            alert('Kamera tidak dapat diakses');
        }
    };

    const stopCamera = () => {
        streamRef.current?.getTracks().forEach(t => t.stop());
        streamRef.current = null;
    };

    const capturePhoto = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
        const img = canvas.toDataURL('image/png');
        stopCamera();
        setUploadedImage(img);
        runAnalysis(img);
    };

    const resetUpload = () => {
        stopCamera();
        setUploadedImage(null);
        setResult(null);
        setAnalyzing(false);
    };

    const contactPenyuluh = () => {
        window.open(`https://wa.me/${PENYULUH_WA}`, '_blank');
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-semibold">Deteksi Penyakit Tanaman</h2>
                <p className="text-gray-500">Analisis AI berbasis foto tanaman</p>
            </div>

            {/* Main */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upload Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
                    {/* Tabs */}
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        {['upload', 'camera'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab as any);
                                    tab === 'camera' ? startCamera() : stopCamera();
                                }}
                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition
                                    ${activeTab === tab
                                        ? 'bg-white shadow text-green-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab === 'upload' ? 'Upload' : 'Kamera'}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    {!uploadedImage && activeTab === 'upload' && (
                        <label className="border-2 border-dashed rounded-2xl p-10 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition">
                            <Camera className="w-10 h-10 text-green-600 mb-2" />
                            <p className="font-medium">Upload Foto</p>
                            <p className="text-sm text-gray-500">JPG / PNG</p>
                            <input hidden type="file" accept="image/*" onChange={handleUpload} />
                        </label>
                    )}

                    {!uploadedImage && activeTab === 'camera' && (
                        <div className="space-y-4">
                            <video ref={videoRef} autoPlay playsInline className="rounded-xl border" />
                            <button
                                onClick={capturePhoto}
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition"
                            >
                                Ambil Foto
                            </button>
                        </div>
                    )}

                    {uploadedImage && (
                        <div className="space-y-4">
                            <img src={uploadedImage} className="rounded-xl border" />
                            <button
                                onClick={resetUpload}
                                className="w-full py-3 rounded-xl border hover:bg-gray-50 transition"
                            >
                                Ganti Foto
                            </button>
                        </div>
                    )}

                    {analyzing && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-blue-50 text-blue-700">
                            <Info className="animate-pulse" />
                            AI sedang menganalisis gambar...
                        </div>
                    )}
                </div>

                {/* Result */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                    {!result && !analyzing && (
                        <p className="text-center text-gray-400">
                            Hasil analisis akan muncul di sini
                        </p>
                    )}

                    {result && (
                        <AnalysisResult
                            result={result}
                            onSave={() => saveHistory(uploadedImage!, result)}
                            onContact={contactPenyuluh}
                        />
                    )}
                </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold mb-4">Riwayat Deteksi</h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {history.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedHistory(item)}
                            className="rounded-xl border hover:shadow-md transition text-left overflow-hidden"
                        >
                            <img src={item.image} className="h-32 w-full object-cover" />
                            <div className="p-3">
                                <p className="font-medium text-sm">{item.result.disease}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedHistory && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center ">
                    <div
                        onClick={() => setSelectedHistory(null)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <div className="relative bg-white w-full md:max-w-3xl rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto p-16">
                        <button
                            onClick={() => setSelectedHistory(null)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X />
                        </button>

                        <AnalysisResult
                            result={selectedHistory.result}
                            onContact={contactPenyuluh}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}