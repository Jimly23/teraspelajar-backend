import { Router } from "express";

import {
    createLesson,
    getAllLessons,
    getLessonsByModuleId,
    getLessonById,
    updateLesson,
    deleteLesson,
} from "../controllers/lesson.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createLessonSchema,
    updateLessonSchema,
} from "../validators/lesson.validator";

const router = Router();

// Public read
router.get("/", getAllLessons);

router.get(
    "/module/:moduleId",
    getLessonsByModuleId
);

router.get(
    "/:id",
    getLessonById
);

// Admin only
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createLessonSchema),
    createLesson
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateLessonSchema),
    updateLesson
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteLesson
);

export default router;