import { prisma } from "../config/database";

import {
    createLesson,
    findAllLessons,
    findLessonsByModuleId,
    findLessonById,
    updateLesson,
    deleteLesson,
} from "../repositories/lesson.repository";

import {
    CreateLessonInput,
    UpdateLessonInput,
} from "../validators/lesson.validator";

export const createLessonService = async (
    data: CreateLessonInput
) => {
    const module = await prisma.module.findUnique({
        where: {
            id: data.moduleId,
        },
    });

    if (!module) {
        throw new Error("Module not found");
    }

    const lesson = await createLesson(data);

    return lesson;
};

export const getAllLessonsService = async () => {
    const lessons = await findAllLessons();

    return lessons;
};

export const getLessonsByModuleIdService = async (
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

    const lessons = await findLessonsByModuleId(moduleId);

    return lessons;
};

export const getLessonByIdService = async (
    id: number
) => {
    const lesson = await findLessonById(id);

    if (!lesson) {
        throw new Error("Lesson not found");
    }

    return lesson;
};

export const updateLessonService = async (
    id: number,
    data: UpdateLessonInput
) => {
    const existingLesson = await findLessonById(id);

    if (!existingLesson) {
        throw new Error("Lesson not found");
    }

    const updatedLesson = await updateLesson(
        id,
        data
    );

    return updatedLesson;
};

export const deleteLessonService = async (
    id: number
) => {
    const existingLesson = await findLessonById(id);

    if (!existingLesson) {
        throw new Error("Lesson not found");
    }

    await deleteLesson(id);
};