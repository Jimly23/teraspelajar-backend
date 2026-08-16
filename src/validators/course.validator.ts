import { z } from "zod";

export const createCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must not exceed 255 characters"),

    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters")
        .max(255, "Slug must not exceed 255 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug can only contain lowercase letters, numbers, and hyphens"
        ),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters"),

    thumbnail: z
        .string()
        .url("Thumbnail must be a valid URL")
        .optional(),

    level: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
        .optional(),

    status: z
        .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .optional(),
        
    category: z
        .string()
        .max(100, "Category must not exceed 100 characters")
        .nullable()
        .optional(),
});

export const updateCourseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(255, "Title must not exceed 255 characters")
        .optional(),

    slug: z
        .string()
        .trim()
        .min(3, "Slug must be at least 3 characters")
        .max(255, "Slug must not exceed 255 characters")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug can only contain lowercase letters, numbers, and hyphens"
        )
        .optional(),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .optional(),

    thumbnail: z
        .string()
        .url("Thumbnail must be a valid URL")
        .nullable()
        .optional(),

    level: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
        .optional(),

    status: z
        .enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
        .optional(),
        
    category: z
        .string()
        .max(100, "Category must not exceed 100 characters")
        .nullable()
        .optional(),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;