import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export async function register(
    req: Request,
    res: Response
) {
    try {
        const {
            name,
            username,
            email,
            password,
            role,
        } = req.body;

        const user = await authService.register({
            name,
            username,
            email,
            password,
            role,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Registration failed";

        return res.status(400).json({
            success: false,
            message,
        });
    }
}

export async function login(
    req: Request,
    res: Response
) {
    try {
        const { email, password } = req.body;

        const result = await authService.login({
            email,
            password,
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Login failed";

        return res.status(401).json({
            success: false,
            message,
        });
    }
}

export async function me(
    req: Request,
    res: Response
) {
    try {
        const userId = req.user!.userId;

        const user = await authService.getCurrentUser(userId);

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to get current user";

        return res.status(404).json({
            success: false,
            message,
        });
    }
}

export const logout = async (
    req: Request,
    res: Response
) => {
    return res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};