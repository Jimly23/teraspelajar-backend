import { Router } from "express";

import {
    createQuizQuestion,
    getQuizQuestions,
    getQuizQuestionById,
    updateQuizQuestion,
    deleteQuizQuestion,
    createQuizOption,
    getQuizOptionsByQuestionId,
    updateQuizOption,
    deleteQuizOption,
} from "../controllers/quiz-question.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createQuizQuestionSchema,
    updateQuizQuestionSchema,
    createQuizOptionSchema,
    updateQuizOptionSchema,
} from "../validators/quiz-question.validator";

const router = Router();

/*
|--------------------------------------------------------------------------
| Quiz Questions
|--------------------------------------------------------------------------
*/

// Create question
router.post(
    "/questions",
    authMiddleware,
    adminMiddleware,
    validate(createQuizQuestionSchema),
    createQuizQuestion
);

// Get all questions by quiz
router.get(
    "/:quizId/questions",
    getQuizQuestions
);

// Get question by ID
router.get(
    "/questions/:id",
    getQuizQuestionById
);

// Update question
router.put(
    "/questions/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateQuizQuestionSchema),
    updateQuizQuestion
);

// Delete question
router.delete(
    "/questions/:id",
    authMiddleware,
    adminMiddleware,
    deleteQuizQuestion
);

/*
|--------------------------------------------------------------------------
| Quiz Options
|--------------------------------------------------------------------------
*/

// Get options by question
router.get(
    "/options/question/:questionId",
    getQuizOptionsByQuestionId
);

// Create option
router.post(
    "/options",
    authMiddleware,
    adminMiddleware,
    validate(createQuizOptionSchema),
    createQuizOption
);

// Update option
router.put(
    "/options/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateQuizOptionSchema),
    updateQuizOption
);

// Delete option
router.delete(
    "/options/:id",
    authMiddleware,
    adminMiddleware,
    deleteQuizOption
);

export default router;
