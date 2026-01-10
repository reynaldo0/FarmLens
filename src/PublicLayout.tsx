import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

export default function PublicLayout() {
    const location = useLocation();
    return (
        <>
            {/* Navbar Public */}
            <Navbar />

            <AnimatePresence mode="wait">
                <PageTransition key={location.pathname}>
                    <Outlet />
                </PageTransition>
            </AnimatePresence>

            {/* Footer */}
            <footer className="bg-gray-100 p-6 text-center">
                © FarmLens
            </footer>
        </>
    );
}
