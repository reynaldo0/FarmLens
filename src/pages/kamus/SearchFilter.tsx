import { Search } from 'lucide-react';

interface Props {
    search: string;
    category: string;
    categories: string[];
    onSearch: (value: string) => void;
    onCategory: (value: string) => void;
}

export default function SearchFilter({
    search,
    category,
    categories,
    onSearch,
    onCategory,
}: Props) {
    return (
        <div className="mb-8 space-y-4">
            <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Cari tanaman (cabai, tomat, selada...)"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-green-200 focus:border-green-500"
                />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onCategory(cat)}
                        className={`px-6 py-2 rounded-full font-medium transition
              ${category === cat
                                ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white'
                                : 'bg-white border border-green-200 hover:bg-green-50'
                            }
            `}
                    >
                        {cat === 'all' ? 'Semua Tanaman' : cat}
                    </button>
                ))}
            </div>
        </div>
    );
}
