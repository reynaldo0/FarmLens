import {
  Calculator,
  DollarSign,
  FileText,
  Info,
  PieChart as PieChartIcon,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
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
  YAxis
} from 'recharts';
import { motion } from "framer-motion";


const biayaProduksi = [
  { kategori: 'Benih', biaya: 2500000, persentase: 12.5 },
  { kategori: 'Pupuk', biaya: 6000000, persentase: 30 },
  { kategori: 'Pestisida', biaya: 3500000, persentase: 17.5 },
  { kategori: 'Tenaga Kerja', biaya: 5000000, persentase: 25 },
  { kategori: 'Irigasi & Utilitas', biaya: 2000000, persentase: 10 },
  { kategori: 'Lain-lain', biaya: 1000000, persentase: 5 },
];

const pieData = [
  { name: 'Pupuk', value: 30, color: '#10b981' },
  { name: 'Tenaga Kerja', value: 25, color: '#3b82f6' },
  { name: 'Pestisida', value: 17.5, color: '#f59e0b' },
  { name: 'Benih', value: 12.5, color: '#8b5cf6' },
  { name: 'Irigasi', value: 10, color: '#06b6d4' },
  { name: 'Lain-lain', value: 5, color: '#64748b' },
];

const perLahan = [
  { lahan: 'Lahan A', biaya: 7200000, pendapatan: 39600000, profit: 32400000, roi: 450 },
  { lahan: 'Lahan B', biaya: 4800000, pendapatan: 20160000, profit: 15360000, roi: 320 },
  { lahan: 'Lahan C', biaya: 3500000, pendapatan: 21600000, profit: 18100000, roi: 517 },
  { lahan: 'Lahan D', biaya: 4500000, pendapatan: 22750000, profit: 18250000, roi: 406 },
];

const cashflowData = [
  { bulan: 'Jan', pengeluaran: -8000000, pendapatan: 0 },
  { bulan: 'Feb', pengeluaran: -6000000, pendapatan: 0 },
  { bulan: 'Mar', pengeluaran: -5000000, pendapatan: 0 },
  { bulan: 'Apr', pengeluaran: -7000000, pendapatan: 0 },
  { bulan: 'Mei', pengeluaran: -4000000, pendapatan: 12000000 },
  { bulan: 'Jun', pengeluaran: -3000000, pendapatan: 0 },
];

export function Keuangan() {
  const totalBiaya = biayaProduksi.reduce((sum, item) => sum + item.biaya, 0);
  const totalPendapatan = perLahan.reduce((sum, item) => sum + item.pendapatan, 0);
  const totalProfit = totalPendapatan - totalBiaya;
  const avgRoi = perLahan.reduce((sum, item) => sum + item.roi, 0) / perLahan.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl
             bg-gradient-to-br from-green-50 via-white to-green-100
             border border-green-200 p-6"
      >
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-green-300/30 rounded-full blur-3xl" />

        <div className="relative">
          <p className="text-sm font-medium text-green-700">
            💰 Smart Finance Overview
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
            Manajemen Keuangan
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Transparansi biaya produksi, proyeksi pendapatan,
            dan analisis profitabilitas pertanian.
          </p>
        </div>
      </motion.div>


      {/* Info Banner */}
      <motion.div initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50/80 backdrop-blur
             border border-blue-200 rounded-2xl p-4 flex gap-3"
      >
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900">Modul Keuangan MVP</p>
          <p className="text-sm text-blue-700 mt-1">
            Fitur ini menyediakan transparansi biaya dan estimasi pendapatan untuk membantu perencanaan keuangan.
            Belum termasuk layanan kredit atau pinjaman.
          </p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {(totalBiaya / 1000000).toFixed(1)}jt</p>
          <p className="text-gray-600 mt-1">Total Biaya Produksi</p>
          <p className="text-xs text-gray-500 mt-1">Musim ini</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {(totalPendapatan / 1000000).toFixed(1)}jt</p>
          <p className="text-gray-600 mt-1">Est. Pendapatan</p>
          <p className="text-xs text-green-600 mt-1">Proyeksi panen</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-5 shadow-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-2xl text-gray-900">Rp {(totalProfit / 1000000).toFixed(1)}jt</p>
          <p className="text-gray-600 mt-1">Profit Bersih</p>
          <p className="text-xs text-blue-600 mt-1">+{((totalProfit / totalBiaya) * 100).toFixed(0)}% margin</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white/80 backdrop-blur rounded-2xl
             border border-gray-200 p-5 shadow-sm"
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
          <h3 className="text-gray-900 mb-4">Komposisi Biaya Produksi</h3>
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
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {biayaProduksi.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: pieData[idx]?.color || '#gray' }}
                  />
                  <span className="text-sm text-gray-700">{item.kategori}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">Rp {(item.biaya / 1000000).toFixed(1)}jt</p>
                  <p className="text-xs text-gray-500">{item.persentase}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance per Lahan */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-4">Kinerja Keuangan per Lahan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={perLahan}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="lahan" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`}
              />
              <Legend />
              <Bar dataKey="biaya" fill="#ef4444" name="Biaya" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pendapatan" fill="#10b981" name="Pendapatan" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
              </tr>
            </thead>
            <tbody>
              {perLahan.map((lahan, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{lahan.lahan}</td>
                  <td className="py-3 px-4 text-right text-red-600">
                    Rp {(lahan.biaya / 1000000).toFixed(1)}jt
                  </td>
                  <td className="py-3 px-4 text-right text-green-600">
                    Rp {(lahan.pendapatan / 1000000).toFixed(1)}jt
                  </td>
                  <td className="py-3 px-4 text-right text-blue-600">
                    Rp {(lahan.profit / 1000000).toFixed(1)}jt
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">{lahan.roi}%</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs border ${lahan.roi >= 400
                      ? 'bg-green-100 text-green-700 border-green-200'
                      : lahan.roi >= 300
                        ? 'bg-blue-100 text-blue-700 border-blue-200'
                        : 'bg-amber-100 text-amber-700 border-amber-200'
                      }`}>
                      {lahan.roi >= 400 ? 'Sangat Baik' : lahan.roi >= 300 ? 'Baik' : 'Sedang'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="py-3 px-4 text-gray-900">Total</td>
                <td className="py-3 px-4 text-right text-red-600">
                  Rp {(totalBiaya / 1000000).toFixed(1)}jt
                </td>
                <td className="py-3 px-4 text-right text-green-600">
                  Rp {(totalPendapatan / 1000000).toFixed(1)}jt
                </td>
                <td className="py-3 px-4 text-right text-blue-600">
                  Rp {(totalProfit / 1000000).toFixed(1)}jt
                </td>
                <td className="py-3 px-4 text-right text-gray-900">{avgRoi.toFixed(0)}%</td>
                <td className="py-3 px-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cashflow */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Arus Kas 6 Bulan Terakhir</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={cashflowData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="bulan" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
              formatter={(value: any) => `Rp ${(value / 1000000).toFixed(1)}jt`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pengeluaran"
              stroke="#ef4444"
              strokeWidth={2}
              name="Pengeluaran"
              dot={{ fill: '#ef4444', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pendapatan"
              stroke="#10b981"
              strokeWidth={2}
              name="Pendapatan"
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-green-600 shrink-0" />
            <div>
              <p className="text-green-900">Kinerja Positif</p>
              <p className="text-sm text-green-700 mt-1">
                Lahan C memiliki ROI tertinggi (517%). Pertimbangkan untuk memperluas area cabai pada musim depan.
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
                Biaya pupuk 30% dari total. Pertimbangkan pupuk organik atau kompos untuk efisiensi jangka panjang.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4">Laporan & Dokumen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
            <FileText className="w-5 h-5" />
            <span>Export Laporan PDF</span>
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
            <Calculator className="w-5 h-5" />
            <span>Kalkulator Biaya</span>
          </button>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-3">
            <DollarSign className="w-5 h-5" />
            <span>Simulasi Harga Jual</span>
          </button>
        </div>
      </div>
    </div>
  );
}
