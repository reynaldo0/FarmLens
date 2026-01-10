import {
    Bug,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Droplet,
    Info,
    Sprout,
    Sun,
    XCircle
} from 'lucide-react';
import { useState, type JSX } from 'react';
import { STATUS_CONFIG, type Plant } from '../../data/plantsData';

export default function PlantCard({ plant }: { plant: Plant }) {
    const [open, setOpen] = useState(false);
    const status = STATUS_CONFIG[plant.status];
    const StatusIcon = status.icon;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-48">
                <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                    <span className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-sm flex gap-1`}>
                        <StatusIcon className="w-4 h-4" /> {status.label}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold">{plant.name}</h3>
                <p className="text-sm italic text-gray-500">{plant.scientificName}</p>

                <div className="grid grid-cols-3 gap-3 my-6">
                    <InfoBox icon={<Droplet />} text={plant.careBasics.water} />
                    <InfoBox icon={<Sun />} text={plant.careBasics.sunlight} />
                    <InfoBox icon={<Sprout />} text={plant.careBasics.fertilizer} />
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="w-full bg-linear-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl flex justify-center gap-2"
                >
                    <Bug /> {open ? 'Sembunyikan' : 'Lihat'} Penyakit
                    {open ? <ChevronUp /> : <ChevronDown />}
                </button>

                {open && (
                    <div className="mt-6 space-y-4">
                        {plant.diseases.map((d, i) => (
                            <div key={i} className="bg-red-50 p-4 rounded-xl">
                                <h4 className="font-semibold">{d.name}</h4>

                                <ul className="text-sm mt-2 space-y-1">
                                    {d.symptoms.map((s, j) => (
                                        <li key={j} className="flex gap-1">
                                            <XCircle className="w-4 h-4 text-red-500" /> {s}
                                        </li>
                                    ))}
                                </ul>

                                <ul className="text-sm mt-2 space-y-1">
                                    {d.solutions.map((s, j) => (
                                        <li key={j} className="flex gap-1">
                                            <CheckCircle className="w-4 h-4 text-green-600" /> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div className="bg-blue-50 p-4 rounded-xl">
                            <h4 className="font-semibold flex gap-1">
                                <Info /> Masalah Umum
                            </h4>
                            <ul className="text-sm mt-2 space-y-1">
                                {plant.commonIssues.map((i, j) => (
                                    <li key={j}>• {i}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function InfoBox({ icon, text }: { icon: JSX.Element; text: string }) {
    return (
        <div className="text-center p-3 bg-gray-50 rounded-lg text-xs">
            <div className="mx-auto mb-1 text-green-600">{icon}</div>
            {text}
        </div>
    );
}
