import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Store, Phone, FileText, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAuth } from "../../../utils/auth";
import { createOrUpdateStore, getStoreByOwner } from "../../../utils/marketplaceStore";

export default function MarketplaceOnBoarding() {
    const navigate = useNavigate();

    // ✅ hooks harus selalu dipanggil, jangan setelah return
    const user = getAuth();
    const isLoggedIn = !!user;
    const isOwner = user?.role === "pemilik_marketplace";

    const existing = useMemo(() => {
        if (!user) return undefined;
        return getStoreByOwner(user.id);
    }, [user]);

    const [namaToko, setNamaToko] = useState(existing?.namaToko ?? "");
    const [deskripsi, setDeskripsi] = useState(existing?.deskripsi ?? "");
    const [provinceCode, setProvinceCode] = useState(existing?.provinceCode ?? "31");
    const [alamat, setAlamat] = useState(existing?.alamat ?? "");
    const [telepon, setTelepon] = useState(existing?.telepon ?? "");

    const title = existing ? "Kelola Profil Marketplace" : "Daftar Marketplace";
    const subtitle = existing
        ? "Perbarui profil toko agar tampil lebih profesional di marketplace."
        : "Buat marketplace/toko agar bisa jual hasil tani berlebih dan kolaborasi dengan petani.";

    // ✅ view guard dibuat sebagai variabel, bukan return sebelum hooks
    const guardView = useMemo(() => {
        if (!isLoggedIn) {
            return (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-amber-600 mt-0.5" />
                        <div>
                            <h3 className="text-gray-900">Kamu belum login</h3>
                            <p className="text-gray-600 mt-1 text-sm">Silakan login dulu untuk melanjutkan.</p>
                            <Link to="/login" className="inline-flex mt-3 text-green-700 font-semibold hover:underline">
                                Ke halaman Login →
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        if (!isOwner) {
            return (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                        <div>
                            <h3 className="text-gray-900">Akses dibatasi</h3>
                            <p className="text-gray-600 mt-1 text-sm">
                                Halaman ini khusus untuk role <b>Pemilik Marketplace</b>.
                            </p>
                            <Link to="/dashboard/overview" className="inline-flex mt-3 text-green-700 font-semibold hover:underline">
                                Kembali ke Dashboard →
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }, [isLoggedIn, isOwner]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        createOrUpdateStore({
            ownerId: user.id,
            namaToko,
            deskripsi,
            provinceCode,
            alamat,
            telepon,
        });

        navigate("/dashboard/marketplace-owner");
    };

    // ✅ kalau tidak lolos guard, tampilkan guardView
    if (guardView) {
        return (
            <div className="space-y-6">
                {/* Header style AdminPanel */}
                <div>
                    <h2 className="text-gray-900">Marketplace Onboarding</h2>
                    <p className="text-gray-500 mt-1">Buat profil toko agar bisa jual hasil tani berlebih.</p>
                </div>
                {guardView}
            </div>
        );
    }

    // ✅ main view (AdminPanel style)
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-gray-900">{title}</h2>
                    <p className="text-gray-500 mt-1">{subtitle}</p>
                </div>

                <Link
                    to="/dashboard/marketplace-owner"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
            </div>

            {/* Summary Stats (konsisten AdminPanel) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <Store className="w-8 h-8 text-green-600" />
                        <CheckCircle2 className={`w-5 h-5 ${existing ? "text-green-600" : "text-gray-400"}`} />
                    </div>
                    <p className="text-2xl text-gray-900">{existing ? "Aktif" : "Belum"}</p>
                    <p className="text-gray-600 mt-1">Status Marketplace</p>
                    <p className="text-xs text-gray-500 mt-1">{existing ? "Profil toko sudah dibuat" : "Buat profil toko dulu"}</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{provinceCode || "-"}</p>
                    <p className="text-gray-600 mt-1">Kode Provinsi</p>
                    <p className="text-xs text-gray-500 mt-1">Bisa dimapping ke nama provinsi via wilayah.id</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <FileText className="w-8 h-8 text-amber-600" />
                    </div>
                    <p className="text-2xl text-gray-900">{Math.min(deskripsi.length, 999)}</p>
                    <p className="text-gray-600 mt-1">Panjang Deskripsi</p>
                    <p className="text-xs text-gray-500 mt-1">Lengkapi agar toko lebih dipercaya</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-1">Informasi Toko</h3>
                <p className="text-gray-500 text-sm mb-5">
                    Isi data profil toko. Kamu bisa ubah kapan saja.
                </p>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nama Toko */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700">Nama Toko</label>
                        <input
                            value={namaToko}
                            onChange={(e) => setNamaToko(e.target.value)}
                            required
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                            placeholder="Contoh: Toko Panen Hijau"
                        />
                    </div>

                    {/* Deskripsi */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700">Deskripsi Singkat</label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                            rows={4}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                            placeholder="Jelaskan kualitas produk, sistem pengiriman, area layanan, dsb."
                        />
                    </div>

                    {/* Kode Provinsi */}
                    <div>
                        <label className="text-sm text-gray-700">Kode Provinsi</label>
                        <input
                            value={provinceCode}
                            onChange={(e) => setProvinceCode(e.target.value)}
                            required
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                            placeholder="Contoh: 31"
                        />
                        <p className="text-xs text-gray-500 mt-1">Contoh: 31 (DKI), 32 (Jabar), 33 (Jateng)</p>
                    </div>

                    {/* Telepon */}
                    <div>
                        <label className="text-sm text-gray-700">Telepon (opsional)</label>
                        <div className="mt-2 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <input
                                value={telepon}
                                onChange={(e) => setTelepon(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                                placeholder="08xx-xxxx-xxxx"
                            />
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-700">Alamat (opsional)</label>
                        <input
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-400 outline-none"
                            placeholder="Alamat gudang / toko"
                        />
                    </div>

                    {/* Actions */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 mt-2">
                        <button
                            type="submit"
                            className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                            {existing ? "Simpan Perubahan" : "Buat Toko"}
                        </button>

                        <Link
                            to="/dashboard/marketplace-owner"
                            className="px-5 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-center"
                        >
                            Lanjut ke Dashboard Toko
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
