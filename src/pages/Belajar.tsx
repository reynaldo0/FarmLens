import { useState } from 'react';
import { BELAJAR_CONTENT, type TabType } from '../data/belajarData';
import ProgressBar from './belajar/ProgressBar';
import Tabs from './belajar/Tabs';
import AccordionItem from './belajar/Accordion';

export default function Belajar() {
    const [activeTab, setActiveTab] = useState<TabType>('tanaman');
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [completed, setCompleted] = useState<number[]>([]);

    const content = BELAJAR_CONTENT[activeTab];

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-12 pt-28 md:pt-32">
            <div className="max-w-6xl mx-auto px-4">

                <div className="text-center mb-12">
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        📚 Learning Center
                    </div>
                    <h1 className="text-4xl md:text-5xl mb-4">
                        <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            Belajar Urban Farming
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Panduan lengkap dari dasar hingga mahir untuk petani pemula dan pelaku urban farming
                    </p>
                </div>
                <ProgressBar completed={completed.length} total={content.length} />

                <Tabs
                    active={activeTab}
                    onChange={(tab) => {
                        setActiveTab(tab);
                        setOpenIndex(0);
                        setCompleted([]);
                    }}
                />

                <div className="space-y-4">
                    {content.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            isCompleted={completed.includes(index)}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            onComplete={() =>
                                setCompleted(prev =>
                                    prev.includes(index)
                                        ? prev.filter(i => i !== index)
                                        : [...prev, index]
                                )
                            }
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-3">Siap Praktek Langsung?</h3>
                    <p className="mb-6 text-green-50">
                        Gunakan Kamus Tanaman untuk mendeteksi penyakit tanaman
                    </p>
                    <a
                        href="/kamus-tanaman"
                        className="bg-white text-green-700 px-8 py-3 rounded-xl font-medium"
                    >
                        Buka Kamus Tanaman
                    </a>
                </div>

            </div>
        </div>
    );
}
