import { prisma } from "../config/database";
import { CreateExamData } from "../models/exam.model";
import { UpdateExamInput } from "../validators/exam.validator";

export const createExam = async (data: CreateExamData) => {
    return prisma.exam.create({
        data: {
            courseId: data.courseId,
            title: data.title,
            description: data.description,
            duration: data.duration,
            passingScore: data.passingScore,
        },
    });
};

export const findAllExams = async () => {
    return prisma.exam.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findExamById = async (id: number) => {
    return prisma.exam.findUnique({
        where: {
            id,
        },
    });
};

export const findExamsByCourseId = async (courseId: number) => {
    return prisma.exam.findMany({
        where: {
            courseId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });
};

export const updateExam = async (
    id: number,
    data: UpdateExamInput
) => {
    return prisma.exam.update({
        where: {
            id,
        },
        data,
    });
};

export const deleteExam = async (id: number) => {
    return prisma.exam.delete({
        where: {
            id,
        },
    });
};