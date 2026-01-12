import { useState } from "react";
import { lahanData } from "../../data/lahanData";
import { PestPredictionCard } from "../../components/PestPrediction";
import { useBmkgJakarta } from "../../hooks/useBmkgJakarta";

export function HamaPrediction() {
    const [activeLahanId, setActiveLahanId] = useState(lahanData[0].id);
    const activeLahan = lahanData.find((l) => l.id === activeLahanId);

    const { seasonToday, loading } = useBmkgJakarta();

    if (!activeLahan) return null;

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Prediksi Hama Musiman
                </h2>
                <p className="text-sm text-gray-500">
                    Realtime berdasarkan BMKG hari ini & kondisi lahan
                </p>
            </div>

            <div className="flex gap-2 flex-wrap">
                {lahanData.map((l) => (
                    <button
                        key={l.id}
                        onClick={() => setActiveLahanId(l.id)}
                        className={`px-4 py-2 rounded-xl text-sm ring-1 ${l.id === activeLahanId
                                ? "bg-emerald-600 text-white"
                                : "bg-white"
                            }`}
                    >
                        {l.name}
                    </button>
                ))}
            </div>

            {!loading && (
                <div className="rounded-xl bg-amber-50 ring-1 ring-amber-200 p-4 text-sm">
                    🌦️ Kondisi hari ini menurut BMKG: <b>{seasonToday}</b>
                </div>
            )}

            <PestPredictionCard
                crop={activeLahan.crop}
                lahanStatus={activeLahan.status}
                season={seasonToday}
            />
        </section>
    );
}
