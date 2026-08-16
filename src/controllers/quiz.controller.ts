import { Request, Response } from "express";

import {
    createQuizService,
    getAllQuizzesService,
    getQuizzesByModuleIdService,
    getQuizByIdService,
    updateQuizService,
    deleteQuizService,
} from "../services/quiz.service";

export const createQuiz = async (
    req: Request,
    res: Response
) => {
    try {
        const quiz = await createQuizService(
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: quiz,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create quiz",
        });
    }
};

export const getAllQuizzes = async (
    req: Request,
    res: Response
) => {
    try {
        const quizzes =
            await getAllQuizzesService();

        return res.status(200).json({
            success: true,
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve quizzes",
        });
    }
};

export const getQuizzesByModuleId = async (
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

        const quizzes =
            await getQuizzesByModuleIdService(
                moduleId
            );

        return res.status(200).json({
            success: true,
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve quizzes",
        });
    }
};

export const getQuizById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid quiz ID",
            });
        }

        const quiz =
            await getQuizByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Quiz retrieved successfully",
            data: quiz,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve quiz",
        });
    }
};

export const updateQuiz = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid quiz ID",
            });
        }

        const quiz =
            await updateQuizService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            data: quiz,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update quiz",
        });
    }
};

export const deleteQuiz = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid quiz ID",
            });
        }

        await deleteQuizService(id);

        return res.status(200).json({
            success: true,
            message: "Quiz deleted successfully",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete quiz",
        });
    }
};