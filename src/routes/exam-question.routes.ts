import { Router } from "express";

import {
    createExamQuestion,
    getExamQuestions,
    getExamQuestionById,
    updateExamQuestion,
    deleteExamQuestion,
    createExamOption,
    getExamOptionsByQuestionId,
    updateExamOption,
    deleteExamOption,
} from "../controllers/exam-question.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createExamQuestionSchema,
    updateExamQuestionSchema,
    createExamOptionSchema,
    updateExamOptionSchema,
} from "../validators/exam-question.validator";

const router = Router();

/*
|--------------------------------------------------------------------------
| Exam Questions
|--------------------------------------------------------------------------
*/

// Create question
router.post(
    "/questions",
    authMiddleware,
    adminMiddleware,
    validate(createExamQuestionSchema),
    createExamQuestion
);

// Get all questions in an exam
router.get(
    "/:examId/questions",
    getExamQuestions
);

// Get question by ID
router.get(
    "/questions/:id",
    getExamQuestionById
);

// Update question
router.put(
    "/questions/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateExamQuestionSchema),
    updateExamQuestion
);

// Delete question
router.delete(
    "/questions/:id",
    authMiddleware,
    adminMiddleware,
    deleteExamQuestion
);

/*
|--------------------------------------------------------------------------
| Exam Options
|--------------------------------------------------------------------------
*/

// Get options by question
router.get(
    "/options/question/:questionId",
    getExamOptionsByQuestionId
);

// Create option
router.post(
    "/options",
    authMiddleware,
    adminMiddleware,
    validate(createExamOptionSchema),
    createExamOption
);

// Update option
router.put(
    "/options/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateExamOptionSchema),
    updateExamOption
);

// Delete option
router.delete(
    "/options/:id",
    authMiddleware,
    adminMiddleware,
    deleteExamOption
);

export default router;
