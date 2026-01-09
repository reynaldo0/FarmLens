interface Props {
    categories: string[];
    selected: string;
    onChange: (category: string) => void;
}

export function CategoryFilter({ categories, selected, onChange }: Props) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onChange(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${selected === category
                            ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-green-50 border border-green-200'
                        }`}
                >
                    {category === 'all' ? 'Semua Artikel' : category}
                </button>
            ))}
        </div>
    );
}
