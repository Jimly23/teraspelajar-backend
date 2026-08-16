import { Router } from "express";

import {
    createQuiz,
    getAllQuizzes,
    getQuizzesByModuleId,
    getQuizById,
    updateQuiz,
    deleteQuiz,
} from "../controllers/quiz.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createQuizSchema,
    updateQuizSchema,
} from "../validators/quiz.validator";

const router = Router();

// Public read
router.get(
    "/",
    getAllQuizzes
);

router.get(
    "/module/:moduleId",
    getQuizzesByModuleId
);

router.get(
    "/:id",
    getQuizById
);

// Admin only
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createQuizSchema),
    createQuiz
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateQuizSchema),
    updateQuiz
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteQuiz
);

export default router;