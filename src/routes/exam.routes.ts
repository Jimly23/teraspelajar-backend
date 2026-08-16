import { Router } from "express";

import {
    createExam,
    getAllExams,
    getExamById,
    getExamsByCourseId,
    updateExam,
    deleteExam,
} from "../controllers/exam.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createExamSchema,
    updateExamSchema,
} from "../validators/exam.validator";

const router = Router();

// Create exam
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createExamSchema),
    createExam
);

// Get all exams
router.get(
    "/",
    getAllExams
);

// Get exams by course
router.get(
    "/course/:courseId",
    getExamsByCourseId
);

// Get exam by ID
router.get(
    "/:id",
    getExamById
);

// Update exam
router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateExamSchema),
    updateExam
);

// Delete exam
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteExam
);

export default router;