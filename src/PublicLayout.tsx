import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Footer from './components/Footer';

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
            <Footer />
        </>
    );
}
