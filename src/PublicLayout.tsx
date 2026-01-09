import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
    return (
        <>
            {/* Navbar Public */}
            <header className="border-b bg-white p-4">Navbar Public</header>

            <Outlet />

            {/* Footer */}
            <footer className="bg-gray-100 p-6 text-center">
                © DigiSmart
            </footer>
        </>
    );
}
