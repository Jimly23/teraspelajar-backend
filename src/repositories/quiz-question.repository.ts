import { prisma } from "../config/database";

import {
    CreateQuizQuestionData,
    UpdateQuizQuestionData,
    CreateQuizOptionData,
    UpdateQuizOptionData,
} from "../models/quiz-question.model";

export const createQuizQuestion = async (
    data: CreateQuizQuestionData
) => {
    return prisma.quizQuestion.create({
        data: {
            quizId: data.quizId,
            question: data.question,
            order: data.order,
        },
        include: {
            options: true,
        },
    });
};

export const findAllQuestionsByQuizId = async (
    quizId: number
) => {
    return prisma.quizQuestion.findMany({
        where: {
            quizId,
        },
        include: {
            options: true,
        },
        orderBy: {
            order: "asc",
        },
    });
};

export const findQuizQuestionById = async (
    id: number
) => {
    return prisma.quizQuestion.findUnique({
        where: {
            id,
        },
        include: {
            options: true,
        },
    });
};

export const updateQuizQuestion = async (
    id: number,
    data: UpdateQuizQuestionData
) => {
    return prisma.quizQuestion.update({
        where: {
            id,
        },
        data,
        include: {
            options: true,
        },
    });
};

export const deleteQuizQuestion = async (
    id: number
) => {
    return prisma.quizQuestion.delete({
        where: {
            id,
        },
    });
};

export const createQuizOption = async (
    data: CreateQuizOptionData
) => {
    return prisma.quizOption.create({
        data: {
            questionId: data.questionId,
            option: data.option,
            isCorrect: data.isCorrect,
        },
    });
};

export const findAllOptionsByQuestionId = async (
    questionId: number
) => {
    return prisma.quizOption.findMany({
        where: {
            questionId,
        },
    });
};

export const findQuizOptionById = async (
    id: number
) => {
    return prisma.quizOption.findUnique({
        where: {
            id,
        },
    });
};

export const updateQuizOption = async (
    id: number,
    data: UpdateQuizOptionData
) => {
    return prisma.quizOption.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteQuizOption = async (
    id: number
) => {
    return prisma.quizOption.delete({
        where: {
            id,
        },
    });
};
