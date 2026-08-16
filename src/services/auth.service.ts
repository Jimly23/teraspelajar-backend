import { UserRepository } from "../repositories/user.repository";
import {
    comparePassword,
    hashPassword,
} from "../utils/hash";
import { generateToken } from "../utils/jwt";
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

        // 4. Buat user
        const user = await this.userRepository.create({
            name: data.name,
            username: data.username,
            email: data.email,
            passwordHash,
            role: data.role || ("student" as UserRole),
        });

        // 5. Jangan return passwordHash
        return {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
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
}