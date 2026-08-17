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
        isVerified?: boolean;
        verificationToken?: string;
        verificationTokenExpiresAt?: Date;
    }) {
        return prisma.user.create({
            data: data as any, // Cast as any because the types in memory may not be fully synced yet
        });
    }

    async findByVerificationToken(token: string) {
        return prisma.user.findFirst({
            where: {
                verificationToken: token,
            },
        });
    }

    async verifyUserEmail(userId: number) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            } as any,
        });
    }

    async updateVerificationToken(
        userId: number,
        token: string,
        expiresAt: Date
    ) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                verificationToken: token,
                verificationTokenExpiresAt: expiresAt,
            } as any,
        });
    }
}