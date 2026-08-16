import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is required",
            });
        }

        const [type, token] = authHeader.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization format",
            });
        }

        const payload = verifyToken(token);

        req.user = {
            userId: payload.userId,
            role: payload.role,
        };

        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
        });
    }
}