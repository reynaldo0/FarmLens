import {
    Bug,
    Droplet,
    Sprout,
    Sun,
} from 'lucide-react';
import { useState, type JSX } from 'react';
import { STATUS_CONFIG, type Plant } from '../../data/plantsData';
import PlantDiseaseModal from '../../components/PlantDiseaseModal';

export default function PlantCard({ plant }: { plant: Plant }) {
    const [openModal, setOpenModal] = useState(false);

    const status = STATUS_CONFIG[plant.status];
    const StatusIcon = status.icon;

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-48 bg-black">
                    <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute top-4 right-4">
                        <span className={`${status.bg} ${status.color} px-3 py-1 rounded-full text-sm flex gap-1`}>
                            <StatusIcon className="w-4 h-4" /> {status.label}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold">{plant.name}</h3>
                    <p className="text-sm italic text-gray-500">
                        {plant.scientificName}
                    </p>

                    <div className="grid grid-cols-3 gap-3 my-6">
                        <InfoBox icon={<Droplet />} text={plant.careBasics.water} />
                        <InfoBox icon={<Sun />} text={plant.careBasics.sunlight} />
                        <InfoBox icon={<Sprout />} text={plant.careBasics.fertilizer} />
                    </div>

                    <button
                        onClick={() => setOpenModal(true)}
                        className="
              w-full flex items-center justify-center gap-2
              bg-linear-to-r from-green-600 to-emerald-600
              text-white py-3 rounded-xl
              font-medium hover:shadow-lg transition
            "
                    >
                        <Bug className="w-5 h-5" />
                        Lihat Penyakit & Solusi
                    </button>
                </div>
            </div>

            {/* MODAL */}
            <PlantDiseaseModal
                plant={plant}
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
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
