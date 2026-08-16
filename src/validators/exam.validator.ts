import { z } from "zod";

export const createExamSchema = z.object({
    courseId: z
        .number()
        .int()
        .positive(),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .optional(),

    duration: z
        .number()
        .int()
        .positive()
        .optional(),

    passingScore: z
        .number()
        .int()
        .min(0)
        .max(100)
        .optional(),
});

export const updateExamSchema = z.object({
    courseId: z
        .number()
        .int()
        .positive()
        .optional(),

    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .optional(),

    description: z
        .string()
        .optional(),

    duration: z
        .number()
        .int()
        .positive()
        .optional(),

    passingScore: z
        .number()
        .int()
        .min(0)
        .max(100)
        .optional(),
});

export type CreateExamInput = z.infer<typeof createExamSchema>;

export type UpdateExamInput = z.infer<typeof updateExamSchema>;