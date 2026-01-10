import type { TabType } from "../../data/belajarData";

interface Props {
    active: TabType;
    onChange: (tab: TabType) => void;
}

export default function Tabs({ active, onChange }: Props) {
    const tabs: { key: TabType; label: string }[] = [
        { key: 'tanaman', label: '🌱 Jenis Tanaman' },
        { key: 'perawatan', label: '💧 Perawatan' },
        { key: 'media', label: '🌾 Media & Pupuk' },
    ];

    return (
        <div className="flex gap-3 mb-8 bg-white p-2 rounded-2xl shadow-md">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onChange(tab.key)}
                    className={`flex-1 px-6 py-3 rounded-xl font-medium transition-all
            ${active === tab.key
                            ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white'
                            : 'text-gray-700 hover:bg-green-50'
                        }
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
