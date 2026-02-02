import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, Menu as MenuIcon, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

type PagePath = '/' | '/belajar' | '/artikel' | '/komunitas' | '/blog' | '/kamus'

export function Navbar() {
    const { pathname } = useLocation()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const lastScrollY = useRef(0)

    const menuItems: { label: string; href: PagePath }[] = [
        { label: 'Beranda', href: '/' },
        { label: 'Belajar', href: '/belajar' },
        { label: 'Kamus', href: '/kamus' },
        { label: 'Artikel', href: '/artikel' },
        { label: 'Komunitas', href: '/komunitas' },
    ]

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY
            setScrolled(currentY > 10)

            if (currentY > lastScrollY.current && currentY > 80) {
                setHidden(true)
            } else {
                setHidden(false)
            }

            lastScrollY.current = currentY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            role="navigation"
            aria-label="Main Navigation"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: hidden ? -90 : 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 120,
                damping: 28,
                mass: 1.1,
            }}
            className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-7xl px-4"
        >
            {/* ================= NAVBAR ================= */}
            <div
                className={`
          flex items-center justify-between
          rounded-2xl px-6 py-3
          backdrop-blur-xl ring-1 transition-all duration-300
          ${scrolled
                        ? 'bg-white/80 shadow-lg ring-black/5'
                        : 'bg-white/60 ring-black/5'}
        `}
            >
                {/* Logo */}
                <NavLink
                    to="/"
                    onClick={() => window.scrollTo({ top: 0 })}
                    className="flex items-center gap-3 group"
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-lg font-semibold tracking-tight text-neutral-900 group-hover:text-green-700 transition">
                            FarmLens
                        </span>
                        <span className="text-xs text-neutral-500">SolusiPetani</span>
                    </div>
                </NavLink>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Menu */}
                    <div className="flex items-center gap-8">
                        {menuItems.map(item => {
                            const active = pathname === item.href
                            return (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => window.scrollTo({ top: 0 })}
                                    className={`relative text-sm font-medium transition-colors
                      ${active
                                            ? 'text-green-700'
                                            : 'text-neutral-700 hover:text-green-700'}
                    `}
                                >
                                    {item.label}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-green-700"
                                        />
                                    )}
                                </NavLink>
                            )
                        })}
                    </div>

                    {/* Dashboard Button */}
                    <NavLink
                        to="/dashboard/overview"
                        className="
            flex items-center gap-2
            rounded-xl px-4 py-2
            text-sm font-semibold
            bg-green-700 text-white
            hover:bg-green-800
            transition shadow-md
        "
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </NavLink>
                </div>


                {/* Mobile Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6 text-neutral-700" />
                    ) : (
                        <MenuIcon className="w-6 h-6 text-neutral-700" />
                    )}
                </button>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden mt-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl ring-1 ring-black/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-3 gap-2">
                            {/* Dashboard Button */}
                            <NavLink
                                to="/dashboard"
                                onClick={() => setIsMenuOpen(false)}
                                className="
            flex items-center justify-center gap-2
            rounded-xl px-4 py-3
            text-sm font-semibold
            bg-green-700 text-white
            hover:bg-green-800
            transition shadow
        "
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </NavLink>

                            {/* Divider */}
                            <div className="h-px bg-neutral-200 my-2" />

                            {/* Menu Items */}
                            {menuItems.map(item => {
                                const active = pathname === item.href
                                return (
                                    <NavLink
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => {
                                            setIsMenuOpen(false)
                                            window.scrollTo({ top: 0 })
                                        }}
                                        className={`rounded-xl px-4 py-3 text-sm transition
                    ${active
                                                ? 'bg-green-50 text-green-700'
                                                : 'text-neutral-700 hover:bg-neutral-100'}
                `}
                                    >
                                        {item.label}
                                    </NavLink>
                                )
                            })}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
