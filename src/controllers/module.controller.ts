import { Request, Response } from "express";

import {
    createModuleService,
    getAllModulesService,
    getModulesByCourseIdService,
    getModuleByIdService,
    updateModuleService,
    deleteModuleService,
} from "../services/module.service";

export const createModule = async (
    req: Request,
    res: Response
) => {
    try {
        const module = await createModuleService(req.body);

        return res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: module,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to create module",
        });
    }
};

export const getAllModules = async (
    req: Request,
    res: Response
) => {
    try {
        const modules = await getAllModulesService();

        return res.status(200).json({
            success: true,
            message: "Modules retrieved successfully",
            data: modules,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve modules",
        });
    }
};

export const getModulesByCourseId = async (
    req: Request,
    res: Response
) => {
    try {
        const courseId = Number(req.params.courseId);

        if (isNaN(courseId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const modules =
            await getModulesByCourseIdService(courseId);

        return res.status(200).json({
            success: true,
            message: "Modules retrieved successfully",
            data: modules,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve modules",
        });
    }
};

export const getModuleById = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        const module = await getModuleByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Module retrieved successfully",
            data: module,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to retrieve module",
        });
    }
};

export const updateModule = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        const module = await updateModuleService(
            id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Module updated successfully",
            data: module,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update module",
        });
    }
};

export const deleteModule = async (
    req: Request,
    res: Response
) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid module ID",
            });
        }

        await deleteModuleService(id);

        return res.status(200).json({
            success: true,
            message: "Module deleted successfully",
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to delete module",
        });
    }
};