import { Search } from 'lucide-react';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Cari tips, tanaman, atau solusi masalah..."
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-green-200 focus:border-green-500 focus:outline-none"
                />
            </div>
        </div>
    );
}
