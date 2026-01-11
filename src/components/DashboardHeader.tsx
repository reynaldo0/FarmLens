import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userRole: 'petani' | 'pembeli' | 'admin';
}

export default function DashboardHeader({
    sidebarOpen,
    setSidebarOpen,
    userRole,
}: Props) {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <Link to={'/'}>
                        <div className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <div>
                                <h1 className="text-lg tracking-tight text-neutral-900 group-hover:text-green-700 font-semibold">Farmlens</h1>
                                <p className="text-xs text-gray-500">
                                    Dashboard Pertanian Terintegrasi
                                </p>
                            </div>
                        </div></Link>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block text-right">
                        <p className="text-sm text-gray-900">FARMLENS TEAM</p>
                        <p className="text-xs text-gray-500 capitalize">{userRole}</p>
                    </div>

                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-medium">FT</span>
                    </div>
                </div>

            </div>
        </header>
    );
}
