import { useMemo, useState } from 'react';
import { CategoryFilter } from './artikel/CategoryFilter';
import { articles, categories } from '../data/articleData';
import { FeaturedArticle } from './artikel/FeaturedArticle';
import { ArticleCard } from './artikel/ArticleCard';

export default function Artikel() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { featured, filtered } = useMemo(() => {
        const featured = articles.find(a => a.featured);
        const filtered =
            selectedCategory === 'all'
                ? articles.filter(a => !a.featured)
                : articles.filter(a => a.category === selectedCategory);

        return { featured, filtered };
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        📰 In-Depth Articles
                    </div>
                    <h1 className="text-4xl md:text-5xl mb-4">
                        <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            Artikel Mendalam
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Eksplorasi isu ketahanan pangan, urban farming, dan dampak perubahan iklim pada pertanian
                    </p>
                </div>

                <CategoryFilter
                    categories={categories}
                    selected={selectedCategory}
                    onChange={setSelectedCategory}
                />

                {featured && selectedCategory === 'all' && (
                    <FeaturedArticle article={featured} />
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map(article => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

            </div>
        </div>
    );
}
