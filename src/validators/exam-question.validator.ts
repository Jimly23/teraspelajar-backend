import { z } from "zod";

export const createExamQuestionSchema = z.object({
    examId: z.number().int().positive(),
    question: z.string().min(1, "Question is required"),
    order: z.number().int().positive(),
});

export const updateExamQuestionSchema = z.object({
    question: z.string().min(1).optional(),
    order: z.number().int().positive().optional(),
});

export const createExamOptionSchema = z.object({
    questionId: z.number().int().positive(),
    option: z.string().min(1, "Option is required"),
    isCorrect: z.boolean(),
});

export const updateExamOptionSchema = z.object({
    option: z.string().min(1).optional(),
    isCorrect: z.boolean().optional(),
});
