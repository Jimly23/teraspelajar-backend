import { Request, Response } from "express";

import {
    createExamQuestionService,
    getExamQuestionsService,
    getExamQuestionByIdService,
    updateExamQuestionService,
    deleteExamQuestionService,
    createExamOptionService,
    getExamOptionsByQuestionIdService,
    updateExamOptionService,
    deleteExamOptionService,
} from "../services/exam-question.service";

export const createExamQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const question = await createExamQuestionService(req.body);

        return res.status(201).json({
            success: true,
            message: "Exam question created successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getExamQuestions = async (
    req: Request,
    res: Response
) => {
    try {
        const examId = Number(req.params.examId);

        const questions =
            await getExamQuestionsService(examId);

        return res.status(200).json({
            success: true,
            message: "Exam questions retrieved successfully",
            data: questions,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getExamQuestionById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const question =
            await getExamQuestionByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Exam question retrieved successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateExamQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const question =
            await updateExamQuestionService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Exam question updated successfully",
            data: question,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteExamQuestion = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await deleteExamQuestionService(id);

        return res.status(200).json({
            success: true,
            message: "Exam question deleted successfully",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const createExamOption = async (
    req: Request,
    res: Response
) => {
    try {
        const option =
            await createExamOptionService(req.body);

        return res.status(201).json({
            success: true,
            message: "Exam option created successfully",
            data: option,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getExamOptionsByQuestionId = async (
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
            await getExamOptionsByQuestionIdService(questionId);

        return res.status(200).json({
            success: true,
            message: "Exam options retrieved successfully",
            data: options,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateExamOption = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        const option =
            await updateExamOptionService(
                id,
                req.body
            );

        return res.status(200).json({
            success: true,
            message: "Exam option updated successfully",
            data: option,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteExamOption = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        await deleteExamOptionService(id);

        return res.status(200).json({
            success: true,
            message: "Exam option deleted successfully",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
