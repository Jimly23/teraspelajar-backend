import { z } from "zod";

export const createEnrollmentSchema = z.object({
    courseId: z
        .number({
            error: "Course ID must be a number",
        })
        .int("Course ID must be an integer")
        .positive("Course ID must be positive"),
});

export const updateEnrollmentProgressSchema = z.object({
    progress: z
        .number({
            error: "Progress must be a number",
        })
        .int("Progress must be an integer")
        .min(0, "Progress cannot be less than 0")
        .max(100, "Progress cannot exceed 100"),
});

export type CreateEnrollmentInput = z.infer<
    typeof createEnrollmentSchema
>;

export type UpdateEnrollmentProgressInput =
    z.infer<typeof updateEnrollmentProgressSchema>;