import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (entry: any) => void;
};

export default function AddJournalModal({ open, onClose, onSave }: Props) {
    const [image, setImage] = useState<string | null>(null);
    const [desc, setDesc] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4"
            >
                <h3 className="text-lg font-semibold">Tambah Jurnal</h3>

                <label className="block">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = () => setImage(reader.result as string);
                            reader.readAsDataURL(file);
                        }}
                    />

                    <div className="h-40 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-green-500">
                        {image ? (
                            <img
                                src={image}
                                className="h-full w-full object-cover rounded-xl"
                            />
                        ) : (
                            <Plus className="w-6 h-6 text-gray-400" />
                        )}
                    </div>
                </label>

                <textarea
                    rows={3}
                    placeholder="Deskripsi perkembangan tanaman..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border rounded-xl px-3 py-2"
                />

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600">
                        Batal
                    </button>
                    <button
                        onClick={() => {
                            if (!image) return;
                            onSave({
                                id: crypto.randomUUID(),
                                dateISO: new Date().toISOString().slice(0, 10),
                                image,
                                description: desc,
                            });
                            setImage(null);
                            setDesc("");
                            onClose();
                        }}
                        className="px-5 py-2 rounded-xl bg-green-600 text-white"
                    >
                        Simpan
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
