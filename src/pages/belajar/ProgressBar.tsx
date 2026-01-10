import { BookOpen } from 'lucide-react';

interface Props {
    completed: number;
    total: number;
}

export default function ProgressBar({ completed, total }: Props) {
    const progress = total ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-700">Progress Belajar</span>
                </div>
                <span className="text-2xl font-bold text-green-600">{progress}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-500 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <p className="text-sm text-gray-600 mt-2">
                {completed} dari {total} modul selesai
            </p>
        </div>
    );
}
