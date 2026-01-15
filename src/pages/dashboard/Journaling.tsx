import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Image as ImageIcon, Calendar } from "lucide-react";

import type { JournalEntry } from "../../data/journal";
import { groupByMonth } from "../../utils/journal";
import AddJournalModal from "../../components/AddJournalModal";
import ViewJournalModal from "../../components/ViewJournalModal";
import JournalingHeader from "../../components/JournalingHeader";

const STORAGE_KEY = "farmlens_journal";

export default function Journaling() {
    const [entries, setEntries] = useState<JournalEntry[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [openAdd, setOpenAdd] = useState(false);
    const [active, setActive] = useState<JournalEntry | null>(null);

    const persist = (data: JournalEntry[]) => {
        setEntries(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const months = useMemo(() => groupByMonth(entries), [entries]);

    return (
        <div className="space-y-8">

            {/* ================= HEADER ================= */}
            <JournalingHeader
                totalEntries={entries.length}
                activeMonth={months[0]?.monthLabel ?? "-"}
            />


            {/* ================= INSIGHT CARD ================= */}
            <div className="flex item items-center justify-between">
                <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 w-full mr-10">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">
                            Total catatan tersimpan
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {entries.length} jurnal visual
                        </p>
                    </div>

                </div>
                <button
                    onClick={() => setOpenAdd(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
            bg-green-600 text-white hover:bg-green-700 shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Tambah Jurnal
                </button>
            </div>

            {/* ================= MONTH SECTIONS ================= */}
            {months.map((month) => (
                <section key={month.monthKey} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {month.monthLabel}
                    </h3>

                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                        {month.entries.map((e) => (
                            <motion.button
                                key={e.id}
                                whileHover={{ scale: 1.03 }}
                                onClick={() => setActive(e)}
                                className="
                  group relative aspect-square overflow-hidden
                  rounded-xl bg-gray-100
                  ring-1 ring-black/5 hover:ring-green-400 transition
                "
                            >
                                <img
                                    src={e.image}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />

                                {/* DATE BADGE */}
                                <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                                    {new Date(e.dateISO).getDate()}
                                </div>

                                {/* HOVER OVERLAY */}
                                <div className="
                  absolute inset-0 bg-black/40 opacity-0
                  group-hover:opacity-100 transition
                  flex items-center justify-center
                ">
                                    <p className="text-xs text-white text-center px-2 line-clamp-2">
                                        {e.description || "Lihat detail"}
                                    </p>
                                </div>
                            </motion.button>
                        ))}

                        {/* QUICK ADD */}
                        <button
                            onClick={() => setOpenAdd(true)}
                            className="
                aspect-square rounded-xl border-2 border-dashed
                flex items-center justify-center
                text-gray-400 hover:text-green-600
                hover:border-green-400 transition
              "
                        >
                            <ImageIcon className="w-6 h-6" />
                        </button>
                    </div>
                </section>
            ))}

            {/* ================= MODALS ================= */}
            <AddJournalModal
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                onSave={(entry) => persist([entry, ...entries])}
            />

            <ViewJournalModal
                entry={active}
                onClose={() => setActive(null)}
            />
        </div>
    );
}
