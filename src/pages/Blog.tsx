import { useState, useMemo } from 'react';
import { BLOG_POSTS, BLOG_TAGS } from '../data/blogData';
import BlogHeader from './blog/Header';
import SearchBar from './blog/SearchBar';
import TagFilter from './blog/TagFilter';
import BlogCard from './blog/BlogCard';
import NewsletterCTA from './blog/CTA';

export default function Blog() {
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState('all');

    const filteredPosts = useMemo(() => {
        return BLOG_POSTS.filter(post => {
            const matchSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(search.toLowerCase());

            const matchTag = tag === 'all' || post.tags.includes(tag);

            return matchSearch && matchTag;
        });
    }, [search, tag]);

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white pt-28 md:pt-32">
            <div className="max-w-7xl mx-auto px-4">

                <BlogHeader />
                <SearchBar value={search} onChange={setSearch} />
                <TagFilter tags={BLOG_TAGS} active={tag} onSelect={setTag} />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-20 text-gray-600">
                        🔍 Tidak ada artikel ditemukan
                    </div>
                )}

                <NewsletterCTA />

            </div>
        </div>
    );
}
