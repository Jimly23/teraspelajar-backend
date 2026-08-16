import {
    createModule,
    findAllModules,
    findModulesByCourseId,
    findModuleById,
    updateModule,
    deleteModule,
} from "../repositories/module.repository";

import { prisma } from "../config/database";

import {
    CreateModuleInput,
    UpdateModuleInput,
} from "../validators/module.validator";

export const createModuleService = async (
    data: CreateModuleInput
) => {
    const course = await prisma.course.findUnique({
        where: {
            id: data.courseId,
        },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    const module = await createModule(data);

    return module;
};

export const getAllModulesService = async () => {
    const modules = await findAllModules();

    return modules;
};

export const getModulesByCourseIdService = async (
    courseId: number
) => {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
    });

    if (!course) {
        throw new Error("Course not found");
    }

    const modules = await findModulesByCourseId(courseId);

    return modules;
};

export const getModuleByIdService = async (
    id: number
) => {
    const module = await findModuleById(id);

    if (!module) {
        throw new Error("Module not found");
    }

    return module;
};

export const updateModuleService = async (
    id: number,
    data: UpdateModuleInput
) => {
    const existingModule = await findModuleById(id);

    if (!existingModule) {
        throw new Error("Module not found");
    }

    const updatedModule = await updateModule(id, data);

    return updatedModule;
};

export const deleteModuleService = async (
    id: number
) => {
    const existingModule = await findModuleById(id);

    if (!existingModule) {
        throw new Error("Module not found");
    }

    await deleteModule(id);
};