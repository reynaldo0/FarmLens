// src/components/artikel/ArticleCard.tsx
import { ExternalLink } from "lucide-react";
import type { Article } from "../../data/articleData";

export function ArticleCard({ article }: { article: Article }) {
    return (
        <article className="bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
            <div className="p-6">
                <div className="text-xs text-gray-500">
                    {article.sourceName}
                    {article.publishedAt ? ` • ${article.publishedAt}` : ""}
                </div>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                    {article.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                    {article.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                        {article.category.replaceAll("_", " ")}
                    </span>

                    <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800"
                    >
                        Sumber Artikel
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>

            <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500 opacity-0 hover:opacity-100 transition-opacity" />
        </article>
    );
}
