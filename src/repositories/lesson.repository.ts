import { prisma } from "../config/database";
import { CreateLessonData } from "../models/lesson.model";
import { UpdateLessonInput } from "../validators/lesson.validator";

export const createLesson = async (
    data: CreateLessonData
) => {
    return prisma.lesson.create({
        data: {
            moduleId: data.moduleId,
            title: data.title,
            description: data.description,
            content: data.content,
            videoUrl: data.videoUrl,
            order: data.order,
        },
    });
};

export const findAllLessons = async () => {
    return prisma.lesson.findMany({
        orderBy: {
            order: "asc",
        },
    });
};

export const findLessonsByModuleId = async (
    moduleId: number
) => {
    return prisma.lesson.findMany({
        where: {
            moduleId,
        },
        orderBy: {
            order: "asc",
        },
    });
};

export const findLessonById = async (
    id: number
) => {
    return prisma.lesson.findUnique({
        where: {
            id,
        },
    });
};

export const updateLesson = async (
    id: number,
    data: UpdateLessonInput
) => {
    return prisma.lesson.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteLesson = async (
    id: number
) => {
    return prisma.lesson.delete({
        where: {
            id,
        },
    });
};