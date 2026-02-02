import type { AuthUser } from "../types/auth";
import bcrypt from "bcryptjs";

const PETANI_HASH = bcrypt.hashSync("petani123", 8);
const TOKO_HASH = bcrypt.hashSync("toko123", 8);
const ADMIN_HASH = bcrypt.hashSync("admin123", 8);

export const dummyUsers: AuthUser[] = [
    {
        id: "u1",
        name: "Petani Farmlens",
        email: "petani@farmlens.com",
        passwordHash: PETANI_HASH,
        role: "petani",
    },
    {
        id: "u2",
        name: "Pemilik Toko Farmlens",
        email: "toko@farmlens.com",
        passwordHash: TOKO_HASH,
        role: "pemilik_marketplace",
    },
    {
        id: "u3",
        name: "Admin Farmlens",
        email: "admin@farmlens.com",
        passwordHash: ADMIN_HASH,
        role: "admin",
    },
];
