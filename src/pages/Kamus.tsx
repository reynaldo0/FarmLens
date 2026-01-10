import { useState, useMemo } from 'react';
import { PLANT_CATEGORIES, PLANTS } from '../data/plantsData';
import KamusHeader from './kamus/KamusHeader';
import SearchFilter from './kamus/SearchFilter';
import PlantCard from './kamus/PlantCard';
import AIDetectionCTA from './kamus/AiDetectionCTA';


export default function KamusTanaman() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const plants = useMemo(() => {
        return PLANTS.filter(p => {
            const matchSearch =
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.scientificName.toLowerCase().includes(search.toLowerCase());

            const matchCategory = category === 'all' || p.category === category;

            return matchSearch && matchCategory;
        });
    }, [search, category]);

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-28 md:pt-32">
            <div className="max-w-7xl mx-auto px-4">

                <KamusHeader />
                <SearchFilter
                    search={search}
                    category={category}
                    categories={PLANT_CATEGORIES}
                    onSearch={setSearch}
                    onCategory={setCategory}
                />

                <div className="grid md:grid-cols-2 gap-6">
                    {plants.map(p => (
                        <PlantCard key={p.id} plant={p} />
                    ))}
                </div>

                {plants.length === 0 && (
                    <div className="text-center py-20 text-gray-600">
                        🌱 Tanaman tidak ditemukan
                    </div>
                )}

                <AIDetectionCTA />

            </div>
        </div>
    );
}
