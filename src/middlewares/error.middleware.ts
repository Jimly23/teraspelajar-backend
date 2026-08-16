import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error);

    if (error.message === "Course not found") {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }

    if (error.message === "Course slug already exists") {
        return res.status(409).json({
            success: false,
            message: error.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};