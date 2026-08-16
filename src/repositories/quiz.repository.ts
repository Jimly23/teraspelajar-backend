import { prisma } from "../config/database";
import { CreateQuizData } from "../models/quiz.model";
import { UpdateQuizInput } from "../validators/quiz.validator";

export const createQuiz = async (
    data: CreateQuizData
) => {
    return prisma.quiz.create({
        data: {
            moduleId: data.moduleId,
            title: data.title,
            description: data.description,
            passingScore: data.passingScore,
        },
    });
};

export const findAllQuizzes = async () => {
    return prisma.quiz.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findQuizzesByModuleId = async (
    moduleId: number
) => {
    return prisma.quiz.findMany({
        where: {
            moduleId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
};

export const findQuizById = async (
    id: number
) => {
    return prisma.quiz.findUnique({
        where: {
            id,
        },
    });
};

export const updateQuiz = async (
    id: number,
    data: UpdateQuizInput
) => {
    return prisma.quiz.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteQuiz = async (
    id: number
) => {
    return prisma.quiz.delete({
        where: {
            id,
        },
    });
};