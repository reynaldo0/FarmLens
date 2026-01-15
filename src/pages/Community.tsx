import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    Send,
    User,
    Sparkles,
    HelpCircle,
    Leaf,
    Lightbulb,
    BarChart3,
} from "lucide-react";

import {
    KOMUNITAS_DUMMY,
    type Post,
    type Category,
} from "../data/komunitasData";
import { getAuth } from "../utils/auth";

/* ================= STORAGE ================= */

const STORAGE_KEY = "farmlens_community";

/* ================= COMPONENT ================= */

export function getCommunityAuthor(): string {
    const user = getAuth();

    if (!user) return "Anonymous";

    return user.name?.trim() || "Anonymous";
}


export default function Community() {
    const [posts, setPosts] = useState<Post[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : KOMUNITAS_DUMMY;
    });

    const [activeTab, setActiveTab] = useState<"all" | Category>("all");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<Category>("tanya");

    /* ================= PERSIST ================= */

    const persist = (data: Post[]) => {
        setPosts(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    /* ================= CREATE POST ================= */

    const createPost = () => {
        if (!content.trim()) return;

        const newPost: Post = {
            id: crypto.randomUUID(),
            author: getCommunityAuthor(),
            category,
            content,
            comments: [],
            createdAt: new Date().toISOString(),
        };

        const updated = [newPost, ...posts];
        setPosts(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setContent("");
    };


    /* ================= ADD COMMENT ================= */

    const addComment = (postId: string, text: string) => {
        if (!text.trim()) return;

        persist(
            posts.map((p) =>
                p.id === postId
                    ? {
                        ...p,
                        comments: [
                            ...p.comments,
                            {
                                id: crypto.randomUUID(),
                                author: getCommunityAuthor(),
                                content: text,
                            },
                        ],
                    }
                    : p
            )
        );
    };

    /* ================= FILTER ================= */

    const filteredPosts = useMemo(() => {
        if (activeTab === "all") return posts;
        return posts.filter((p) => p.category === activeTab);
    }, [posts, activeTab]);

    const totalComments = posts.reduce(
        (sum, p) => sum + p.comments.length,
        0
    );

    return (
        <div className="min-h-screen bg-linear-to-b from-green-50 to-white py-12 pt-28">
            <div className="max-w-6xl mx-auto px-4 space-y-12">

                {/* HERO */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Community Center
                    </div>
                    <h1 className="text-4xl md:text-5xl mb-4 bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        Komunitas Urban Farming
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Diskusi, tanya jawab, dan berbagi pengalaman antar petani
                    </p>
                </div>

                {/* STATS */}
                <div className="bg-white rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Aktivitas Komunitas</p>
                        <p className="text-xl font-semibold">
                            {posts.length} diskusi • {totalComments} komentar
                        </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                </div>

                {/* TABS */}
                <div className="flex flex-wrap gap-2 justify-center">
                    <Tab label="Semua" icon={<MessageCircle />} active={activeTab === "all"} onClick={() => setActiveTab("all")} />
                    <Tab label="Tanya" icon={<HelpCircle />} active={activeTab === "tanya"} onClick={() => setActiveTab("tanya")} />
                    <Tab label="Pengalaman" icon={<Leaf />} active={activeTab === "pengalaman"} onClick={() => setActiveTab("pengalaman")} />
                    <Tab label="Tips" icon={<Lightbulb />} active={activeTab === "tips"} onClick={() => setActiveTab("tips")} />
                </div>

                {/* CREATE */}
                <div className="bg-white rounded-2xl p-6 space-y-4">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="tanya">Tanya</option>
                        <option value="pengalaman">Pengalaman</option>
                        <option value="tips">Tips</option>
                    </select>

                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl border px-4 py-3"
                        placeholder="Tulis diskusi Anda..."
                    />

                    <div className="flex justify-end">
                        <button
                            onClick={createPost}
                            className="bg-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" /> Kirim
                        </button>
                    </div>
                </div>

                {/* POSTS */}
                <AnimatePresence>
                    {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} onComment={addComment} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ================= COMPONENTS ================= */

function PostCard({
    post,
    onComment,
}: {
    post: Post;
    onComment: (id: string, text: string) => void;
}) {
    const [text, setText] = useState("");

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 space-y-4"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString("id-ID")}
                    </p>
                </div>
            </div>

            <p>{post.content}</p>

            {post.comments.map((c) => (
                <div key={c.id} className="pl-4 border-l text-sm">
                    <p className="font-medium">{c.author}</p>
                    <p>{c.content}</p>
                </div>
            ))}

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    placeholder="Komentar..."
                />
                <button
                    onClick={() => {
                        onComment(post.id, text);
                        setText("");
                    }}
                    className="bg-gray-900 text-white px-4 rounded-lg"
                >
                    Kirim
                </button>
            </div>
        </motion.div>
    );
}

function Tab({
    label,
    icon,
    active,
    onClick,
}: {
    label: string;
    icon: React.ReactNode;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 text-sm ${active
                ? "bg-green-600 text-white"
                : "bg-white border text-gray-600"
                }`}
        >
            {icon} {label}
        </button>
    );
}
