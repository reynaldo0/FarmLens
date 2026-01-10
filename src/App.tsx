import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import Artikel from './pages/Artikel';
import DashboardLayout from './DashboardLayout';
import Beranda from './pages/Beranda';
import Belajar from './pages/Belajar';
import Blog from './pages/Blog';
import KamusTanaman from './pages/Kamus';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/belajar" element={<Belajar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kamus" element={<KamusTanaman />} />
        </Route>

        {/* DASHBOARD */}
        <Route path="/dashboard/*" element={<DashboardLayout />} />

      </Routes>
    </BrowserRouter>
  );
}
