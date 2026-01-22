import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './PublicLayout';
import Artikel from './pages/Artikel';
import DashboardLayout from './DashboardLayout';
import Beranda from './pages/Beranda';
import Belajar from './pages/Belajar';
import Blog from './pages/Blog';
import KamusTanaman from './pages/Kamus';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Community from './pages/Community';
import Chatbot from './pages/ChatBot';
import FloatingChatbot from './components/FloatingChatbot';
import ScrollToTop from './components/ScrollToTop';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/belajar" element={<Belajar />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/kamus" element={<KamusTanaman />} />
          <Route path="/komunitas" element={<Community />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* DASHBOARD */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

      </Routes>
      <FloatingChatbot />
    </BrowserRouter>
  );
}
