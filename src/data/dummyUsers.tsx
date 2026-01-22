import type { AuthUser } from "../types/auth";
import bcrypt from "bcryptjs";

// helper untuk generate hash sekali
function hash(pw: string) {
    return bcrypt.hashSync(pw, 8);
}

export const dummyUsers: AuthUser[] = [
    {
        id: "u1",
        name: "Petani Farmlens",
        email: "petani@farmlens.com",
        passwordHash: hash("petani123"),
        role: "petani",
    },
    {
        id: "u2",
        name: "Pemilik Toko Farmlens",
        email: "toko@farmlens.com",
        passwordHash: hash("toko123"),
        role: "pemilik_marketplace",
    },
    {
        id: "u3",
        name: "Admin Farmlens",
        email: "admin@farmlens.com",
        passwordHash: hash("admin123"),
        role: "admin",
    },
];
