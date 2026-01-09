import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import type { Article } from '../../data/article';

export function ArticleCard({ article }: { article: Article }) {
    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl">
            <div className="relative h-48">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

                <div className="flex gap-3 text-xs text-gray-500 mb-4">
                    <User className="w-3" />{article.author}
                    <Calendar className="w-3" />{article.date}
                    <Clock className="w-3" />{article.readTime}
                </div>

                <button className="inline-flex items-center gap-2 text-green-600 text-sm">
                    Baca Artikel <ArrowRight className="w-4" />
                </button>
            </div>
        </article>
    );
}
