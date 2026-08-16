import { prisma } from "../config/database";

import {
    createQuiz,
    findAllQuizzes,
    findQuizzesByModuleId,
    findQuizById,
    updateQuiz,
    deleteQuiz,
} from "../repositories/quiz.repository";

import {
    CreateQuizInput,
    UpdateQuizInput,
} from "../validators/quiz.validator";

export const createQuizService = async (
    data: CreateQuizInput
) => {
    const module = await prisma.module.findUnique({
        where: {
            id: data.moduleId,
        },
    });

    if (!module) {
        throw new Error("Module not found");
    }

    const quiz = await createQuiz(data);

    return quiz;
};

export const getAllQuizzesService = async () => {
    const quizzes = await findAllQuizzes();

    return quizzes;
};

export const getQuizzesByModuleIdService = async (
    moduleId: number
) => {
    const module = await prisma.module.findUnique({
        where: {
            id: moduleId,
        },
    });

    if (!module) {
        throw new Error("Module not found");
    }

    const quizzes =
        await findQuizzesByModuleId(moduleId);

    return quizzes;
};

export const getQuizByIdService = async (
    id: number
) => {
    const quiz = await findQuizById(id);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    return quiz;
};

export const updateQuizService = async (
    id: number,
    data: UpdateQuizInput
) => {
    const existingQuiz = await findQuizById(id);

    if (!existingQuiz) {
        throw new Error("Quiz not found");
    }

    const updatedQuiz = await updateQuiz(
        id,
        data
    );

    return updatedQuiz;
};

export const deleteQuizService = async (
    id: number
) => {
    const existingQuiz = await findQuizById(id);

    if (!existingQuiz) {
        throw new Error("Quiz not found");
    }

    await deleteQuiz(id);
};