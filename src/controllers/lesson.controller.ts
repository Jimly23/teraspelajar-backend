import { Request, Response } from "express";

import {
    createLessonService,
    getAllLessonsService,
    getLessonsByModuleIdService,
    getLessonByIdService,
    updateLessonService,
    deleteLessonService,
} from "../services/lesson.service";

export const createLesson = async (
    req: Request,
    res: Response
) => {
    try {
        const lesson = await createLessonService(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            data: lesson,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create lesson",
        });
    }
};

export const getAllLessons = async (
    req: Request,
    res: Response
) => {
    try {
        const lessons =
            await getAllLessonsService();

        return res.status(200).json({
            success: true,
            message: "Lessons retrieved successfully",
            data: lessons,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve lessons",
        });
    }
};

export const getLessonsByModuleId = async (
    req: Request,
    res: Response
) => {
    try {
        const moduleId = Number(
            req.params.moduleId
        );

        if (isNaN(moduleId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        const lessons =
            await getLessonsByModuleIdService(
                moduleId
            );

        return res.status(200).json({
            success: true,
            message: "Lessons retrieved successfully",
            data: lessons,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve lessons",
        });
    }
};

export const getLessonById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson ID",
            });
        }

        const lesson =
            await getLessonByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Lesson retrieved successfully",
            data: lesson,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve lesson",
        });
    }
};

export const updateLesson = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson ID",
            });
        }

        const lesson =
            await updateLessonService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Lesson updated successfully",
            data: lesson,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update lesson",
        });
    }
};

export const deleteLesson = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid lesson ID",
            });
        }

        await deleteLessonService(id);

        return res.status(200).json({
            success: true,
            message: "Lesson deleted successfully",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete lesson",
        });
    }
};