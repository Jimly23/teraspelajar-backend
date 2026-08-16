import { z } from "zod";

export const createQuizQuestionSchema = z.object({
    quizId: z.number().int().positive(),
    question: z.string().min(1, "Question is required"),
    order: z.number().int().positive(),
});

export const updateQuizQuestionSchema = z.object({
    question: z.string().min(1).optional(),
    order: z.number().int().positive().optional(),
});

export const createQuizOptionSchema = z.object({
    questionId: z.number().int().positive(),
    option: z.string().min(1, "Option is required"),
    isCorrect: z.boolean(),
});

export const updateQuizOptionSchema = z.object({
    option: z.string().min(1).optional(),
    isCorrect: z.boolean().optional(),
});
