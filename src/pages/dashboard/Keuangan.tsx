import { motion } from "framer-motion";
import {
  Calculator,
  DollarSign,
  FileText,
  Info,
  PieChart as PieChartIcon,
  Plus,
  Trash2,
  Edit,
  X,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

/* =======================
   Types
======================= */
type BiayaItem = {
  id: string;
  kategori: string;
  biaya: number;
};

type PerLahanItem = {
  id: string;
  lahan: string;
  biaya: number;
  pendapatan: number;
};

type CashflowItem = {
  id: string;
  bulan: string; // "Jan", "Feb", dst
  pengeluaran: number; // negatif atau positif (kita treat negatif untuk outflow)
  pendapatan: number;
};

type ModalMode = "create" | "edit";
type ActiveSection = "biaya" | "perlahan" | "cashflow";

/* =======================
   Helpers
======================= */
const STORAGE_KEY = "smartfarmer:keuangan";

function uid() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function rupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}
function toJt(n: number) {
  return `${(n / 1_000_000).toFixed(1)}jt`;
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* =======================
   Seed Data (default)
======================= */
const seedBiaya: BiayaItem[] = [
  { id: uid(), kategori: "Benih", biaya: 2_500_000 },
  { id: uid(), kategori: "Pupuk", biaya: 6_000_000 },
  { id: uid(), kategori: "Pestisida", biaya: 3_500_000 },
  { id: uid(), kategori: "Tenaga Kerja", biaya: 5_000_000 },
  { id: uid(), kategori: "Irigasi & Utilitas", biaya: 2_000_000 },
  { id: uid(), kategori: "Lain-lain", biaya: 1_000_000 },
];

const seedPerLahan: PerLahanItem[] = [
  { id: uid(), lahan: "Lahan A", biaya: 7_200_000, pendapatan: 39_600_000 },
  { id: uid(), lahan: "Lahan B", biaya: 4_800_000, pendapatan: 20_160_000 },
  { id: uid(), lahan: "Lahan C", biaya: 3_500_000, pendapatan: 21_600_000 },
  { id: uid(), lahan: "Lahan D", biaya: 4_500_000, pendapatan: 22_750_000 },
];

const seedCashflow: CashflowItem[] = [
  { id: uid(), bulan: "Jan", pengeluaran: -8_000_000, pendapatan: 0 },
  { id: uid(), bulan: "Feb", pengeluaran: -6_000_000, pendapatan: 0 },
  { id: uid(), bulan: "Mar", pengeluaran: -5_000_000, pendapatan: 0 },
  { id: uid(), bulan: "Apr", pengeluaran: -7_000_000, pendapatan: 0 },
  { id: uid(), bulan: "Mei", pengeluaran: -4_000_000, pendapatan: 12_000_000 },
  { id: uid(), bulan: "Jun", pengeluaran: -3_000_000, pendapatan: 0 },
];

/* colors utk pie */
const piePalette = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#64748b", "#ef4444", "#22c55e"];

export function Keuangan() {
  /* =======================
     Storage state
  ======================= */
  const [biayaProduksi, setBiayaProduksi] = useState<BiayaItem[]>([]);
  const [perLahan, setPerLahan] = useState<PerLahanItem[]>([]);
  const [cashflowData, setCashflowData] = useState<CashflowItem[]>([]);

  useEffect(() => {
    const stored = safeParse<{
      biayaProduksi: BiayaItem[];
      perLahan: PerLahanItem[];
      cashflowData: CashflowItem[];
    }>(localStorage.getItem(STORAGE_KEY), {
      biayaProduksi: seedBiaya,
      perLahan: seedPerLahan,
      cashflowData: seedCashflow,
    });

    setBiayaProduksi(stored.biayaProduksi ?? seedBiaya);
    setPerLahan(stored.perLahan ?? seedPerLahan);
    setCashflowData(stored.cashflowData ?? seedCashflow);
  }, []);

  useEffect(() => {
    const payload = {
      biayaProduksi: biayaProduksi.map((x) => ({ ...x, biaya: Number(x.biaya) || 0 })),
      perLahan: perLahan.map((x) => ({
        ...x,
        biaya: Number(x.biaya) || 0,
        pendapatan: Number(x.pendapatan) || 0,
      })),
      cashflowData: cashflowData.map((x) => ({
        ...x,
        pengeluaran: Number(x.pengeluaran) || 0,
        pendapatan: Number(x.pendapatan) || 0,
      })),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [biayaProduksi, perLahan, cashflowData]);

  const resetDefault = () => {
    const ok = confirm("Reset data ke default? (localStorage akan ditimpa)");
    if (!ok) return;
    setBiayaProduksi(seedBiaya);
    setPerLahan(seedPerLahan);
    setCashflowData(seedCashflow);
  };

  /* =======================
     Derived data
  ======================= */
  const totalBiaya = useMemo(() => biayaProduksi.reduce((sum, item) => sum + (Number(item.biaya) || 0), 0), [biayaProduksi]);
  const totalPendapatan = useMemo(() => perLahan.reduce((sum, item) => sum + (Number(item.pendapatan) || 0), 0), [perLahan]);
  const totalProfit = useMemo(() => totalPendapatan - totalBiaya, [totalPendapatan, totalBiaya]);

  const perLahanComputed = useMemo(() => {
    return perLahan.map((x) => {
      const biaya = Number(x.biaya) || 0;
      const pendapatan = Number(x.pendapatan) || 0;
      const profit = pendapatan - biaya;
      const roi = biaya > 0 ? (profit / biaya) * 100 : 0;
      return { ...x, profit, roi: Math.round(roi) };
    });
  }, [perLahan]);

  const avgRoi = useMemo(() => {
    if (!perLahanComputed.length) return 0;
    return perLahanComputed.reduce((sum, x) => sum + (x.roi || 0), 0) / perLahanComputed.length;
  }, [perLahanComputed]);

  const marginPct = useMemo(() => (totalBiaya > 0 ? (totalProfit / totalBiaya) * 100 : 0), [totalProfit, totalBiaya]);

  const pieData = useMemo(() => {
    const total = totalBiaya || 1;
    return biayaProduksi.map((x, idx) => ({
      name: x.kategori,
      value: Number(((x.biaya / total) * 100).toFixed(2)),
      biaya: x.biaya,
      color: piePalette[idx % piePalette.length],
    }));
  }, [biayaProduksi, totalBiaya]);

  const insights = useMemo(() => {
    // ROI tertinggi
    const best = [...perLahanComputed].sort((a, b) => (b.roi || 0) - (a.roi || 0))[0];
    // biaya terbesar
    const biggestCost = [...biayaProduksi].sort((a, b) => (b.biaya || 0) - (a.biaya || 0))[0];
    return { best, biggestCost };
  }, [perLahanComputed, biayaProduksi]);

  /* =======================
     Modal CRUD
  ======================= */
  const [isCrudOpen, setIsCrudOpen] = useState(false);
  const [crudMode, setCrudMode] = useState<ModalMode>("create");
  const [activeSection, setActiveSection] = useState<ActiveSection>("biaya");
  const [editId, setEditId] = useState<string | null>(null);

  // form states
  const [formBiaya, setFormBiaya] = useState<{ kategori: string; biaya: number }>({ kategori: "", biaya: 0 });
  const [formPerLahan, setFormPerLahan] = useState<{ lahan: string; biaya: number; pendapatan: number }>({
    lahan: "",
    biaya: 0,
    pendapatan: 0,
  });
  const [formCashflow, setFormCashflow] = useState<{ bulan: string; pengeluaran: number; pendapatan: number }>({
    bulan: "Jan",
    pengeluaran: -1_000_000,
    pendapatan: 0,
  });

  const openCreate = (section: ActiveSection) => {
    setActiveSection(section);
    setCrudMode("create");
    setEditId(null);
    setFormBiaya({ kategori: "", biaya: 0 });
    setFormPerLahan({ lahan: "", biaya: 0, pendapatan: 0 });
    setFormCashflow({ bulan: "Jan", pengeluaran: -1_000_000, pendapatan: 0 });
    setIsCrudOpen(true);
  };

  const openEdit = (section: ActiveSection, id: string) => {
    setActiveSection(section);
    setCrudMode("edit");
    setEditId(id);

    if (section === "biaya") {
      const item = biayaProduksi.find((x) => x.id === id);
      if (item) setFormBiaya({ kategori: item.kategori, biaya: item.biaya });
    }
    if (section === "perlahan") {
      const item = perLahan.find((x) => x.id === id);
      if (item) setFormPerLahan({ lahan: item.lahan, biaya: item.biaya, pendapatan: item.pendapatan });
    }
    if (section === "cashflow") {
      const item = cashflowData.find((x) => x.id === id);
      if (item) setFormCashflow({ bulan: item.bulan, pengeluaran: item.pengeluaran, pendapatan: item.pendapatan });
    }

    setIsCrudOpen(true);
  };

  const submitCrud = () => {
    if (activeSection === "biaya") {
      const kategori = formBiaya.kategori.trim();
      const biaya = Math.max(0, Number(formBiaya.biaya) || 0);

      if (!kategori) return alert("Kategori wajib diisi.");

      if (crudMode === "create") {
        setBiayaProduksi((prev) => [{ id: uid(), kategori, biaya }, ...prev]);
      } else {
        if (!editId) return;
        setBiayaProduksi((prev) => prev.map((x) => (x.id === editId ? { ...x, kategori, biaya } : x)));
      }
    }

    if (activeSection === "perlahan") {
      const lahan = formPerLahan.lahan.trim();
      const biaya = Math.max(0, Number(formPerLahan.biaya) || 0);
      const pendapatan = Math.max(0, Number(formPerLahan.pendapatan) || 0);

      if (!lahan) return alert("Nama lahan wajib diisi.");

      if (crudMode === "create") {
        setPerLahan((prev) => [{ id: uid(), lahan, biaya, pendapatan }, ...prev]);
      } else {
        if (!editId) return;
        setPerLahan((prev) => prev.map((x) => (x.id === editId ? { ...x, lahan, biaya, pendapatan } : x)));
      }
    }

    if (activeSection === "cashflow") {
      const bulan = formCashflow.bulan.trim() || "Jan";
      const pengeluaran = Number(formCashflow.pengeluaran) || 0;
      const pendapatan = Math.max(0, Number(formCashflow.pendapatan) || 0);

      if (crudMode === "create") {
        setCashflowData((prev) => [{ id: uid(), bulan, pengeluaran, pendapatan }, ...prev]);
      } else {
        if (!editId) return;
        setCashflowData((prev) => prev.map((x) => (x.id === editId ? { ...x, bulan, pengeluaran, pendapatan } : x)));
      }
    }

    setIsCrudOpen(false);
  };

  const deleteItem = (section: ActiveSection, id: string) => {
    const ok = confirm("Hapus item ini?");
    if (!ok) return;

    if (section === "biaya") setBiayaProduksi((prev) => prev.filter((x) => x.id !== id));
    if (section === "perlahan") setPerLahan((prev) => prev.filter((x) => x.id !== id));
    if (section === "cashflow") setCashflowData((prev) => prev.filter((x) => x.id !== id));
  };

  /* =======================
     Tools Modals
  ======================= */
  const [openKalkulator, setOpenKalkulator] = useState(false);
  const [openSimulasi, setOpenSimulasi] = useState(false);

  // Kalkulator: biaya per ha + target profit
  const [calcAreaHa, setCalcAreaHa] = useState(1);
  const [calcTargetProfit, setCalcTargetProfit] = useState(10_000_000);

  const calcResult = useMemo(() => {
    const area = Math.max(0.01, Number(calcAreaHa) || 1);
    const totalCost = totalBiaya;
    const costPerHa = totalCost / area;

    const requiredRevenue = totalBiaya + (Number(calcTargetProfit) || 0);
    const requiredMarginPct = totalBiaya > 0 ? ((Number(calcTargetProfit) || 0) / totalBiaya) * 100 : 0;

    return {
      costPerHa,
      requiredRevenue,
      requiredMarginPct,
    };
  }, [calcAreaHa, calcTargetProfit, totalBiaya]);

  // Simulasi Harga Jual: input hasil panen (kg) + harga/kg
  const [simKg, setSimKg] = useState(5_000);
  const [simPrice, setSimPrice] = useState(8_000);

  const simResult = useMemo(() => {
    const kg = Math.max(0, Number(simKg) || 0);
    const price = Math.max(0, Number(simPrice) || 0);
    const revenue = kg * price;
    const profit = revenue - totalBiaya;
    const roi = totalBiaya > 0 ? (profit / totalBiaya) * 100 : 0;

    // BEP price per kg:
    const bepPrice = kg > 0 ? totalBiaya / kg : 0;

    return {
      revenue,
      profit,
      roi,
      bepPrice,
    };
  }, [simKg, simPrice, totalBiaya]);

  const exportPdf = () => {
    // Minimal functional: user bisa Save as PDF
    window.print();
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-200 p-6"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-green-700">💰 Smart Finance Overview</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">Manajemen Keuangan</h2>
            <p className="text-gray-600 mt-2 max-w-xl">
              Transparansi biaya produksi, proyeksi pendapatan, dan analisis profitabilitas pertanian.
            </p>

            <button onClick={resetDefault} className="mt-3 text-xs text-gray-600 underline hover:text-gray-900" type="button">
              Reset ke data default
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => openCreate("biaya")}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:brightness-110 transition flex items-center gap-2"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Tambah Biaya
            </button>
            <button
              onClick={() => openCreate("perlahan")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Tambah Lahan
            </button>
            <button
              onClick={() => openCreate("cashflow")}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition flex items-center gap-2"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Tambah Cashflow
            </button>
          </div>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50/80 backdrop-blur border border-blue-200 rounded-2xl p-4 flex gap-3"
      >
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900">Modul Keuangan MVP</p>
          <p className="text-sm text-blue-700 mt-1">
            Semua data bisa diubah (CRUD) dan tersimpan di localStorage. Belum termasuk layanan kredit/pinjaman.
          </p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {toJt(totalBiaya)}</p>
          <p className="text-gray-600 mt-1">Total Biaya Produksi</p>
          <p className="text-xs text-gray-500 mt-1">Musim ini</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {toJt(totalPendapatan)}</p>
          <p className="text-gray-600 mt-1">Est. Pendapatan</p>
          <p className="text-xs text-green-600 mt-1">Proyeksi</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {toJt(totalProfit)}</p>
          <p className="text-gray-600 mt-1">Profit Bersih</p>
          <p className="text-xs text-blue-600 mt-1">
            {totalBiaya > 0 ? `+${marginPct.toFixed(0)}% margin` : "—"}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-2xl text-gray-900">{avgRoi.toFixed(0)}%</p>
          <p className="text-gray-600 mt-1">ROI Rata-rata</p>
          <p className="text-xs text-gray-500 mt-1">Return on Investment</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900">Komposisi Biaya Produksi</h3>
            <button
              onClick={() => openCreate("biaya")}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>

          <div className="flex items-center justify-center mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: any, _n: any, p: any) => [`${v}% (${rupiah(p?.payload?.biaya ?? 0)})`, "Porsi"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {biayaProduksi.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: piePalette[idx % piePalette.length] }} />
                  <span className="text-sm text-gray-700">{item.kategori}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{rupiah(item.biaya)}</p>
                    <p className="text-xs text-gray-500">
                      {totalBiaya > 0 ? ((item.biaya / totalBiaya) * 100).toFixed(1) : "0.0"}%
                    </p>
                  </div>

                  <button onClick={() => openEdit("biaya", item.id)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                    <Edit className="w-4 h-4 text-gray-700" />
                  </button>
                  <button onClick={() => deleteItem("biaya", item.id)} className="p-2 rounded-lg hover:bg-red-50" type="button">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
            {!biayaProduksi.length && <p className="text-sm text-gray-500">Belum ada data biaya.</p>}
          </div>
        </div>

        {/* Performance per Lahan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900">Kinerja Keuangan per Lahan</h3>
            <button
              onClick={() => openCreate("perlahan")}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
              type="button"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={perLahanComputed}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="lahan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value: any) => `Rp ${(value / 1_000_000).toFixed(1)}jt`}
              />
              <Legend />
              <Bar dataKey="biaya" fill="#ef4444" name="Biaya" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pendapatan" fill="#10b981" name="Pendapatan" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* inline quick manage */}
          <div className="mt-4 space-y-2">
            {perLahanComputed.map((x) => (
              <div key={x.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="text-sm text-gray-900">{x.lahan}</p>
                  <p className="text-xs text-gray-500">
                    Profit: <span className="text-gray-800">{rupiah(x.profit)}</span> • ROI:{" "}
                    <span className="text-gray-800">{x.roi}%</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit("perlahan", x.id)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                    <Edit className="w-4 h-4 text-gray-700" />
                  </button>
                  <button onClick={() => deleteItem("perlahan", x.id)} className="p-2 rounded-lg hover:bg-red-50" type="button">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
            {!perLahanComputed.length && <p className="text-sm text-gray-500">Belum ada data per lahan.</p>}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Analisis Detail per Lahan</h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">Lahan</th>
                <th className="text-right py-3 px-4 text-gray-700">Biaya Produksi</th>
                <th className="text-right py-3 px-4 text-gray-700">Est. Pendapatan</th>
                <th className="text-right py-3 px-4 text-gray-700">Profit Bersih</th>
                <th className="text-right py-3 px-4 text-gray-700">ROI</th>
                <th className="text-center py-3 px-4 text-gray-700">Status</th>
                <th className="text-center py-3 px-4 text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {perLahanComputed.map((lahan) => (
                <tr key={lahan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{lahan.lahan}</td>
                  <td className="py-3 px-4 text-right text-red-600">{rupiah(lahan.biaya)}</td>
                  <td className="py-3 px-4 text-right text-green-600">{rupiah(lahan.pendapatan)}</td>
                  <td className="py-3 px-4 text-right text-blue-600">{rupiah(lahan.profit)}</td>
                  <td className="py-3 px-4 text-right text-gray-900">{lahan.roi}%</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs border ${lahan.roi >= 400
                          ? "bg-green-100 text-green-700 border-green-200"
                          : lahan.roi >= 300
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                        }`}
                    >
                      {lahan.roi >= 400 ? "Sangat Baik" : lahan.roi >= 300 ? "Baik" : "Sedang"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit("perlahan", lahan.id)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                        <Edit className="w-4 h-4 text-gray-700" />
                      </button>
                      <button onClick={() => deleteItem("perlahan", lahan.id)} className="p-2 rounded-lg hover:bg-red-50" type="button">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              <tr className="bg-gray-50">
                <td className="py-3 px-4 text-gray-900">Total</td>
                <td className="py-3 px-4 text-right text-red-600">{rupiah(totalBiaya)}</td>
                <td className="py-3 px-4 text-right text-green-600">{rupiah(totalPendapatan)}</td>
                <td className="py-3 px-4 text-right text-blue-600">{rupiah(totalProfit)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{avgRoi.toFixed(0)}%</td>
                <td className="py-3 px-4" />
                <td className="py-3 px-4" />
              </tr>

              {!perLahanComputed.length && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    Belum ada data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cashflow */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-900">Arus Kas</h3>
          <button
            onClick={() => openCreate("cashflow")}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            type="button"
          >
            <Plus className="w-4 h-4" />
            Tambah
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[...cashflowData].reverse()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: any) => `Rp ${(value / 1_000_000).toFixed(1)}jt`}
            />
            <Legend />
            <Line type="monotone" dataKey="pengeluaran" stroke="#ef4444" strokeWidth={2} name="Pengeluaran" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="pendapatan" stroke="#10b981" strokeWidth={2} name="Pendapatan" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {[...cashflowData].map((x) => (
            <div key={x.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div>
                <p className="text-sm text-gray-900">{x.bulan}</p>
                <p className="text-xs text-gray-500">
                  Pengeluaran: <span className="text-red-600">{rupiah(x.pengeluaran)}</span> • Pendapatan:{" "}
                  <span className="text-green-600">{rupiah(x.pendapatan)}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit("cashflow", x.id)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                  <Edit className="w-4 h-4 text-gray-700" />
                </button>
                <button onClick={() => deleteItem("cashflow", x.id)} className="p-2 rounded-lg hover:bg-red-50" type="button">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
          {!cashflowData.length && <p className="text-sm text-gray-500">Belum ada data cashflow.</p>}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <p className="text-green-900">Kinerja Positif</p>
              <p className="text-sm text-green-700 mt-1">
                {insights.best
                  ? `ROI tertinggi ada di ${insights.best.lahan} (${insights.best.roi}%). Pertimbangkan memperluas komoditas/area yang paling efektif.`
                  : "Belum ada data per lahan untuk dianalisis."}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <PieChartIcon className="w-6 h-6 text-blue-600 shrink-0" />
            <div>
              <p className="text-blue-900">Optimalisasi Biaya</p>
              <p className="text-sm text-blue-700 mt-1">
                {insights.biggestCost
                  ? `Komponen biaya terbesar: ${insights.biggestCost.kategori} (${(
                    (insights.biggestCost.biaya / Math.max(1, totalBiaya)) *
                    100
                  ).toFixed(0)}%). Evaluasi efisiensi & alternatif yang lebih murah.`
                  : "Belum ada data biaya untuk dianalisis."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Laporan & Dokumen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={exportPdf}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            type="button"
          >
            <FileText className="w-5 h-5" />
            <span>Export Laporan PDF</span>
          </button>

          <button
            onClick={() => setOpenKalkulator(true)}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            type="button"
          >
            <Calculator className="w-5 h-5" />
            <span>Kalkulator Biaya</span>
          </button>

          <button
            onClick={() => setOpenSimulasi(true)}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3"
            type="button"
          >
            <DollarSign className="w-5 h-5" />
            <span>Simulasi Harga Jual</span>
          </button>
        </div>
      </div>

      {/* =======================
          CRUD MODAL (LANJUTAN)
      ======================= */}
      {isCrudOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsCrudOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 text-lg font-semibold">
                  {crudMode === "create" ? "Tambah Data" : "Edit Data"} •{" "}
                  {activeSection === "biaya" ? "Biaya Produksi" : activeSection === "perlahan" ? "Per Lahan" : "Cashflow"}
                </h3>
                <p className="text-sm text-gray-600">Tersimpan otomatis ke localStorage.</p>
              </div>

              <button
                onClick={() => setIsCrudOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ===== Form Content ===== */}
            <div className="space-y-4">
              {activeSection === "biaya" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Kategori</label>
                    <input
                      value={formBiaya.kategori}
                      onChange={(e) => setFormBiaya((p) => ({ ...p, kategori: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Contoh: Pupuk"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Biaya (Rp)</label>
                    <input
                      type="number"
                      value={formBiaya.biaya}
                      onChange={(e) => setFormBiaya((p) => ({ ...p, biaya: Number(e.target.value) }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                    <p className="text-xs text-gray-500 mt-1">Preview: {rupiah(Number(formBiaya.biaya) || 0)}</p>
                  </div>
                </div>
              )}

              {activeSection === "perlahan" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Nama Lahan</label>
                    <input
                      value={formPerLahan.lahan}
                      onChange={(e) => setFormPerLahan((p) => ({ ...p, lahan: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Contoh: Lahan E"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Biaya Produksi (Rp)</label>
                    <input
                      type="number"
                      value={formPerLahan.biaya}
                      onChange={(e) => setFormPerLahan((p) => ({ ...p, biaya: Number(e.target.value) }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                    <p className="text-xs text-gray-500 mt-1">Preview: {rupiah(Number(formPerLahan.biaya) || 0)}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Estimasi Pendapatan (Rp)</label>
                    <input
                      type="number"
                      value={formPerLahan.pendapatan}
                      onChange={(e) => setFormPerLahan((p) => ({ ...p, pendapatan: Number(e.target.value) }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {(() => {
                        const biaya = Math.max(0, Number(formPerLahan.biaya) || 0);
                        const pendapatan = Math.max(0, Number(formPerLahan.pendapatan) || 0);
                        const profit = pendapatan - biaya;
                        const roi = biaya > 0 ? (profit / biaya) * 100 : 0;
                        return (
                          <div className="text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-2">
                            <span>
                              Profit: <b className="text-gray-900">{rupiah(profit)}</b>
                            </span>
                            <span>
                              ROI: <b className="text-gray-900">{clamp(roi, -999999, 999999).toFixed(0)}%</b>
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "cashflow" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Bulan</label>
                    <select
                      value={formCashflow.bulan}
                      onChange={(e) => setFormCashflow((p) => ({ ...p, bulan: e.target.value }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"].map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Pengeluaran biasanya bernilai negatif.</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Pengeluaran (Rp)</label>
                    <input
                      type="number"
                      value={formCashflow.pengeluaran}
                      onChange={(e) => setFormCashflow((p) => ({ ...p, pengeluaran: Number(e.target.value) }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Preview: {rupiah(Number(formCashflow.pengeluaran) || 0)}</p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm text-gray-600">Pendapatan (Rp)</label>
                    <input
                      type="number"
                      value={formCashflow.pendapatan}
                      onChange={(e) => setFormCashflow((p) => ({ ...p, pendapatan: Number(e.target.value) }))}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                      min={0}
                    />
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {(() => {
                        const net = (Number(formCashflow.pendapatan) || 0) + (Number(formCashflow.pengeluaran) || 0);
                        return (
                          <div className="text-sm text-gray-700">
                            Net bulan ini:{" "}
                            <b className={net >= 0 ? "text-green-700" : "text-red-700"}>{rupiah(net)}</b>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===== Actions ===== */}
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={() => setIsCrudOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                type="button"
              >
                Batal
              </button>
              <button
                onClick={submitCrud}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:brightness-110"
                type="button"
              >
                {crudMode === "create" ? "Simpan" : "Update"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* =======================
          MODAL: Kalkulator Biaya
      ======================= */}
      {openKalkulator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpenKalkulator(false)} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 text-lg font-semibold">Kalkulator Biaya</h3>
                <p className="text-sm text-gray-600">Hitung biaya per hektar & target pendapatan.</p>
              </div>
              <button onClick={() => setOpenKalkulator(false)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Total Area (ha)</label>
                <input
                  type="number"
                  value={calcAreaHa}
                  onChange={(e) => setCalcAreaHa(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={0.01}
                  step={0.1}
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Target Profit (Rp)</label>
                <input
                  type="number"
                  value={calcTargetProfit}
                  onChange={(e) => setCalcTargetProfit(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={0}
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Biaya total (saat ini)</span>
                <b className="text-gray-900">{rupiah(totalBiaya)}</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Biaya per ha</span>
                <b className="text-gray-900">{rupiah(calcResult.costPerHa)}</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pendapatan minimum utk target profit</span>
                <b className="text-gray-900">{rupiah(calcResult.requiredRevenue)}</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Target margin</span>
                <b className="text-gray-900">{calcResult.requiredMarginPct.toFixed(0)}%</b>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenKalkulator(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                type="button"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* =======================
          MODAL: Simulasi Harga Jual
      ======================= */}
      {openSimulasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpenSimulasi(false)} />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="relative w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-gray-900 text-lg font-semibold">Simulasi Harga Jual</h3>
                <p className="text-sm text-gray-600">Uji skenario hasil panen & harga/kg.</p>
              </div>
              <button onClick={() => setOpenSimulasi(false)} className="p-2 rounded-lg hover:bg-gray-100" type="button">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Hasil Panen (kg)</label>
                <input
                  type="number"
                  value={simKg}
                  onChange={(e) => setSimKg(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={0}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Harga Jual / kg (Rp)</label>
                <input
                  type="number"
                  value={simPrice}
                  onChange={(e) => setSimPrice(Number(e.target.value))}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg"
                  min={0}
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-gray-200 bg-gray-50 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Pendapatan</span>
                <b className="text-gray-900">{rupiah(simResult.revenue)}</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Profit (vs total biaya)</span>
                <b className={simResult.profit >= 0 ? "text-green-700" : "text-red-700"}>{rupiah(simResult.profit)}</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">ROI</span>
                <b className="text-gray-900">{simResult.roi.toFixed(0)}%</b>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">BEP Harga / kg</span>
                <b className="text-gray-900">{rupiah(simResult.bepPrice)}</b>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenSimulasi(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                type="button"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
