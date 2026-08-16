import { Request, Response, NextFunction } from "express";

import { createCourseService, deleteCourseService, getAllCoursesService, getCourseByIdService, getCourseBySlugService, getCourseDetailBySlugService, getCourseDetailByIdService, updateCourseService } from "../services/course.service";

export const createCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const course = await createCourseService(req.body);

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });
    } catch (error) {
        next(error);
    }
};


export const getAllCourses = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = req.query.category as string | undefined;
        const courses = await getAllCoursesService(category);

        return res.status(200).json({
            success: true,
            message: "Courses retrieved successfully",
            data: courses,
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const course = await getCourseByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Course retrieved successfully",
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const slug = req.params.slug;

        if (typeof slug !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid course slug",
            });
        }

        const course = await getCourseBySlugService(slug);

        return res.status(200).json({
            success: true,
            message: "Course retrieved successfully",
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        await deleteCourseService(id);

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const updateCourse = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const course = await updateCourseService(id, req.body);

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
        });
    } catch (error) {
        next(error);
    }
};

export const getCourseDetailById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID",
            });
        }

        const course = await getCourseDetailByIdService(id);

        return res.status(200).json({
            success: true,
            message: "Course detail retrieved successfully",
            data: course,
        });

    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Course not found"
        ) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        next(error);
    }
}

export const getCourseDetailBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const slug = req.params.slug;

        if (typeof slug !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid course slug",
            });
        }

        const course = await getCourseDetailBySlugService(slug);

        return res.status(200).json({
            success: true,
            message: "Course detail retrieved successfully",
            data: course,
        });

    } catch (error) {

        if (
            error instanceof Error &&
            error.message === "Course not found"
        ) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to retrieve course detail",
        });
    }
}