import {
    Bug,
    CheckCircle,
    Info,
    X,
    XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Plant } from '../data/plantsData';

interface Props {
    plant: Plant;
    open: boolean;
    onClose: () => void;
}

export default function PlantDiseaseModal({ plant, open, onClose }: Props) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b">
                                <div className="flex items-center gap-2">
                                    <Bug className="w-5 h-5 text-green-600" />
                                    <h3 className="text-lg font-semibold">
                                        Penyakit & Solusi — {plant.name}
                                    </h3>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                {/* Diseases */}
                                {plant.diseases.map((d, i) => (
                                    <div key={i} className="bg-red-50 p-4 rounded-xl">
                                        <h4 className="font-semibold mb-2">{d.name}</h4>

                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <div className="flex items-center gap-1 text-gray-600 font-medium mb-1">
                                                    <XCircle className="w-4 h-4 text-red-500" />
                                                    Gejala
                                                </div>
                                                <ul className="space-y-1">
                                                    {d.symptoms.map((s, j) => (
                                                        <li key={j} className="flex gap-2">
                                                            <span className="text-red-500">•</span> {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-1 text-gray-600 font-medium mb-1">
                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                    Solusi
                                                </div>
                                                <ul className="space-y-1">
                                                    {d.solutions.map((s, j) => (
                                                        <li key={j} className="flex gap-2">
                                                            <span className="text-green-600">✓</span> {s}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Common Issues */}
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4 text-blue-600" />
                                        Masalah Umum
                                    </h4>
                                    <ul className="text-sm space-y-1">
                                        {plant.commonIssues.map((i, j) => (
                                            <li key={j}>• {i}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
