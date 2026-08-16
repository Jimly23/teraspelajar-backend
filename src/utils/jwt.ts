import jwt, {
    SignOptions,
    JwtPayload as JwtLibraryPayload,
} from "jsonwebtoken";

import { env } from "../config/env";

export interface AuthJwtPayload extends JwtLibraryPayload {
    userId: number;
    role: string;
}

export function generateToken(
    payload: Omit<AuthJwtPayload, "iat" | "exp">
): string {
    const options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
    };

    return jwt.sign(
        payload,
        env.JWT_SECRET,
        options
    );
}

export function verifyToken(
    token: string
): AuthJwtPayload {
    const decoded = jwt.verify(
        token,
        env.JWT_SECRET
    );

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }

    if (
        typeof decoded.userId !== "number" ||
        typeof decoded.role !== "string"
    ) {
        throw new Error("Invalid token payload");
    }

    return decoded as AuthJwtPayload;
}