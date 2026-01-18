import { AnimatePresence, motion } from "framer-motion";
import {
    Calendar,
    CheckCircle2,
    MapPin,
    Package,
    Phone,
    Search,
    ShoppingCart,
    Star,
    TrendingUp,
    Store,
    Wrench,
    Sprout,
    BadgeCheck,
    Truck,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";

type MarketplaceItem = {
    id: number;
    komoditas: string;
    petani: string;
    lokasi: string;
    volume: number;
    volumeRange: string;
    tanggalPanen: string;
    harga: number;
    kualitas: string;
    reliabilitas: number;
    rating: number;
    status: "available" | "reserved";
    verified: boolean;
};

type FarmingSupplyItem = {
    id: number;
    nama: string;
    kategori: "alat" | "benih" | "pupuk" | "media" | "pestisida";
    brand?: string;
    lokasi: string;
    stok: number;
    satuan: string;
    harga: number;
    rating: number;
    verified: boolean;
    status: "available" | "reserved";
    estimasiKirimHari: number;
};

type WilayahItem = { code: string; name: string };
type WilayahResponse = { data: WilayahItem[]; meta?: { updated_at?: string } };

type PartnerStore = {
    id: string;
    nama: string;
    alamat: string;
    telepon?: string;
    rating: number;
    provinceCode?: string;
    regencyCode?: string;
    districtCode?: string;
    villageCode?: string;
};

const listings: MarketplaceItem[] = [
    // ===== SUMATERA =====
    {
        id: 1,
        komoditas: "Kopi Gayo Arabika",
        petani: "Koperasi Tani Gayo",
        lokasi: "Aceh Tengah, Aceh",
        volume: 3.8,
        volumeRange: "3.2 - 4.1",
        tanggalPanen: "2025-08-14",
        harga: 62000,
        kualitas: "Grade A",
        reliabilitas: 92,
        rating: 4.9,
        status: "available",
        verified: true,
    },
    {
        id: 2,
        komoditas: "Kelapa Sawit TBS",
        petani: "Rudi Siregar",
        lokasi: "Labuhanbatu, Sumatera Utara",
        volume: 18.0,
        volumeRange: "16.5 - 20.0",
        tanggalPanen: "2025-08-16",
        harga: 2700,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.7,
        status: "available",
        verified: true,
    },
    {
        id: 3,
        komoditas: "Beras Solok",
        petani: "Andi Putra",
        lokasi: "Solok, Sumatera Barat",
        volume: 8.5,
        volumeRange: "8.0 - 9.2",
        tanggalPanen: "2025-08-10",
        harga: 12500,
        kualitas: "Premium",
        reliabilitas: 90,
        rating: 4.8,
        status: "available",
        verified: true,
    },
    {
        id: 4,
        komoditas: "Nenas Madu",
        petani: "Siti Rahayu",
        lokasi: "Kampar, Riau",
        volume: 6.0,
        volumeRange: "5.5 - 6.8",
        tanggalPanen: "2025-08-12",
        harga: 7000,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 5,
        komoditas: "Lada Putih",
        petani: "Dedi Kurniawan",
        lokasi: "Bangka, Kepulauan Bangka Belitung",
        volume: 1.4,
        volumeRange: "1.2 - 1.6",
        tanggalPanen: "2025-08-09",
        harga: 98000,
        kualitas: "Grade A",
        reliabilitas: 87,
        rating: 4.7,
        status: "reserved",
        verified: true,
    },
    {
        id: 6,
        komoditas: "Kopi Robusta",
        petani: "Kelompok Tani Bukit Barisan",
        lokasi: "Lampung Barat, Lampung",
        volume: 4.2,
        volumeRange: "3.8 - 4.6",
        tanggalPanen: "2025-08-18",
        harga: 41000,
        kualitas: "Grade A",
        reliabilitas: 89,
        rating: 4.8,
        status: "available",
        verified: true,
    },

    // ===== JAWA =====
    {
        id: 7,
        komoditas: "Padi - IR64",
        petani: "Budi Santoso",
        lokasi: "Karawang, Jawa Barat",
        volume: 7.2,
        volumeRange: "6.8 - 7.5",
        tanggalPanen: "2025-08-15",
        harga: 5500,
        kualitas: "Grade A",
        reliabilitas: 92,
        rating: 4.8,
        status: "available",
        verified: true,
    },
    {
        id: 8,
        komoditas: "Jagung - Hibrida NK212",
        petani: "Siti Rahayu",
        lokasi: "Grobogan, Jawa Tengah",
        volume: 5.5,
        volumeRange: "5.2 - 5.8",
        tanggalPanen: "2025-08-12",
        harga: 4200,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.9,
        status: "available",
        verified: true,
    },
    {
        id: 9,
        komoditas: "Cabai Merah Keriting",
        petani: "Ahmad Dahlan",
        lokasi: "Malang, Jawa Timur",
        volume: 2.5,
        volumeRange: "2.2 - 2.8",
        tanggalPanen: "2025-07-28",
        harga: 18000,
        kualitas: "Grade A",
        reliabilitas: 90,
        rating: 4.7,
        status: "available",
        verified: true,
    },
    {
        id: 10,
        komoditas: "Bawang Merah",
        petani: "Pak Joko",
        lokasi: "Brebes, Jawa Tengah",
        volume: 3.2,
        volumeRange: "3.0 - 3.5",
        tanggalPanen: "2025-08-20",
        harga: 15000,
        kualitas: "Grade B",
        reliabilitas: 85,
        rating: 4.5,
        status: "reserved",
        verified: true,
    },
    {
        id: 11,
        komoditas: "Salak Pondoh",
        petani: "Slamet Riyadi",
        lokasi: "Sleman, DI Yogyakarta",
        volume: 4.6,
        volumeRange: "4.0 - 5.0",
        tanggalPanen: "2025-08-11",
        harga: 9000,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.6,
        status: "available",
        verified: true,
    },

    // ===== KALIMANTAN =====
    {
        id: 12,
        komoditas: "Lada Hitam",
        petani: "Tani Mandiri",
        lokasi: "Singkawang, Kalimantan Barat",
        volume: 1.9,
        volumeRange: "1.6 - 2.1",
        tanggalPanen: "2025-08-13",
        harga: 72000,
        kualitas: "Grade A",
        reliabilitas: 87,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 13,
        komoditas: "Jeruk Siam",
        petani: "Rahmawati",
        lokasi: "Banjarbaru, Kalimantan Selatan",
        volume: 3.5,
        volumeRange: "3.0 - 3.9",
        tanggalPanen: "2025-08-17",
        harga: 11000,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.5,
        status: "available",
        verified: true,
    },
    {
        id: 14,
        komoditas: "Pisang Kepok",
        petani: "Darmawan",
        lokasi: "Samarinda, Kalimantan Timur",
        volume: 5.2,
        volumeRange: "4.8 - 5.6",
        tanggalPanen: "2025-08-08",
        harga: 6500,
        kualitas: "Grade A",
        reliabilitas: 85,
        rating: 4.4,
        status: "available",
        verified: true,
    },

    // ===== SULAWESI =====
    {
        id: 15,
        komoditas: "Cengkeh Kering",
        petani: "Hasanuddin",
        lokasi: "Minahasa, Sulawesi Utara",
        volume: 1.1,
        volumeRange: "1.0 - 1.3",
        tanggalPanen: "2025-08-06",
        harga: 115000,
        kualitas: "Grade A",
        reliabilitas: 90,
        rating: 4.8,
        status: "reserved",
        verified: true,
    },
    {
        id: 16,
        komoditas: "Kakao Fermentasi",
        petani: "Kelompok Tani Luwu",
        lokasi: "Luwu, Sulawesi Selatan",
        volume: 2.7,
        volumeRange: "2.4 - 3.0",
        tanggalPanen: "2025-08-19",
        harga: 52000,
        kualitas: "Grade A",
        reliabilitas: 89,
        rating: 4.7,
        status: "available",
        verified: true,
    },

    // ===== BALI & NUSA TENGGARA =====
    {
        id: 17,
        komoditas: "Beras Merah Organik",
        petani: "I Made Wijaya",
        lokasi: "Tabanan, Bali",
        volume: 3.6,
        volumeRange: "3.2 - 4.0",
        tanggalPanen: "2025-08-12",
        harga: 18000,
        kualitas: "Premium",
        reliabilitas: 90,
        rating: 4.8,
        status: "available",
        verified: true,
    },
    {
        id: 18,
        komoditas: "Bawang Putih Lokal",
        petani: "Kelompok Tani Sembalun",
        lokasi: "Lombok Timur, Nusa Tenggara Barat",
        volume: 2.1,
        volumeRange: "1.8 - 2.4",
        tanggalPanen: "2025-08-18",
        harga: 26000,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 19,
        komoditas: "Jagung NTT",
        petani: "Yohanes Nabuasa",
        lokasi: "Kupang, Nusa Tenggara Timur",
        volume: 6.2,
        volumeRange: "5.8 - 6.6",
        tanggalPanen: "2025-08-07",
        harga: 5200,
        kualitas: "Grade B",
        reliabilitas: 84,
        rating: 4.4,
        status: "available",
        verified: true,
    },

    // ===== MALUKU =====
    {
        id: 20,
        komoditas: "Pala Banda",
        petani: "Koperasi Banda",
        lokasi: "Banda Neira, Maluku",
        volume: 0.9,
        volumeRange: "0.7 - 1.0",
        tanggalPanen: "2025-08-05",
        harga: 185000,
        kualitas: "Grade A",
        reliabilitas: 91,
        rating: 4.9,
        status: "reserved",
        verified: true,
    },

    // ===== PAPUA =====
    {
        id: 21,
        komoditas: "Sagu Basah",
        petani: "Matius Wonda",
        lokasi: "Jayapura, Papua",
        volume: 7.0,
        volumeRange: "6.5 - 7.8",
        tanggalPanen: "2025-08-09",
        harga: 6500,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 22,
        komoditas: "Beras Merauke",
        petani: "Kelompok Tani Marind",
        lokasi: "Merauke, Papua",
        volume: 10.5,
        volumeRange: "9.8 - 11.2",
        tanggalPanen: "2025-08-16",
        harga: 9800,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.7,
        status: "available",
        verified: true,
    },

    // ✅ BANTEN (36)
    {
        id: 23,
        komoditas: "Beras Pandanwangi",
        petani: "H. Ujang Romli",
        lokasi: "Lebak, Banten",
        volume: 6.4,
        volumeRange: "6.0 - 7.0",
        tanggalPanen: "2025-08-13",
        harga: 11800,
        kualitas: "Grade A",
        reliabilitas: 88,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 24,
        komoditas: "Melon Golden",
        petani: "Kelompok Tani Cisoka",
        lokasi: "Tangerang, Banten",
        volume: 3.3,
        volumeRange: "3.0 - 3.7",
        tanggalPanen: "2025-08-17",
        harga: 14500,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.5,
        status: "available",
        verified: true,
    },
    // ✅ DKI JAKARTA (31)
    {
        id: 25,
        komoditas: "Selada Hidroponik",
        petani: "Komunitas Urban Farm Jakarta",
        lokasi: "Kebayoran Baru, DKI Jakarta",
        volume: 1.2,
        volumeRange: "1.0 - 1.4",
        tanggalPanen: "2025-08-15",
        harga: 28000,
        kualitas: "Grade A",
        reliabilitas: 87,
        rating: 4.6,
        status: "available",
        verified: true,
    },
    {
        id: 26,
        komoditas: "Pakcoy Hidroponik",
        petani: "Rama Pratama",
        lokasi: "Cilandak, Jakarta Selatan, DKI Jakarta",
        volume: 0.9,
        volumeRange: "0.8 - 1.1",
        tanggalPanen: "2025-08-16",
        harga: 24000,
        kualitas: "Grade A",
        reliabilitas: 86,
        rating: 4.5,
        status: "available",
        verified: true,
    },


];

const supplies: FarmingSupplyItem[] = [
    // ===== PUPUK =====
    {
        id: 101,
        nama: "Pupuk NPK 16-16-16",
        kategori: "pupuk",
        brand: "AgroMax",
        lokasi: "Gudang Bandung, Jawa Barat",
        stok: 120,
        satuan: "kg",
        harga: 12500,
        rating: 4.8,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 102,
        nama: "Pupuk Kompos Organik",
        kategori: "pupuk",
        brand: "GreenSoil",
        lokasi: "Bogor, Jawa Barat",
        stok: 200,
        satuan: "kg",
        harga: 8000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 114,
        nama: "Pupuk KCl 60%",
        kategori: "pupuk",
        brand: "KaliBoost",
        lokasi: "Palembang, Sumatera Selatan",
        stok: 140,
        satuan: "kg",
        harga: 13800,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 115,
        nama: "Pupuk ZA (Amonium Sulfat)",
        kategori: "pupuk",
        brand: "NitroPlus",
        lokasi: "Pekanbaru, Riau",
        stok: 160,
        satuan: "kg",
        harga: 9200,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },

    // ===== BENIH =====
    {
        id: 103,
        nama: "Benih Cabai Keriting F1",
        kategori: "benih",
        brand: "NusaSeed",
        lokasi: "Depo Semarang, Jawa Tengah",
        stok: 300,
        satuan: "pak",
        harga: 18000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 104,
        nama: "Benih Tomat Premium",
        kategori: "benih",
        brand: "TaniGrow",
        lokasi: "Malang, Jawa Timur",
        stok: 250,
        satuan: "pak",
        harga: 15000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 116,
        nama: "Benih Padi Ciherang",
        kategori: "benih",
        brand: "PadiPrima",
        lokasi: "Karawang, Jawa Barat",
        stok: 180,
        satuan: "kg",
        harga: 16500,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 117,
        nama: "Benih Jagung Manis",
        kategori: "benih",
        brand: "SweetCorn ID",
        lokasi: "Kupang, Nusa Tenggara Timur",
        stok: 220,
        satuan: "pak",
        harga: 14000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 4,
    },
    {
        id: 118,
        nama: "Benih Kakao Unggul",
        kategori: "benih",
        brand: "CocoaPro",
        lokasi: "Makassar, Sulawesi Selatan",
        stok: 120,
        satuan: "pak",
        harga: 26000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },

    // ===== ALAT =====
    {
        id: 105,
        nama: "Cangkul Baja Premium",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Jakarta Selatan, DKI Jakarta",
        stok: 50,
        satuan: "pcs",
        harga: 85000,
        rating: 4.8,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },
    {
        id: 106,
        nama: "Sekop Taman Serbaguna",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Bandung, Jawa Barat",
        stok: 70,
        satuan: "pcs",
        harga: 45000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 107,
        nama: "Sabit Panen Baja",
        kategori: "alat",
        brand: "PanenMax",
        lokasi: "Yogyakarta, DI Yogyakarta",
        stok: 60,
        satuan: "pcs",
        harga: 30000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 108,
        nama: "Sprayer Manual 2L",
        kategori: "alat",
        brand: "TaniPro",
        lokasi: "Jakarta Selatan, DKI Jakarta",
        stok: 40,
        satuan: "pcs",
        harga: 65000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },
    {
        id: 109,
        nama: "Selang Air 20 Meter",
        kategori: "alat",
        brand: "HydroFlex",
        lokasi: "Surabaya, Jawa Timur",
        stok: 35,
        satuan: "pcs",
        harga: 95000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 119,
        nama: "Garu Tanah Manual",
        kategori: "alat",
        brand: "SoilMaster",
        lokasi: "Banda Aceh, Aceh",
        stok: 25,
        satuan: "pcs",
        harga: 78000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 4,
    },
    {
        id: 120,
        nama: "Mesin Pemotong Rumput Mini",
        kategori: "alat",
        brand: "GrassPro",
        lokasi: "Pontianak, Kalimantan Barat",
        stok: 12,
        satuan: "pcs",
        harga: 985000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 4,
    },
    {
        id: 121,
        nama: "Pompa Air Irigasi 1 Inch",
        kategori: "alat",
        brand: "AquaFarm",
        lokasi: "Jayapura, Papua",
        stok: 18,
        satuan: "pcs",
        harga: 740000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 5,
    },

    // ===== MEDIA TANAM =====
    {
        id: 110,
        nama: "Media Tanam Cocopeat 5kg",
        kategori: "media",
        brand: "GreenGrow",
        lokasi: "Surabaya, Jawa Timur",
        stok: 80,
        satuan: "kg",
        harga: 24000,
        rating: 4.5,
        verified: true,
        status: "reserved",
        estimasiKirimHari: 3,
    },
    {
        id: 111,
        nama: "Polybag Tanam 30x30",
        kategori: "media",
        brand: "UrbanFarm",
        lokasi: "Jakarta Barat, DKI Jakarta",
        stok: 500,
        satuan: "pcs",
        harga: 1500,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 1,
    },
    {
        id: 122,
        nama: "Mulsa Plastik Hitam Perak (MPHP) 1m",
        kategori: "media",
        brand: "MulsaPro",
        lokasi: "Denpasar, Bali",
        stok: 260,
        satuan: "meter",
        harga: 3500,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 123,
        nama: "Arang Sekam 10kg",
        kategori: "media",
        brand: "SekamPlus",
        lokasi: "Manado, Sulawesi Utara",
        stok: 90,
        satuan: "kg",
        harga: 11000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 4,
    },

    // ===== PESTISIDA =====
    {
        id: 112,
        nama: "Pestisida Nabati Neem Oil 250ml",
        kategori: "pestisida",
        brand: "EcoPlant",
        lokasi: "Bandung, Jawa Barat",
        stok: 55,
        satuan: "botol",
        harga: 39000,
        rating: 4.7,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 113,
        nama: "Pestisida Anti Hama Organik",
        kategori: "pestisida",
        brand: "SafeCrop",
        lokasi: "Bogor, Jawa Barat",
        stok: 40,
        satuan: "botol",
        harga: 32000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 124,
        nama: "Fungisida Organik untuk Jamur",
        kategori: "pestisida",
        brand: "FungiSafe",
        lokasi: "Ambon, Maluku",
        stok: 30,
        satuan: "botol",
        harga: 42000,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 5,
    },
    {
        id: 125,
        nama: "Insektisida Nabati Serai Wangi 500ml",
        kategori: "pestisida",
        brand: "CitroGuard",
        lokasi: "Merauke, Papua",
        stok: 22,
        satuan: "botol",
        harga: 51000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 6,
    },
    // ✅ BANTEN (36)
    {
        id: 126,
        nama: "Benih Padi Inpari 32",
        kategori: "benih",
        brand: "InpariSeed",
        lokasi: "Serang, Banten",
        stok: 140,
        satuan: "kg",
        harga: 17000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 127,
        nama: "Pupuk Organik Granul 25kg",
        kategori: "pupuk",
        brand: "BioGrow",
        lokasi: "Cilegon, Banten",
        stok: 95,
        satuan: "kg",
        harga: 9800,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 128,
        nama: "Cangkul Serbaguna Gagang Kayu",
        kategori: "alat",
        brand: "BantenTools",
        lokasi: "Pandeglang, Banten",
        stok: 40,
        satuan: "pcs",
        harga: 79000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },
    {
        id: 129,
        nama: "Mulsa Plastik Hitam Perak 1m",
        kategori: "media",
        brand: "MulsaPro",
        lokasi: "Tangerang Selatan, Banten",
        stok: 220,
        satuan: "meter",
        harga: 3600,
        rating: 4.5,
        verified: true,
        status: "available",
        estimasiKirimHari: 2,
    },
    {
        id: 130,
        nama: "Pestisida Nabati Ekstrak Mimba 500ml",
        kategori: "pestisida",
        brand: "EcoGuard",
        lokasi: "Lebak, Banten",
        stok: 35,
        satuan: "botol",
        harga: 52000,
        rating: 4.6,
        verified: true,
        status: "available",
        estimasiKirimHari: 3,
    },

];


const partnerStores: PartnerStore[] = [
    // ===== SUMATERA =====
    {
        id: "t1",
        nama: "Toko Tani Sejahtera Aceh",
        alamat: "Jl. Teuku Umar No.12, Banda Aceh",
        telepon: "0812-1111-0001",
        rating: 4.8,
        provinceCode: "11",
    },
    {
        id: "t2",
        nama: "Agro Store Medan",
        alamat: "Jl. Gatot Subroto No.45, Medan",
        telepon: "0812-1111-0002",
        rating: 4.7,
        provinceCode: "12",
    },
    {
        id: "t3",
        nama: "Tani Makmur Padang",
        alamat: "Jl. Sudirman No.20, Padang",
        telepon: "0812-1111-0003",
        rating: 4.6,
        provinceCode: "13",
    },
    {
        id: "t4",
        nama: "Sentra Agro Pekanbaru",
        alamat: "Jl. HR Soebrantas No.88, Pekanbaru",
        telepon: "0812-1111-0004",
        rating: 4.7,
        provinceCode: "14",
    },
    {
        id: "t5",
        nama: "Gudang Tani Palembang",
        alamat: "Jl. Demang Lebar Daun No.15",
        telepon: "0812-1111-0005",
        rating: 4.6,
        provinceCode: "16",
    },
    {
        id: "t6",
        nama: "Agro Bengkulu",
        alamat: "Jl. Ahmad Yani No.10",
        telepon: "0812-1111-0006",
        rating: 4.5,
        provinceCode: "17",
    },
    {
        id: "t7",
        nama: "Lampung Agro Center",
        alamat: "Jl. Raden Intan No.77, Bandar Lampung",
        telepon: "0812-1111-0007",
        rating: 4.6,
        provinceCode: "18",
    },

    // ===== JAWA =====
    {
        id: "t8",
        nama: "Toko Tani Jakarta",
        alamat: "Jl. Kebon Jeruk No.25, Jakarta",
        telepon: "0812-1111-0008",
        rating: 4.9,
        provinceCode: "31",
    },
    {
        id: "t9",
        nama: "Agro Bandung",
        alamat: "Jl. Asia Afrika No.50, Bandung",
        telepon: "0812-1111-0009",
        rating: 4.8,
        provinceCode: "32",
    },
    {
        id: "t10",
        nama: "Gudang Pangan Semarang",
        alamat: "Jl. Pandanaran No.40",
        telepon: "0812-1111-0010",
        rating: 4.7,
        provinceCode: "33",
    },
    {
        id: "t11",
        nama: "Tani Jaya Yogyakarta",
        alamat: "Jl. Malioboro No.60",
        telepon: "0812-1111-0011",
        rating: 4.8,
        provinceCode: "34",
    },
    {
        id: "t12",
        nama: "Agro Surabaya",
        alamat: "Jl. Darmo No.30",
        telepon: "0812-1111-0012",
        rating: 4.7,
        provinceCode: "35",
    },
    {
        id: "t13",
        nama: "Kios Panen Jagakarsa",
        alamat: "Jl. Kebun Raya No.9, Jagakarsa",
        telepon: "0812-1111-0013",
        rating: 4.9,
        regencyCode: "31.74",
        districtCode: "31.74.09",
    },

    // ===== KALIMANTAN =====
    {
        id: "t14",
        nama: "Agro Pontianak",
        alamat: "Jl. Gajah Mada No.12",
        telepon: "0812-1111-0014",
        rating: 4.6,
        provinceCode: "61",
    },
    {
        id: "t15",
        nama: "Tani Makmur Banjarmasin",
        alamat: "Jl. Ahmad Yani No.33",
        telepon: "0812-1111-0015",
        rating: 4.7,
        provinceCode: "63",
    },
    {
        id: "t16",
        nama: "Agro Samarinda",
        alamat: "Jl. Mulawarman No.18",
        telepon: "0812-1111-0016",
        rating: 4.6,
        provinceCode: "64",
    },

    // ===== SULAWESI =====
    {
        id: "t17",
        nama: "Toko Tani Makassar",
        alamat: "Jl. Pettarani No.90",
        telepon: "0812-1111-0017",
        rating: 4.8,
        provinceCode: "73",
    },
    {
        id: "t18",
        nama: "Agro Manado",
        alamat: "Jl. Sam Ratulangi No.22",
        telepon: "0812-1111-0018",
        rating: 4.7,
        provinceCode: "71",
    },

    // ===== BALI & NUSA TENGGARA =====
    {
        id: "t19",
        nama: "Agro Bali",
        alamat: "Jl. Teuku Umar No.14, Denpasar",
        telepon: "0812-1111-0019",
        rating: 4.9,
        provinceCode: "51",
    },
    {
        id: "t20",
        nama: "Tani Lombok",
        alamat: "Jl. Mataram No.17",
        telepon: "0812-1111-0020",
        rating: 4.6,
        provinceCode: "52",
    },
    {
        id: "t21",
        nama: "Agro Kupang",
        alamat: "Jl. El Tari No.5",
        telepon: "0812-1111-0021",
        rating: 4.5,
        provinceCode: "53",
    },

    // ===== MALUKU =====
    {
        id: "t22",
        nama: "Tani Ambon",
        alamat: "Jl. Pattimura No.8",
        telepon: "0812-1111-0022",
        rating: 4.6,
        provinceCode: "81",
    },

    // ===== PAPUA =====
    {
        id: "t23",
        nama: "Agro Jayapura",
        alamat: "Jl. Raya Abepura No.10",
        telepon: "0812-1111-0023",
        rating: 4.7,
        provinceCode: "91",
    },
    {
        id: "t24",
        nama: "Tani Merauke",
        alamat: "Jl. Trans Papua No.3, Merauke",
        telepon: "0812-1111-0024",
        rating: 4.8,
        provinceCode: "91",
        regencyCode: "91.01",
    },
];

const WILAYAH_API = "https://farmlens-dev.vercel.app/api/wilayah";

async function fetchWilayah<T>(path: string, signal?: AbortSignal): Promise<T> {
    const url = `${WILAYAH_API}?path=${encodeURIComponent(path)}`;
    const res = await fetch(url, { signal });
    if (!res.ok) throw new Error(`Request gagal: ${res.status}`);
    return (await res.json()) as T;
}

function TabButton({
    active,
    onClick,
    icon,
    title,
    subtitle,
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "w-full text-left rounded-2xl border p-4 transition",
                active
                    ? "bg-green-50 border-green-200 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center ring-1 ring-black/5 bg-white">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
            </div>
        </button>
    );
}

/** Heuristik mapping lokasi string -> kode provinsi (buat demo, TANPA ubah data) */
function inferProvinceCodeFromText(text: string): string | null {
    const t = (text || "").toLowerCase();

    // Jawa
    if (t.includes("dki jakarta") || t.includes("jakarta")) return "31";
    if (t.includes("jawa barat") || t.includes("bandung") || t.includes("bogor")) return "32";
    if (t.includes("jawa tengah") || t.includes("semarang")) return "33";
    if (t.includes("banten") || t.includes("serang") || t.includes("cilegon") || t.includes("tangerang") || t.includes("pandeglang") || t.includes("lebak") || t.includes("tangerang selatan"))
        return "36";
    if (t.includes("yogyakarta") || t.includes("di yogyakarta")) return "34";
    if (t.includes("jawa timur") || t.includes("surabaya") || t.includes("malang")) return "35";

    // Sumatera
    if (t.includes("aceh") || t.includes("banda aceh")) return "11";
    if (t.includes("medan") || t.includes("sumatera utara")) return "12";
    if (t.includes("padang") || t.includes("sumatera barat")) return "13";
    if (t.includes("pekanbaru") || t.includes("riau")) return "14";
    if (t.includes("palembang") || t.includes("sumatera selatan")) return "16";
    if (t.includes("bengkulu")) return "17";
    if (t.includes("lampung") || t.includes("bandar lampung")) return "18";

    // Bali / NT
    if (t.includes("bali") || t.includes("denpasar")) return "51";
    if (t.includes("ntb") || t.includes("lombok") || t.includes("mataram")) return "52";
    if (t.includes("ntt") || t.includes("kupang")) return "53";

    // Kalimantan
    if (t.includes("pontianak") || t.includes("kalimantan barat")) return "61";
    if (t.includes("banjarmasin") || t.includes("kalimantan selatan")) return "63";
    if (t.includes("samarinda") || t.includes("kalimantan timur")) return "64";

    // Sulawesi
    if (t.includes("makassar") || t.includes("sulawesi selatan")) return "73";
    if (t.includes("manado") || t.includes("sulawesi utara")) return "71";

    // Maluku / Papua
    if (t.includes("ambon") || t.includes("maluku")) return "81";
    if (t.includes("jayapura") || t.includes("merauke") || t.includes("papua")) return "91";

    return null;
}

export default function Marketplace() {
    const [activeTab, setActiveTab] = useState<"hasil" | "alat">("hasil");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<"all" | "available" | "reserved">("all");
    const [detail, setDetail] = useState<MarketplaceItem | null>(null);
    const [detailSupply, setDetailSupply] = useState<FarmingSupplyItem | null>(null);

    const afterWilayahRef = useRef<HTMLDivElement | null>(null);
    const didAutoScrollRef = useRef(false);

    // --- WILAYAH ---
    const [provinces, setProvinces] = useState<WilayahItem[]>([]);
    const [regencies, setRegencies] = useState<WilayahItem[]>([]);
    const [districts, setDistricts] = useState<WilayahItem[]>([]);
    const [villages, setVillages] = useState<WilayahItem[]>([]);

    const [provinceCode, setProvinceCode] = useState<string>("");
    const [regencyCode, setRegencyCode] = useState<string>("");
    const [districtCode, setDistrictCode] = useState<string>("");
    const [villageCode, setVillageCode] = useState<string>("");

    const [loadingWilayah, setLoadingWilayah] = useState({
        provinces: false,
        regencies: false,
        districts: false,
        villages: false,
    });

    // ✅ Gate: minimal pilih provinsi dulu
    const hasSelectedWilayah = Boolean(provinceCode);

    // ✅ Auto-scroll setelah pilih provinsi (sekali)
    useEffect(() => {
        if (!hasSelectedWilayah) {
            didAutoScrollRef.current = false;
            return;
        }
        if (didAutoScrollRef.current) return;
        didAutoScrollRef.current = true;

        const t = setTimeout(() => {
            afterWilayahRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 120);

        return () => clearTimeout(t);
    }, [hasSelectedWilayah]);

    // Fetch provinces on mount
    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, provinces: true }));
                const json = await fetchWilayah<WilayahResponse>("provinces.json", ac.signal);
                setProvinces(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat provinsi", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, provinces: false }));
            }
        })();
        return () => ac.abort();
    }, []);

    // Reset chain ketika province berubah
    useEffect(() => {
        setRegencyCode("");
        setRegencies([]);
        setDistrictCode("");
        setDistricts([]);
        setVillageCode("");
        setVillages([]);
    }, [provinceCode]);

    // Reset chain ketika regency berubah
    useEffect(() => {
        setDistrictCode("");
        setDistricts([]);
        setVillageCode("");
        setVillages([]);
    }, [regencyCode]);

    // Reset chain ketika district berubah
    useEffect(() => {
        setVillageCode("");
        setVillages([]);
    }, [districtCode]);

    // Fetch regencies
    useEffect(() => {
        if (!provinceCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, regencies: true }));
                const json = await fetchWilayah<WilayahResponse>(`regencies/${provinceCode}.json`, ac.signal);
                setRegencies(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kab/kota", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, regencies: false }));
            }
        })();
        return () => ac.abort();
    }, [provinceCode]);

    // Fetch districts
    useEffect(() => {
        if (!regencyCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, districts: true }));
                const json = await fetchWilayah<WilayahResponse>(`districts/${regencyCode}.json`, ac.signal);
                setDistricts(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kecamatan", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, districts: false }));
            }
        })();
        return () => ac.abort();
    }, [regencyCode]);

    // Fetch villages
    useEffect(() => {
        if (!districtCode) return;
        const ac = new AbortController();
        (async () => {
            try {
                setLoadingWilayah((s) => ({ ...s, villages: true }));
                const json = await fetchWilayah<WilayahResponse>(`villages/${districtCode}.json`, ac.signal);
                setVillages(json.data ?? []);
            } catch (e: any) {
                toast.error("Gagal memuat kel/desa", { description: e?.message });
            } finally {
                setLoadingWilayah((s) => ({ ...s, villages: false }));
            }
        })();
        return () => ac.abort();
    }, [districtCode]);

    const wilayahLabel = useMemo(() => {
        const p = provinces.find((x) => x.code === provinceCode)?.name;
        const r = regencies.find((x) => x.code === regencyCode)?.name;
        const d = districts.find((x) => x.code === districtCode)?.name;
        const v = villages.find((x) => x.code === villageCode)?.name;
        return [v, d, r, p].filter(Boolean).join(", ");
    }, [provinceCode, regencyCode, districtCode, villageCode, provinces, regencies, districts, villages]);

    const recommendedStores = useMemo(() => {
        const scored = partnerStores
            .map((store) => {
                let score = 0;
                if (villageCode && store.villageCode === villageCode) score = 4;
                else if (districtCode && store.districtCode === districtCode) score = 3;
                else if (regencyCode && store.regencyCode === regencyCode) score = 2;
                else if (provinceCode && store.provinceCode === provinceCode) score = 1;
                return { store, score };
            })
            .filter((x) => {
                if (!provinceCode && !regencyCode && !districtCode && !villageCode) return true;
                return x.score > 0;
            })
            .sort((a, b) => b.score - a.score || b.store.rating - a.store.rating)
            .slice(0, 6);

        return scored;
    }, [provinceCode, regencyCode, districtCode, villageCode]);

    // ✅ Filter by wilayah (provinsi) + search + status
    const filteredHasil = useMemo(() => {
        return listings.filter((item) => {
            const s = search.toLowerCase();

            const matchText =
                item.komoditas.toLowerCase().includes(s) ||
                item.lokasi.toLowerCase().includes(s);

            const matchStatus = status === "all" || item.status === status;

            // ✅ Filter provinsi berdasarkan lokasi text
            const inferredProv = inferProvinceCodeFromText(item.lokasi);
            const matchProv = !provinceCode ? true : inferredProv === provinceCode;

            return matchText && matchStatus && matchProv;
        });
    }, [search, status, provinceCode]);

    const filteredAlat = useMemo(() => {
        return supplies.filter((item) => {
            const s = search.toLowerCase();

            const matchText =
                item.nama.toLowerCase().includes(s) ||
                item.kategori.toLowerCase().includes(s) ||
                item.lokasi.toLowerCase().includes(s) ||
                (item.brand ?? "").toLowerCase().includes(s);

            const matchStatus = status === "all" || item.status === status;

            // ✅ Filter provinsi berdasarkan lokasi text
            const inferredProv = inferProvinceCodeFromText(item.lokasi);
            const matchProv = !provinceCode ? true : inferredProv === provinceCode;

            return matchText && matchStatus && matchProv;
        });
    }, [search, status, provinceCode]);

    const handleContact = () => {
        toast.info("Fitur Dalam Pengembangan", {
            description:
                "Integrasi WhatsApp & sistem pesan internal sedang kami siapkan agar komunikasi lebih aman dan terdokumentasi.",
        });
    };

    const handleOrderSuccess = () => {
        toast.success("Pesanan Berhasil Dicatat", {
            description: "Tim kami akan segera memproses transaksi dan menghubungi Anda untuk tahap selanjutnya.",
        });
        setDetail(null);
    };

    const handleOrderSupplySuccess = () => {
        toast.success("Checkout Berhasil Dicatat", {
            description: "Pesanan alat & bahan kamu akan diproses dan dikirim sesuai estimasi.",
        });
        setDetailSupply(null);
    };

    const handleCallStore = (store: PartnerStore) => {
        toast.info("Kontak Toko", {
            description: store.telepon ? `${store.nama} • ${store.telepon}` : `${store.nama} • Nomor belum tersedia`,
        });
    };

    return (
        <div className="space-y-8">
            <Toaster position="bottom-right" richColors />

            {/* ===================== STEP 1: PILIH WILAYAH (MUNCUL DIAWAL) ===================== */}
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6"
            >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-green-700">Mohon Untuk</p>
                        <h2 className="text-xl font-semibold text-gray-900 mt-1">Pilih Wilayah Anda</h2>
                        <p className="text-gray-600 mt-2">
                            Lokasi digunakan untuk menampilkan <b>toko partner terdekat</b> dan marketplace yang relevan.
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        {wilayahLabel ? (
                            <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 px-3 py-2">
                                <MapPin className="w-4 h-4 text-green-700" />
                                <span className="text-green-800 font-medium">{wilayahLabel}</span>
                            </div>
                        ) : (
                            <span className="text-gray-500">Silakan pilih lokasi dulu</span>
                        )}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                        <label className="text-xs text-gray-500">Provinsi</label>
                        <select
                            value={provinceCode}
                            onChange={(e) => setProvinceCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={loadingWilayah.provinces}
                        >
                            <option value="">{loadingWilayah.provinces ? "Memuat..." : "Pilih Provinsi"}</option>
                            {provinces.map((p) => (
                                <option key={p.code} value={p.code}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kab/Kota</label>
                        <select
                            value={regencyCode}
                            onChange={(e) => setRegencyCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!provinceCode || loadingWilayah.regencies}
                        >
                            <option value="">
                                {!provinceCode ? "Pilih provinsi dulu" : loadingWilayah.regencies ? "Memuat..." : "Pilih Kab/Kota"}
                            </option>
                            {regencies.map((r) => (
                                <option key={r.code} value={r.code}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kecamatan</label>
                        <select
                            value={districtCode}
                            onChange={(e) => setDistrictCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!regencyCode || loadingWilayah.districts}
                        >
                            <option value="">
                                {!regencyCode ? "Pilih kab/kota dulu"
                                    : loadingWilayah.districts
                                        ? "Memuat..."
                                        : "Pilih Kecamatan"}
                            </option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.code}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500">Kel/Desa</label>
                        <select
                            value={villageCode}
                            onChange={(e) => setVillageCode(e.target.value)}
                            className="w-full mt-1 px-3 py-2 rounded-xl border bg-white focus:ring-2 focus:ring-green-500"
                            disabled={!districtCode || loadingWilayah.villages}
                        >
                            <option value="">
                                {!districtCode
                                    ? "Pilih kecamatan dulu"
                                    : loadingWilayah.villages
                                        ? "Memuat..."
                                        : "Opsional: Pilih Kel/Desa"}
                            </option>
                            {villages.map((v) => (
                                <option key={v.code} value={v.code}>
                                    {v.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-5">
                    {!hasSelectedWilayah ? (
                        <div className="rounded-2xl border border-dashed p-4 text-sm text-gray-600">
                            Pilih minimal <b>Provinsi</b> untuk menampilkan rekomendasi dan marketplace.
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                            Wilayah tersimpan. Konten rekomendasi & marketplace sudah muncul di bawah.
                        </div>
                    )}
                </div>
            </motion.section>

            {/* ===================== STEP 2: REKOMENDASI TOKO (MUNCUL SETELAH PILIH PROVINSI) ===================== */}
            {!hasSelectedWilayah ? null : (
                <motion.section
                    ref={afterWilayahRef}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur p-6"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="text-sm font-medium text-green-700">🏪 Partner Terdekat</p>
                            <h2 className="text-xl font-semibold text-gray-900 mt-1">Rekomendasi Toko di Sekitarmu</h2>
                            <p className="text-gray-600 mt-2">
                                Berdasarkan lokasi: <b>{wilayahLabel || "—"}</b>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {recommendedStores.length === 0 ? (
                            <div className="col-span-full rounded-2xl border border-dashed p-6 text-center text-gray-600">
                                Belum ada toko partner yang cocok untuk wilayah ini.
                                <div className="text-xs text-gray-500 mt-1">
                                    (Tambahkan data toko lengkap dengan kode wilayah: Provinsi, Kabupaten/Kota, Kecamatan, dan Kelurahan/Desa)
                                </div>
                            </div>
                        ) : (
                            recommendedStores.map(({ store, score }) => (
                                <motion.div
                                    key={store.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35 }}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg transition"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <Store className="w-4 h-4 text-green-700" />
                                                <h3 className="font-semibold text-gray-900">{store.nama}</h3>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{store.alamat}</p>
                                        </div>

                                        <div className="text-right">
                                            <div className="inline-flex items-center gap-1 text-sm font-medium text-gray-900">
                                                <Star className="w-4 h-4" /> {store.rating.toFixed(1)}
                                            </div>
                                            <div className="mt-1">
                                                <span className="text-[11px] px-2 py-1 rounded-full border bg-gray-50 text-gray-700 border-gray-200">
                                                    {score >= 4
                                                        ? "Satu desa"
                                                        : score === 3
                                                            ? "Satu kecamatan"
                                                            : score === 2
                                                                ? "Satu kab/kota"
                                                                : "Satu provinsi"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleCallStore(store)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                        >
                                            <Phone className="w-4 h-4" /> Hubungi
                                        </button>
                                        <button
                                            onClick={() =>
                                                toast.success("Permintaan penawaran dikirim", {
                                                    description:
                                                        "Toko partner akan menghubungi Anda untuk detail harga, volume, dan jadwal pengiriman.",
                                                })
                                            }
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                      bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Minta Penawaran
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.section>
            )}

            {/* ===================== STEP 3: MARKETPLACE (MUNCUL SETELAH PILIH PROVINSI) ===================== */}
            {!hasSelectedWilayah ? null : (
                <>
                    {/* HEADER + SEARCH + FILTER + TABS */}
                    <motion.header
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="relative overflow-hidden rounded-3xl
            bg-linear-to-br from-green-50 via-white to-green-100
            border border-green-200 p-6"
                    >
                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

                        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-green-700">🛒 Smart Agriculture Marketplace</p>
                                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Marketplace</h1>
                                <p className="text-gray-600 mt-2">
                                    Data difilter berdasarkan provinsi terpilih: <b>{provinces.find(p => p.code === provinceCode)?.name ?? "—"}</b>
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-col sm:flex-row gap-2">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={activeTab === "hasil" ? "Cari komoditas / lokasi" : "Cari alat, pupuk, benih, brand..."}
                                        className="w-full sm:w-[320px] pl-9 pr-4 py-2 rounded-xl border bg-white/80 backdrop-blur focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="px-3 py-2 rounded-xl border bg-white/80 backdrop-blur"
                                >
                                    <option value="all">Semua</option>
                                    <option value="available">Tersedia</option>
                                    <option value="reserved">Dipesan</option>
                                </select>
                            </div>
                        </div>

                        <div className="relative mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <TabButton
                                active={activeTab === "hasil"}
                                onClick={() => setActiveTab("hasil")}
                                icon={<Sprout className="w-5 h-5 text-green-700" />}
                                title="Hasil Tani"
                                subtitle="Jual beli hasil panen dari petani"
                            />
                            <TabButton
                                active={activeTab === "alat"}
                                onClick={() => setActiveTab("alat")}
                                icon={<Wrench className="w-5 h-5 text-green-700" />}
                                title="Alat & Bahan"
                                subtitle="Pupuk, benih, media tanam, pestisida, alat"
                            />
                        </div>
                    </motion.header>

                    {/* ===================== TAB CONTENT ===================== */}
                    {activeTab === "hasil" ? (
                        <>
                            <section className="grid md:grid-cols-3 gap-6">
                                {filteredHasil.length === 0 ? (
                                    <div className="md:col-span-3 rounded-2xl border border-dashed p-6 text-center text-gray-600">
                                        Tidak ada hasil tani yang cocok untuk provinsi ini.
                                    </div>
                                ) : (
                                    filteredHasil.map((item) => (
                                        <motion.article
                                            key={item.id}
                                            whileHover={{ y: -6 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                            className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-5 hover:shadow-2xl transition"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                                        {item.komoditas}
                                                        {item.verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">{item.petani}</p>
                                                </div>

                                                <span
                                                    className={[
                                                        "text-xs px-3 py-1 rounded-full font-medium border",
                                                        item.status === "available"
                                                            ? "bg-green-100 text-green-700 border-green-200"
                                                            : "bg-amber-100 text-amber-700 border-amber-200",
                                                    ].join(" ")}
                                                >
                                                    {item.status === "available" ? "Tersedia" : "Dipesan"}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Package className="w-4 h-4" /> {item.volume} ton
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />{" "}
                                                    {new Date(item.tanggalPanen).toLocaleDateString("id-ID")}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4" /> Rp {item.harga.toLocaleString()}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4" /> {item.rating}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-xl mt-4">
                                                <MapPin className="w-4 h-4" /> {item.lokasi}
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>Reliabilitas</span>
                                                    <span>{item.reliabilitas}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.reliabilitas}%` }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                        className="h-2 bg-green-500 rounded-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-2 mt-5">
                                                <button
                                                    onClick={handleContact}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                                >
                                                    <Phone className="w-4 h-4" /> Hubungi
                                                </button>

                                                <button
                                                    onClick={() => setDetail(item)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                          bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                                >
                                                    <ShoppingCart className="w-4 h-4" /> Pesan
                                                </button>
                                            </div>
                                        </motion.article>
                                    ))
                                )}
                            </section>

                            {/* DETAIL + KONFIRMASI HASIL */}
                            <AnimatePresence>
                                {detail && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50"
                                    >
                                        <motion.div
                                            initial={{ y: 100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 100 }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md shadow-2xl"
                                        >
                                            <h3 className="text-lg font-semibold mb-3">Konfirmasi Pesanan</h3>

                                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                <p>
                                                    <strong>Komoditas:</strong> {detail.komoditas}
                                                </p>
                                                <p>
                                                    <strong>Petani:</strong> {detail.petani}
                                                </p>
                                                <p>
                                                    <strong>Volume:</strong> {detail.volume} ton
                                                </p>
                                                <p>
                                                    <strong>Harga:</strong> Rp {detail.harga.toLocaleString()} / kg
                                                </p>
                                                <p>
                                                    <strong>Panen:</strong> {new Date(detail.tanggalPanen).toLocaleDateString("id-ID")}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => setDetail(null)} className="flex-1 border rounded-xl py-2">
                                                    Batal
                                                </button>
                                                <button onClick={handleOrderSuccess} className="flex-1 bg-green-600 text-white rounded-xl py-2">
                                                    Konfirmasi
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <>
                            <section className="grid md:grid-cols-3 gap-6">
                                {filteredAlat.length === 0 ? (
                                    <div className="md:col-span-3 rounded-2xl border border-dashed p-6 text-center text-gray-600">
                                        Tidak ada alat & bahan yang cocok untuk provinsi ini.
                                    </div>
                                ) : (
                                    filteredAlat.map((item) => (
                                        <motion.article
                                            key={item.id}
                                            whileHover={{ y: -6 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                                            className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-5 hover:shadow-2xl transition"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="min-w-0">
                                                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                                        {item.nama}
                                                        {item.verified && <BadgeCheck className="w-4 h-4 text-green-600" />}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.brand ? `${item.brand} • ` : ""}
                                                        {item.kategori.toUpperCase()}
                                                    </p>
                                                </div>

                                                <span
                                                    className={[
                                                        "text-xs px-3 py-1 rounded-full font-medium border",
                                                        item.status === "available"
                                                            ? "bg-green-100 text-green-700 border-green-200"
                                                            : "bg-amber-100 text-amber-700 border-amber-200",
                                                    ].join(" ")}
                                                >
                                                    {item.status === "available" ? "Tersedia" : "Dipesan"}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Package className="w-4 h-4" /> Stok {item.stok} {item.satuan}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Truck className="w-4 h-4" /> {item.estimasiKirimHari} hari
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4" /> Rp {item.harga.toLocaleString()}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Star className="w-4 h-4" /> {item.rating.toFixed(1)}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded-xl mt-4">
                                                <MapPin className="w-4 h-4" /> {item.lokasi}
                                            </div>

                                            <div className="mt-5 flex gap-2">
                                                <button
                                                    onClick={handleContact}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50"
                                                >
                                                    <Phone className="w-4 h-4" /> Tanya
                                                </button>

                                                <button
                                                    onClick={() => setDetailSupply(item)}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                          bg-linear-to-r from-green-600 to-green-500 text-white shadow-md hover:brightness-110 transition"
                                                >
                                                    <ShoppingCart className="w-4 h-4" /> Beli
                                                </button>
                                            </div>
                                        </motion.article>
                                    ))
                                )}
                            </section>

                            {/* DETAIL + KONFIRMASI ALAT */}
                            <AnimatePresence>
                                {detailSupply && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50"
                                    >
                                        <motion.div
                                            initial={{ y: 100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 100 }}
                                            transition={{ type: "spring", damping: 25 }}
                                            className="bg-white rounded-t-3xl md:rounded-3xl p-6 w-full max-w-md shadow-2xl"
                                        >
                                            <h3 className="text-lg font-semibold mb-3">Checkout Alat & Bahan</h3>

                                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                <p>
                                                    <strong>Produk:</strong> {detailSupply.nama}
                                                </p>
                                                <p>
                                                    <strong>Kategori:</strong> {detailSupply.kategori.toUpperCase()}
                                                </p>
                                                <p>
                                                    <strong>Stok:</strong> {detailSupply.stok} {detailSupply.satuan}
                                                </p>
                                                <p>
                                                    <strong>Harga:</strong> Rp {detailSupply.harga.toLocaleString()}
                                                </p>
                                                <p>
                                                    <strong>Estimasi Kirim:</strong> {detailSupply.estimasiKirimHari} hari
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button onClick={() => setDetailSupply(null)} className="flex-1 border rounded-xl py-2">
                                                    Batal
                                                </button>
                                                <button
                                                    onClick={handleOrderSupplySuccess}
                                                    className="flex-1 bg-green-600 text-white rounded-xl py-2"
                                                >
                                                    Konfirmasi
                                                </button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
