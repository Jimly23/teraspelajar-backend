import { UserRole } from "../generated/prisma/client";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}