import { Calendar, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import type { Article } from '../../data/articleData';

export function FeaturedArticle({ article }: { article: Article }) {
    return (
        <div className="mb-16">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">Artikel Unggulan</span>
            </div>

            <div className="group bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
                        <p className="text-gray-600 mb-6">{article.excerpt}</p>

                        <div className="flex gap-4 text-sm text-gray-500 mb-6">
                            <span className="flex gap-1"><User className="w-4" />{article.author}</span>
                            <span className="flex gap-1"><Calendar className="w-4" />{article.date}</span>
                            <span className="flex gap-1"><Clock className="w-4" />{article.readTime}</span>
                        </div>

                        <button className="inline-flex items-center gap-2 text-green-600 font-medium">
                            Baca Selengkapnya <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
