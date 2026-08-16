import { prisma } from "../config/database";
import { CreateCourseData } from "../models/course.model";
import { UpdateCourseInput } from "../validators/course.validator";

export const createCourse = async (data: CreateCourseData) => {
    return prisma.course.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            thumbnail: data.thumbnail,
            level: data.level,
            status: data.status,
            category: data.category,
        },
    });
};

export const findCourseBySlug = async (slug: string) => {
    return prisma.course.findUnique({
        where: {
            slug,
        },
    });
};

export const findCourseDetailBySlug = async (slug: string) => {
    return prisma.course.findUnique({
        where: {
            slug,
        },
        include: {
            modules: {
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
            },
            exams: true,
        },
    });
};

export const findCourseDetailById = async (id: number) => {
    return prisma.course.findUnique({
        where: {
            id,
        },
        include: {
            modules: {
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
            },
            exams: true,
        },
    });
};

export const findAllCourses = async (category?: string) => {
    return prisma.course.findMany({
        where: category ? { category } : undefined,
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const findCourseById = async (id: number) => {
    return prisma.course.findUnique({
        where: {
            id,
        },
    });
};

export const deleteCourse = async (id: number) => {
    return prisma.course.delete({
        where: {
            id,
        },
    });
};

export const updateCourse = async (
    id: number,
    data: UpdateCourseInput
) => {
    return prisma.course.update({
        where: {
            id,
        },
        data,
    });
};