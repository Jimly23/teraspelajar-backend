import { prisma } from "../config/database";
import { CreateModuleData } from "../models/module.model";
import { UpdateModuleInput } from "../validators/module.validator";

export const createModule = async (data: CreateModuleData) => {
    return prisma.module.create({
        data: {
            courseId: data.courseId,
            title: data.title,
            description: data.description,
            order: data.order,
        },
    });
};

export const findAllModules = async () => {
    return prisma.module.findMany({
        orderBy: {
            order: "asc",
        },
    });
};

export const findModulesByCourseId = async (courseId: number) => {
    return prisma.module.findMany({
        where: {
            courseId,
        },
        orderBy: {
            order: "asc",
        },
        include: {
            lessons: {
                orderBy: {
                    order: "asc",
                },
            },
            quizzes: true,
        },
    });
};

export const findModuleById = async (id: number) => {
    return prisma.module.findUnique({
        where: {
            id,
        },
        include: {
            lessons: {
                orderBy: {
                    order: "asc",
                },
            },
            quizzes: true,
        },
    });
};

export const updateModule = async (
    id: number,
    data: UpdateModuleInput
) => {
    return prisma.module.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteModule = async (id: number) => {
    return prisma.module.delete({
        where: {
            id,
        },
    });
};