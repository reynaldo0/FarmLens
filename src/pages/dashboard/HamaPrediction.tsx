import { useState } from "react";
import { lahanData } from "../../data/lahanData";
import { PestPredictionCard } from "../../components/PestPrediction";
import { useBmkgJakarta } from "../../hooks/useBmkgJakarta";
import { motion } from "framer-motion";

export function HamaPrediction() {
    const [activeLahanId, setActiveLahanId] = useState(lahanData[0].id);
    const activeLahan = lahanData.find((l) => l.id === activeLahanId);

    const { seasonToday, loading } = useBmkgJakarta();

    if (!activeLahan) return null;

    return (
        <section className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl
             bg-linear-to-br from-green-50 via-white to-green-100
             border border-green-200 p-6"
            >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-green-700">
                        🐛 Seasonal Pest Intelligence
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                        Prediksi Hama Musiman
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-xl">
                        Prediksi risiko hama berbasis data BMKG realtime dan kondisi
                        spesifik setiap lahan.
                    </p>
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-2 flex-wrap"
            >
                {lahanData.map((l) => (
                    <motion.button
                        key={l.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveLahanId(l.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ring-1 transition
        ${l.id === activeLahanId
                                ? "bg-linear-to-r from-green-600 to-green-500 text-white ring-green-300 shadow"
                                : "bg-white/80 backdrop-blur ring-gray-200 hover:ring-green-300"
                            }`}
                    >
                        {l.name}
                    </motion.button>
                ))}
            </motion.div>


            {!loading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl bg-amber-50/80 backdrop-blur
               ring-1 ring-amber-200 p-4 text-sm"
                >
                    🌦️ Kondisi hari ini menurut BMKG:{" "}
                    <b className="text-amber-700">{seasonToday}</b>
                </motion.div>
            )}


            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur
             rounded-2xl border border-gray-200
             shadow-sm p-6"
            >
                <PestPredictionCard
                    crop={activeLahan.crop}
                    lahanStatus={activeLahan.status}
                    season={seasonToday}
                />
            </motion.div>

        </section>
    );
}
