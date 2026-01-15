import { motion } from "framer-motion";
import { Image, Calendar, Camera } from "lucide-react";

type Props = {
    totalEntries: number;
    activeMonth: string;
};

export default function JournalingHeader({
    totalEntries,
    activeMonth,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="
        relative overflow-hidden rounded-2xl
        border border-green-200
        bg-linear-to-br from-green-50 via-white to-green-100
        p-6
      "
        >
            {/* Decorative blur */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* LEFT */}
                <div>
                    <p className="text-sm text-green-700 font-medium">
                        📓 Plant Growth Journal
                    </p>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                        Journaling Tanaman
                    </h1>
                    <p className="text-sm text-gray-600 mt-2 max-w-md">
                        Catatan visual untuk memantau perkembangan tanaman dari hari ke hari
                    </p>
                </div>

                {/* RIGHT STATS */}
                <div className="flex items-center gap-4">
                    <StatCard
                        label="Total Jurnal"
                        value={totalEntries}
                        icon={<Image className="w-4 h-4 text-green-600" />}
                    />
                    <StatCard
                        label="Bulan Aktif"
                        value={activeMonth}
                        icon={<Calendar className="w-4 h-4 text-green-600" />}
                    />
                    <StatCard
                        label="Media"
                        value="Foto"
                        icon={<Camera className="w-4 h-4 text-green-600" />}
                    />
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({
    label,
    value,
    icon,
}: {
    label: string;
    value: string | number;
    icon: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center shadow-sm min-w-[90px]">
            <div className="flex justify-center mb-1">{icon}</div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{value}</p>
        </div>
    );
}
