import { Tag } from 'lucide-react';

interface Props {
    tags: string[];
    active: string;
    onSelect: (tag: string) => void;
}

export default function TagFilter({ tags, active, onSelect }: Props) {
    return (
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {tags.map(tag => (
                <button
                    key={tag}
                    onClick={() => onSelect(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all
            ${active === tag
                            ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-green-50 border border-green-200'
                        }
          `}
                >
                    <span className="flex items-center gap-1">
                        {active === tag && <Tag className="w-3 h-3" />}
                        {tag === 'all' ? 'Semua' : tag}
                    </span>
                </button>
            ))}
        </div>
    );
}
