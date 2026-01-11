export default function HeroModelLoader() {
    return (
        <div className="flex items-center justify-center w-full h-full bg-white/60 backdrop-blur-sm rounded-3xl">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />

                {/* Text */}
                <p className="text-sm text-green-700 font-medium animate-pulse">
                    Memuat Logo..
                </p>
            </div>
        </div>
    );
}
