import { prisma } from "../config/database";

export const createEnrollment = async (
    userId: number,
    courseId: number
) => {
    return prisma.enrollment.create({
        data: {
            userId,
            courseId,
        },
        include: {
            course: true,
        },
    });
};

export const findEnrollment = async (
    userId: number,
    courseId: number
) => {
    return prisma.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId,
            },
        },
    });
};

export const findEnrollmentById = async (id: number) => {
    return prisma.enrollment.findUnique({
        where: {
            id,
        },
        include: {
            course: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                },
            },
        },
    });
};

export const findEnrollmentsByUserId = async (
    userId: number
) => {
    return prisma.enrollment.findMany({
        where: {
            userId,
        },
        include: {
            course: true,
        },
        orderBy: {
            enrolledAt: "desc",
        },
    });
};

export const updateEnrollmentProgress = async (
    id: number,
    progress: number
) => {
    const isCompleted = progress >= 100;

    return prisma.enrollment.update({
        where: {
            id,
        },
        data: {
            progress,
            status: isCompleted ? "COMPLETED" : "ENROLLED",
            completedAt: isCompleted ? new Date() : null,
        },
        include: {
            course: true,
        },
    });
};

export const cancelEnrollment = async (id: number) => {
    return prisma.enrollment.update({
        where: {
            id,
        },
        data: {
            status: "CANCELLED",
        },
    });
};