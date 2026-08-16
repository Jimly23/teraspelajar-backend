import {
    createCourse,
    findCourseBySlug,
    findCourseDetailBySlug,
    findAllCourses,
    findCourseById,
    deleteCourse,
    updateCourse,
    findCourseDetailById,
} from "../repositories/course.repository";

import { CreateCourseInput, UpdateCourseInput } from "../validators/course.validator";

export const createCourseService = async (
    data: CreateCourseInput
) => {
    const existingCourse = await findCourseBySlug(data.slug);

    if (existingCourse) {
        throw new Error("Course slug already exists");
    }

    const course = await createCourse({
        ...data,
        category: data.category ?? undefined,
    });

    return course;
};

export const getAllCoursesService = async (category?: string) => {
    const courses = await findAllCourses(category);

    return courses;
};

export const getCourseByIdService = async (id: number) => {
    const course = await findCourseById(id);

    if (!course) {
        throw new Error("Course not found");
    }

    return course;
};

export const getCourseBySlugService = async (slug: string) => {
    const course = await findCourseBySlug(slug);

    if (!course) {
        throw new Error("Course not found");
    }

    return course;
};

export const getCourseDetailBySlugService = async (slug: string) => {
    const course = await findCourseDetailBySlug(slug);

    if (!course) {
        throw new Error("Course not found");
    }

    return course;
};

export const updateCourseService = async (
    id: number,
    data: UpdateCourseInput
) => {
    const existingCourse = await findCourseById(id);

    if (!existingCourse) {
        throw new Error("Course not found");
    }

    if (data.slug && data.slug !== existingCourse.slug) {
        const courseWithSameSlug = await findCourseBySlug(data.slug);

        if (courseWithSameSlug) {
            throw new Error("Course slug already exists");
        }
    }

    const updatedCourse = await updateCourse(id, data);

    return updatedCourse;
};

export const getCourseDetailByIdService = async (id: number) => {
    const course = await findCourseDetailById(id);

    if (!course) {
        throw new Error("Course not found");
    }

    return course;
};

export const deleteCourseService = async (id: number) => {
    const course = await findCourseById(id);

    if (!course) {
        throw new Error("Course not found");
    }

    await deleteCourse(id);
};