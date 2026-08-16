import { Request, Response } from "express";

import {
    createExamService,
    getAllExamsService,
    getExamByIdService,
    getExamsByCourseIdService,
    updateExamService,
    deleteExamService,
} from "../services/exam.service";

export const createExam = async (
    req: Request,
    res: Response
) => {
    try {
        const exam = await createExamService(req.body);

        return res.status(201).json({
            success: true,
            message: "Exam created successfully",
            data: exam,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllExams = async (
    req: Request,
    res: Response
) => {
    try {
        const exams = await getAllExamsService();

        return res.status(200).json({
            success: true,
            message: "Exams retrieved successfully",
            data: exams,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getExamById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID",
            });
        }

        const exam = await getExamByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Exam retrieved successfully",
            data: exam,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const getExamsByCourseId = async (
    req: Request,
    res: Response
) => {
    try {
        const courseId = Number(req.params.courseId);

        if (isNaN(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const exams =
            await getExamsByCourseIdService(courseId);

        return res.status(200).json({
            success: true,
            message: "Course exams retrieved successfully",
            data: exams,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateExam = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID",
            });
        }

        const exam = await updateExamService(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Exam updated successfully",
            data: exam,
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteExam = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid exam ID",
            });
        }

        await deleteExamService(id);

        return res.status(200).json({
            success: true,
            message: "Exam deleted successfully",
        });
    } catch (error: any) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};