import { prisma } from "../config/database";
import { UserRole } from "../generated/prisma/client";

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findByUsername(username: string) {
        return prisma.user.findUnique({
            where: {
                username,
            },
        });
    }

    async findById(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async create(data: {
        name: string;
        username: string;
        email: string;
        passwordHash: string;
        role: UserRole;
    }) {
        return prisma.user.create({
            data,
        });
    }
}