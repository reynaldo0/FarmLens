export function DashboardOverviewSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header */}
            <div>
                <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>

            {/* Alert */}
            <div className="rounded-xl border p-4 flex gap-3">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                    <div className="h-3 w-56 bg-gray-200 rounded" />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white border rounded-xl p-5 space-y-3">
                        <div className="flex justify-between">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="h-6 w-10 bg-gray-200 rounded" />
                        </div>
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                ))}
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* List */}
                <div className="bg-white border rounded-xl p-6 space-y-4">
                    <div className="h-5 w-48 bg-gray-200 rounded" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-gray-200 rounded-lg" />
                    ))}
                </div>

                {/* Chart */}
                <div className="bg-white border rounded-xl p-6">
                    <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
                    <div className="h-64 bg-gray-200 rounded-lg" />
                </div>
            </div>

            {/* Bottom Cards */}
            <div className="bg-white border rounded-xl p-6">
                <div className="h-5 w-56 bg-gray-200 rounded mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-36 bg-gray-200 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    );
}
