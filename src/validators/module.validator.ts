import { z } from "zod";

export const createModuleSchema = z.object({
    courseId: z.number().int().positive(),

    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must not exceed 255 characters"),

    description: z
        .string()
        .optional(),

    order: z
        .number()
        .int()
        .positive(),
});

export const updateModuleSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(255, "Title must not exceed 255 characters")
        .optional(),

    description: z
        .string()
        .optional(),

    order: z
        .number()
        .int()
        .positive()
        .optional(),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;