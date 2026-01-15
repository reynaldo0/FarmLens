import { motion } from "framer-motion";

type Props = {
    entry: any;
    onClose: () => void;
};

export default function ViewJournalModal({ entry, onClose }: Props) {
    if (!entry) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl max-w-lg w-full p-6"
            >
                <img src={entry.image} className="rounded-xl mb-4" />
                <p className="text-gray-700 whitespace-pre-wrap">
                    {entry.description}
                </p>

                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-800"
                >
                    Tutup
                </button>
            </motion.div>
        </div>
    );
}
