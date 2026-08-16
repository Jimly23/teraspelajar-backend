import { prisma } from "../config/database";
import {
    CreateExamQuestionData,
    UpdateExamQuestionData,
    CreateExamOptionData,
    UpdateExamOptionData,
} from "../models/exam-question.model";

export const createExamQuestion = async (
    data: CreateExamQuestionData
) => {
    return prisma.examQuestion.create({
        data: {
            examId: data.examId,
            question: data.question,
            order: data.order,
        },
        include: {
            options: true,
        },
    });
};

export const findAllQuestionsByExamId = async (
    examId: number
) => {
    return prisma.examQuestion.findMany({
        where: {
            examId,
        },
        include: {
            options: true,
        },
        orderBy: {
            order: "asc",
        },
    });
};

export const findQuestionById = async (
    id: number
) => {
    return prisma.examQuestion.findUnique({
        where: {
            id,
        },
        include: {
            options: true,
        },
    });
};

export const updateExamQuestion = async (
    id: number,
    data: UpdateExamQuestionData
) => {
    return prisma.examQuestion.update({
        where: {
            id,
        },
        data,
        include: {
            options: true,
        },
    });
};

export const deleteExamQuestion = async (
    id: number
) => {
    return prisma.examQuestion.delete({
        where: {
            id,
        },
    });
};

export const createExamOption = async (
    data: CreateExamOptionData
) => {
    return prisma.examOption.create({
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
    return prisma.examOption.findMany({
        where: {
            questionId,
        },
    });
};

export const findOptionById = async (
    id: number
) => {
    return prisma.examOption.findUnique({
        where: {
            id,
        },
    });
};

export const updateExamOption = async (
    id: number,
    data: UpdateExamOptionData
) => {
    return prisma.examOption.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteExamOption = async (
    id: number
) => {
    return prisma.examOption.delete({
        where: {
            id,
        },
    });
};
