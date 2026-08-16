import { Request, Response } from "express";

import {
    createQuizQuestionService,
    getQuizQuestionsService,
    getQuizQuestionByIdService,
    updateQuizQuestionService,
    deleteQuizQuestionService,
    createQuizOptionService,
    getQuizOptionsByQuestionIdService,
    updateQuizOptionService,
    deleteQuizOptionService,
} from "../services/quiz-question.service";

export const createQuizQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const question =
            await createQuizQuestionService(req.body);

        return res.status(201).json({
            success: true,
            message: "Quiz question created successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getQuizQuestions = async (
    req: Request,
    res: Response
) => {
    try {
        const quizId = Number(req.params.quizId);

        const questions =
            await getQuizQuestionsService(quizId);

        return res.status(200).json({
            success: true,
            message: "Quiz questions retrieved successfully",
            data: questions,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getQuizQuestionById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const question =
            await getQuizQuestionByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Quiz question retrieved successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateQuizQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const question =
            await updateQuizQuestionService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Quiz question updated successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteQuizQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await deleteQuizQuestionService(id);

        return res.status(200).json({
            success: true,
            message: "Quiz question deleted successfully",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const createQuizOption = async (
    req: Request,
    res: Response
) => {
    try {
        const option =
            await createQuizOptionService(req.body);

        return res.status(201).json({
            success: true,
            message: "Quiz option created successfully",
            data: option,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getQuizOptionsByQuestionId = async (
    req: Request,
    res: Response
) => {
    try {
        const questionId = Number(req.params.questionId);

        if (isNaN(questionId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid question ID",
            });
        }

        const options =
            await getQuizOptionsByQuestionIdService(questionId);

        return res.status(200).json({
            success: true,
            message: "Quiz options retrieved successfully",
            data: options,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateQuizOption = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const option =
            await updateQuizOptionService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Quiz option updated successfully",
            data: option,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteQuizOption = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await deleteQuizOptionService(id);

        return res.status(200).json({
            success: true,
            message: "Quiz option deleted successfully",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
