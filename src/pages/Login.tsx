import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Store } from "lucide-react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

type Role = "petani" | "pemilik_marketplace";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function RoleOption({
  active,
  onClick,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "relative w-full text-left rounded-2xl border p-4 transition-all",
        "focus:outline-none focus:ring-2 focus:ring-green-500/30",
        active
          ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-500/20"
          : "bg-white/70 text-gray-800 border-gray-200 hover:bg-green-50 hover:border-green-200"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cx(
            "w-11 h-11 rounded-2xl flex items-center justify-center",
            active ? "bg-white/15" : "bg-green-100 text-green-700"
          )}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="font-semibold">{title}</div>
          <div className={cx("text-xs mt-1", active ? "text-white/80" : "text-gray-500")}>
            {desc}
          </div>
        </div>
      </div>

      {/* active glow line */}
      <div
        className={cx(
          "absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-green-400 to-emerald-300 transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
      />
    </button>
  );
}

export default function Login() {
  const [role, setRole] = useState<Role>("petani");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const roleCopy = useMemo(() => {
    if (role === "petani") {
      return {
        title: "Masuk sebagai Petani",
        subtitle: "Akses belajar, deteksi, dan marketplace komoditas.",
        afterLogin: "/dashboard/overview",
      };
    }
    return {
      title: "Masuk sebagai Pemilik Marketplace",
      subtitle: "Kelola toko, listing, dan penawaran kolaborasi.",
      afterLogin: "/dashboard/overview",
    };
  }, [role]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = login(email, password);

    if (!user) {
      alert("Email atau password salah!");
      return;
    }

    navigate("/dashboard/overview");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-green-50 via-white to-green-100 px-4">
      {/* Animated background blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-green-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-32 -right-32 w-[420px] h-[420px] bg-green-400/30 rounded-full blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl shadow-2xl px-6 sm:px-8 py-8 sm:py-10"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            {/* Back Button */}
            <div className="flex justify-between items-center mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Link>

              {/* Logo */}
              <Link to="/" className="inline-flex items-center gap-2">
                <img src="/logo.png" alt="FarmLens" className="w-10 h-10" />
                <span className="font-bold text-green-700 text-lg">FarmLens</span>
              </Link>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Akses Akun FarmLens
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mt-4">
              {roleCopy.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {roleCopy.subtitle}
            </p>
          </motion.div>


          {/* Role Switch */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid sm:grid-cols-2 gap-3 mb-6"
          >
            <RoleOption
              active={role === "petani"}
              onClick={() => setRole("petani")}
              icon={<Leaf className="w-5 h-5" />}
              title="Petani"
              desc="Belajar, cek tanaman, jual hasil panen"
            />
            <RoleOption
              active={role === "pemilik_marketplace"}
              onClick={() => setRole("pemilik_marketplace")}
              icon={<Store className="w-5 h-5" />}
              title="Pemilik Marketplace"
              desc="Kelola toko, stok, dan kolaborasi"
            />
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="peer w-full bg-white/60 border border-gray-200 rounded-2xl px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-green-600"
              >
                Email Address
              </label>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative"
            >
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="peer w-full bg-white/60 border border-gray-200 rounded-2xl px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-2 text-xs text-gray-500 transition-all
                peer-placeholder-shown:top-3
                peer-placeholder-shown:text-sm
                peer-placeholder-shown:text-gray-400
                peer-focus:top-2
                peer-focus:text-xs
                peer-focus:text-green-600"
              >
                Password
              </label>
            </motion.div>

            {/* Actions row */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-gray-600 select-none">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500/30"
                />
                Ingat saya
              </label>

              <Link to="/forgot-password" className="font-semibold text-green-700 hover:underline">
                Lupa password?
              </Link>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              type="submit"
              className="w-full h-12 rounded-2xl bg-linear-to-r from-green-600 to-green-700 text-white font-semibold shadow-lg shadow-green-500/25 hover:brightness-110 inline-flex items-center justify-center gap-2"
            >
              Sign In
              <span className="opacity-90">→</span>
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-sm text-center text-gray-600 mt-6"
          >
            Belum punya akun?{" "}
            <Link to="/register" className="font-semibold text-green-700 hover:underline">
              Daftar sekarang
            </Link>
          </motion.p>

          <div className="mt-6 text-center text-xs text-gray-500">
            Dengan masuk, kamu menyetujui{" "}
            <Link to="/terms" className="text-green-700 font-semibold hover:underline">
              S&K
            </Link>{" "}
            dan{" "}
            <Link to="/privacy" className="text-green-700 font-semibold hover:underline">
              Kebijakan Privasi
            </Link>
            .
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
