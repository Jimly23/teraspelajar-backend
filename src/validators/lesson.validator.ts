import { z } from "zod";

export const createLessonSchema = z.object({
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

    content: z
        .string()
        .optional(),

    videoUrl: z
        .string()
        .url("Video URL must be a valid URL")
        .optional(),

    order: z
        .number()
        .int()
        .positive(),
});

export const updateLessonSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must not exceed 255 characters")
        .optional(),

    description: z
        .string()
        .optional(),

    content: z
        .string()
        .optional(),

    videoUrl: z
        .string()
        .url("Video URL must be a valid URL")
        .nullable()
        .optional(),

    order: z
        .number()
        .int()
        .positive()
        .optional(),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;

export type UpdateLessonInput = z.infer<typeof updateLessonSchema>;