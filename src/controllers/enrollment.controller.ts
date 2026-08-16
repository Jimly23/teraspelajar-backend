import { Request, Response, NextFunction } from "express";

import {
    createEnrollmentService,
    getEnrollmentByIdService,
    getMyEnrollmentsService,
    updateEnrollmentProgressService,
    cancelEnrollmentService,
} from "../services/enrollment.service";

export const createEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.userId;
        const { courseId } = req.body;

        const enrollment = await createEnrollmentService(
            userId,
            courseId
        );

        return res.status(201).json({
            success: true,
            message: "Successfully enrolled in course",
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyEnrollments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.userId;

        const enrollments =
            await getMyEnrollmentsService(userId);

        return res.status(200).json({
            success: true,
            message: "Enrollments retrieved successfully",
            data: enrollments,
        });
    } catch (error) {
        next(error);
    }
};

export const getEnrollmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.userId;

        const enrollment =
            await getEnrollmentByIdService(id, userId);

        return res.status(200).json({
            success: true,
            message: "Enrollment retrieved successfully",
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

export const updateEnrollmentProgress = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.userId;
        const { progress } = req.body;

        const enrollment =
            await updateEnrollmentProgressService(
                id,
                userId,
                progress
            );

        return res.status(200).json({
            success: true,
            message: "Enrollment progress updated successfully",
            data: enrollment,
        });
    } catch (error) {
        next(error);
    }
};

export const cancelEnrollment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enrollment ID",
            });
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const userId = req.user.userId;

        await cancelEnrollmentService(id, userId);

        return res.status(200).json({
            success: true,
            message: "Enrollment cancelled successfully",
        });
    } catch (error) {
        next(error);
    }
};