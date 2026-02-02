// src/components/artikel/FeaturedArticle.tsx
import { ExternalLink, Sparkles } from "lucide-react";
import type { Article } from "../../data/articleData";

export function FeaturedArticle({ article }: { article: Article }) {
    return (
        <div className="mb-10 bg-white/80 backdrop-blur rounded-3xl border border-green-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        Featured
                    </div>

                    <div className="text-xs text-gray-500">
                        {article.sourceName}
                        {article.publishedAt ? ` • ${article.publishedAt}` : ""}
                        {article.readTime ? ` • ${article.readTime} menit` : ""}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {article.title}
                    </h2>

                    <p className="text-gray-600 max-w-3xl">
                        {article.excerpt}
                    </p>

                    <div className="mt-3">
                        <span className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
                            {article.category.replaceAll("_", " ")}
                        </span>
                    </div>
                </div>

                <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg shadow-green-500/20 hover:brightness-110 transition"
                >
                    Baca Sumber
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            <div className="h-1 w-full bg-linear-to-r from-green-500 to-emerald-500" />
        </div>
    );
}
