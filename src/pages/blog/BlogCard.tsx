import { Calendar, ArrowRight, Tag } from 'lucide-react';
import type { BlogPost } from '../../data/blogData';

export default function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all">
            <div className="h-48 overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
            </div>

            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
                        >
                            <Tag className="w-3 h-3" />
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-green-700 line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="flex justify-between text-xs text-gray-400 border-t pt-4">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                    </span>
                    <span>{post.readTime}</span>
                    <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </article>
    );
}
