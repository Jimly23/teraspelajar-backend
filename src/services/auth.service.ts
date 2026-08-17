import { UserRepository } from "../repositories/user.repository";
import {
    comparePassword,
    hashPassword,
} from "../utils/hash";
import crypto from "crypto";
import { generateToken } from "../utils/jwt";
import { sendVerificationEmail } from "../utils/email";
import { UserRole } from "../generated/prisma/client";

export class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(data: {
        name: string;
        username: string;
        email: string;
        password: string;
        role?: UserRole;
    }) {
        // 1. Cek email
        const existingEmail =
            await this.userRepository.findByEmail(data.email);

        if (existingEmail) {
            throw new Error("Email already registered");
        }

        // 2. Cek username
        const existingUsername =
            await this.userRepository.findByUsername(data.username);

        if (existingUsername) {
            throw new Error("Username already taken");
        }

        // 3. Hash password
        const passwordHash = await hashPassword(data.password);

        // 4. Generate token verifikasi
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

        // 5. Buat user
        const user = await this.userRepository.create({
            name: data.name,
            username: data.username,
            email: data.email,
            passwordHash,
            role: data.role || ("student" as UserRole),
            isVerified: false,
            verificationToken,
            verificationTokenExpiresAt,
        } as any);

        // 6. Kirim email verifikasi
        try {
            await sendVerificationEmail(user.email, verificationToken);
        } catch (error) {
            console.error("Gagal mengirim email:", error);
            // Tetap kembalikan success registrasinya tapi log errornya
        }

        // 7. Jangan return passwordHash
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }

    async login(data: {
        email: string;
        password: string;
    }) {
        // 1. Cari user
        const user = await this.userRepository.findByEmail(
            data.email
        );

        if (!user) {
            throw new Error("Invalid email or password");
        }

        // 2. Bandingkan password
        const passwordValid = await comparePassword(
            data.password,
            user.passwordHash
        );

        if (!passwordValid) {
            throw new Error("Invalid email or password");
        }

        // 2.5 Cek apakah email sudah diverifikasi
        if (!(user as any).isVerified) {
            throw new Error("Silakan verifikasi email terlebih dahulu");
        }

        // 3. Generate JWT
        const token = generateToken({
            userId: user.id,
            role: user.role,
        });

        // 4. Return data
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                isVerified: (user as any).isVerified,
            },
        };
    }

    async getCurrentUser(userId: number) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async verifyEmail(token: string) {
        const user = await this.userRepository.findByVerificationToken(token);

        if (!user) {
            throw new Error("Token verifikasi tidak valid");
        }

        if ((user as any).isVerified) {
            throw new Error("Email sudah diverifikasi");
        }

        if (
            (user as any).verificationTokenExpiresAt &&
            (user as any).verificationTokenExpiresAt < new Date()
        ) {
            throw new Error("Token verifikasi telah kedaluwarsa");
        }

        await this.userRepository.verifyUserEmail(user.id);

        return true;
    }

    async resendVerification(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User tidak ditemukan");
        }

        if ((user as any).isVerified) {
            throw new Error("Email sudah diverifikasi");
        }

        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

        await this.userRepository.updateVerificationToken(
            user.id,
            verificationToken,
            verificationTokenExpiresAt
        );

        await sendVerificationEmail(user.email, verificationToken);

        return true;
    }
}