import { motion } from "framer-motion";
import {
    Calendar,
    CheckCircle2,
    DollarSign,
    Package,
    TrendingUp
} from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

/* ================= DATA ================= */

const harvestPredictions = [
    {
        lahan: "Lahan A - Padi",
        estimasiMin: 6.8,
        estimasiMax: 7.5,
        estimasiAvg: 7.2,
        tanggalPanen: "2025-08-15",
        reliabilitas: 92,
        status: "optimal",
        kualitas: "Grade A",
        hargaPasar: 5500,
    },
    {
        lahan: "Lahan B - Jagung",
        estimasiMin: 4.5,
        estimasiMax: 5.0,
        estimasiAvg: 4.8,
        tanggalPanen: "2025-08-10",
        reliabilitas: 89,
        status: "optimal",
        kualitas: "Grade A",
        hargaPasar: 4200,
    },
    {
        lahan: "Lahan C - Cabai",
        estimasiMin: 1.0,
        estimasiMax: 1.4,
        estimasiAvg: 1.2,
        tanggalPanen: "2025-07-25",
        reliabilitas: 78,
        status: "waspada",
        kualitas: "Grade B",
        hargaPasar: 18000,
    },
    {
        lahan: "Lahan D - Tomat",
        estimasiMin: 3.2,
        estimasiMax: 3.7,
        estimasiAvg: 3.5,
        tanggalPanen: "2025-08-05",
        reliabilitas: 87,
        status: "optimal",
        kualitas: "Grade A",
        hargaPasar: 6500,
    },
];

const monthlyForecast = [
    { bulan: "Jul", panen: 1.2, target: 1.4 },
    { bulan: "Agt", panen: 16.5, target: 15.5 },
    { bulan: "Sep", panen: 0, target: 0 },
    { bulan: "Okt", panen: 0, target: 0 },
    { bulan: "Nov", panen: 8.2, target: 8.0 },
    { bulan: "Des", panen: 5.5, target: 6.0 },
];

const compareData = [
    { kategori: "Musim Lalu", volume: 15.8 },
    { kategori: "Prediksi AI", volume: 16.7 },
    { kategori: "Target Optimal", volume: 17.5 },
];

/* ================= COMPONENT ================= */

export function PrediksiPanen() {
    const totalEstimasi = harvestPredictions.reduce(
        (s, i) => s + i.estimasiAvg,
        0
    );
    const totalRevenue = harvestPredictions.reduce(
        (s, i) => s + i.estimasiAvg * i.hargaPasar * 1000,
        0
    );
    const avgReliabilitas =
        harvestPredictions.reduce((s, i) => s + i.reliabilitas, 0) /
        harvestPredictions.length;

    return (
        <div className="space-y-8">
            {/* ================= HERO HEADER ================= */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-3xl
                   bg-gradient-to-br from-green-50 via-white to-emerald-100
                   border border-green-200 p-6"
            >
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-green-300/30 rounded-full blur-3xl" />

                <p className="text-sm font-medium text-green-700">
                    🌾 AI Harvest Forecast
                </p>
                <h2 className="text-3xl font-semibold text-gray-900 mt-1">
                    Prediksi Panen & Perencanaan
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl">
                    Estimasi hasil panen berbasis kondisi lahan, cuaca, dan analisis AI
                    untuk keputusan produksi & penjualan yang lebih akurat.
                </p>
            </motion.div>

            {/* ================= SUMMARY ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Estimasi",
                        value: `${totalEstimasi.toFixed(1)} ton`,
                        icon: <Package className="w-7 h-7 text-green-600" />,
                        note: "+5.7% vs musim lalu",
                    },
                    {
                        label: "Est. Pendapatan",
                        value: `Rp ${(totalRevenue / 1_000_000).toFixed(1)} jt`,
                        icon: <DollarSign className="w-7 h-7 text-blue-600" />,
                        note: "Harga pasar saat ini",
                    },
                    {
                        label: "Reliabilitas",
                        value: `${avgReliabilitas.toFixed(0)}%`,
                        icon: <CheckCircle2 className="w-7 h-7 text-amber-600" />,
                        note: "Akurasi AI",
                    },
                    {
                        label: "Rentang Panen",
                        value: "27 – 47 hari",
                        icon: <Calendar className="w-7 h-7 text-purple-600" />,
                        note: "Estimasi waktu",
                    },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="bg-white/80 backdrop-blur
                       rounded-2xl ring-1 ring-black/5
                       p-5 shadow-sm hover:shadow-xl transition"
                    >
                        <div className="flex items-center justify-between mb-3">
                            {item.icon}
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <p className="text-2xl font-semibold text-gray-900">
                            {item.value}
                        </p>
                        <p className="text-gray-600">{item.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                    </motion.div>
                ))}
            </div>

            {/* ================= DETAIL PER LAHAN ================= */}
            <div className="space-y-4">
                {harvestPredictions.map((p, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white/80 backdrop-blur
                       rounded-2xl ring-1 ring-black/5
                       p-6 transition"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-gray-900">{p.lahan}</h3>
                                <p className="text-sm text-gray-600">
                                    Target panen{" "}
                                    {new Date(p.tanggalPanen).toLocaleDateString("id-ID")}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ring-1 ${p.status === "optimal"
                                        ? "bg-emerald-500/10 text-emerald-700 ring-emerald-400/30"
                                        : "bg-amber-500/10 text-amber-700 ring-amber-400/30"
                                    }`}
                            >
                                {p.status === "optimal" ? "Optimal" : "Waspada"}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                            <Info label="Estimasi" value={`${p.estimasiAvg} ton`} sub={`${p.estimasiMin}-${p.estimasiMax}`} />
                            <Info label="Kualitas" value={p.kualitas} />
                            <Info label="Harga" value={`Rp ${p.hargaPasar.toLocaleString()}`} sub="per kg" />
                            <Info
                                label="Pendapatan"
                                value={`Rp ${((p.estimasiAvg * p.hargaPasar * 1000) / 1_000_000).toFixed(1)} jt`}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600">Reliabilitas AI</span>
                                <span className="font-medium">{p.reliabilitas}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${p.reliabilitas}%` }}
                                    transition={{ duration: 0.8 }}
                                    className={`h-2 rounded-full ${p.reliabilitas >= 90
                                            ? "bg-emerald-500"
                                            : p.reliabilitas >= 80
                                                ? "bg-blue-500"
                                                : "bg-amber-500"
                                        }`}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ================= CHARTS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Proyeksi Panen 6 Bulan">
                    <LineChart data={monthlyForecast}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="bulan" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="panen" stroke="#10b981" strokeWidth={3} />
                        <Line dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" />
                    </LineChart>
                </ChartCard>

                <ChartCard title="Perbandingan Hasil">
                    <BarChart data={compareData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="kategori" />
                        <Tooltip />
                        <Bar dataKey="volume" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                    </BarChart>
                </ChartCard>
            </div>
        </div>
    );
}

/* ================= SMALL COMPONENTS ================= */

function Info({
    label,
    value,
    sub,
}: {
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className="p-3 rounded-xl bg-gray-50 ring-1 ring-black/5">
            <p className="text-xs text-gray-600">{label}</p>
            <p className="font-medium text-gray-900">{value}</p>
            {sub && <p className="text-xs text-gray-500">{sub}</p>}
        </div>
    );
}

function ChartCard({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white/80 backdrop-blur rounded-2xl ring-1 ring-black/5 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
            <ResponsiveContainer width="100%" height={300}>
                {children as any}
            </ResponsiveContainer>
        </div>
    );
}
