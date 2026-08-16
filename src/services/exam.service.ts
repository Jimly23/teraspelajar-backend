import {
    createExam,
    findAllExams,
    findExamById,
    findExamsByCourseId,
    updateExam,
    deleteExam,
} from "../repositories/exam.repository";

import {
    CreateExamInput,
    UpdateExamInput,
} from "../validators/exam.validator";

import { findCourseById } from "../repositories/course.repository";

export const createExamService = async (
    data: CreateExamInput
) => {
    const course = await findCourseById(data.courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const exam = await createExam(data);

    return exam;
};

export const getAllExamsService = async () => {
    const exams = await findAllExams();

    return exams;
};

export const getExamByIdService = async (
    id: number
) => {
    const exam = await findExamById(id);

    if (!exam) {
        throw new Error("Exam not found");
    }

    return exam;
};

export const getExamsByCourseIdService = async (
    courseId: number
) => {
    const course = await findCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const exams = await findExamsByCourseId(courseId);

    return exams;
};

export const updateExamService = async (
    id: number,
    data: UpdateExamInput
) => {
    const existingExam = await findExamById(id);

    if (!existingExam) {
        throw new Error("Exam not found");
    }

    if (data.courseId) {
        const course = await findCourseById(data.courseId);

        if (!course) {
            throw new Error("Course not found");
        }
    }

    const updatedExam = await updateExam(
        id,
        data
    );

    return updatedExam;
};

export const deleteExamService = async (
    id: number
) => {
    const existingExam = await findExamById(id);

    if (!existingExam) {
        throw new Error("Exam not found");
    }

    await deleteExam(id);
};