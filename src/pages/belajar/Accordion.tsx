import {
    ChevronDown,
    ChevronUp,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import type { BelajarItem } from '../../data/belajarData';

interface Props {
    item: BelajarItem;
    isOpen: boolean;
    isCompleted: boolean;
    onToggle: () => void;
    onComplete: () => void;
}

export default function AccordionItem({
    item,
    isOpen,
    isCompleted,
    onToggle,
    onComplete,
}: Props) {
    const Icon = item.icon;

    return (
        <div className={`bg-white rounded-2xl shadow-md overflow-hidden ${isOpen && 'shadow-xl'}`}>
            <button
                onClick={onToggle}
                className="w-full px-6 py-5 flex justify-between hover:bg-green-50"
            >
                <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-left">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex gap-3 text-sm text-gray-600">
                            <Clock className="w-4 h-4" /> {item.duration}
                            {isCompleted && (
                                <span className="flex gap-1 text-green-600">
                                    <CheckCircle2 className="w-4 h-4" /> Selesai
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>

            {isOpen && (
                <div className="px-6 pb-6">
                    <ul className="space-y-3 mt-4">
                        {item.content.map((text, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                                {text}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={onComplete}
                        className={`mt-6 w-full py-3 rounded-xl font-medium
              ${isCompleted
                                ? 'bg-green-600 text-white'
                                : 'bg-white border-2 border-green-200 text-green-700'
                            }
            `}
                    >
                        {isCompleted ? 'Modul Selesai' : 'Tandai Selesai'}
                    </button>
                </div>
            )}
        </div>
    );
}
