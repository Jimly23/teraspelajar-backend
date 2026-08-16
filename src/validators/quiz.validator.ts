import { z } from "zod";

export const createQuizSchema = z.object({
    moduleId: z
        .number()
        .int()
        .positive(),

    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must not exceed 255 characters"),

    description: z
        .string()
        .optional(),

    passingScore: z
        .number()
        .int()
        .min(0, "Passing score must be at least 0")
        .max(100, "Passing score must be at most 100")
        .optional(),
});

export const updateQuizSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must not exceed 255 characters")
        .optional(),

    description: z
        .string()
        .optional(),

    passingScore: z
        .number()
        .int()
        .min(0, "Passing score must be at least 0")
        .max(100, "Passing score must be at most 100")
        .optional(),
});

export type CreateQuizInput =
    z.infer<typeof createQuizSchema>;

export type UpdateQuizInput =
    z.infer<typeof updateQuizSchema>;