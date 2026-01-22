import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";
import type { UserRole } from "../types/auth";

export default function RequireRole({
    allow,
    children,
}: {
    allow: UserRole[];
    children: React.ReactNode;
}) {
    const location = useLocation();
    const user = getAuth();

    // belum login
    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    // role tidak diizinkan
    if (!allow.includes(user.role)) {
        return <Navigate to="/dashboard/overview" replace />;
    }

    return <>{children}</>;
}
