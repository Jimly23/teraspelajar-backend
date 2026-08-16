import {
    createEnrollment,
    findEnrollment,
    findEnrollmentById,
    findEnrollmentsByUserId,
    updateEnrollmentProgress,
    cancelEnrollment,
} from "../repositories/enrollment.repository";

import { findCourseById } from "../repositories/course.repository";

export const createEnrollmentService = async (
    userId: number,
    courseId: number
) => {
    const course = await findCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.status !== "PUBLISHED") {
        throw new Error("Course is not available for enrollment");
    }

    const existingEnrollment = await findEnrollment(
        userId,
        courseId
    );

    if (existingEnrollment) {
        throw new Error("You are already enrolled in this course");
    }

    return createEnrollment(userId, courseId);
};

export const getEnrollmentByIdService = async (
    id: number,
    userId: number
) => {
    const enrollment = await findEnrollmentById(id);

    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    if (enrollment.userId !== userId) {
        throw new Error("You do not have access to this enrollment");
    }

    return enrollment;
};

export const getMyEnrollmentsService = async (
    userId: number
) => {
    return findEnrollmentsByUserId(userId);
};

export const updateEnrollmentProgressService = async (
    id: number,
    userId: number,
    progress: number
) => {
    const enrollment = await findEnrollmentById(id);

    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    if (enrollment.userId !== userId) {
        throw new Error("You do not have access to this enrollment");
    }

    if (enrollment.status === "CANCELLED") {
        throw new Error(
            "Cancelled enrollment cannot be updated"
        );
    }

    return updateEnrollmentProgress(id, progress);
};

export const cancelEnrollmentService = async (
    id: number,
    userId: number
) => {
    const enrollment = await findEnrollmentById(id);

    if (!enrollment) {
        throw new Error("Enrollment not found");
    }

    if (enrollment.userId !== userId) {
        throw new Error("You do not have access to this enrollment");
    }

    return cancelEnrollment(id);
};