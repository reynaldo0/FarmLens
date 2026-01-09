import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export default function PublicLayout() {
    return (
        <>
            {/* Navbar Public */}
            <Navbar />

            <Outlet />

            {/* Footer */}
            <footer className="bg-gray-100 p-6 text-center">
                © DigiSmart
            </footer>
        </>
    );
}
