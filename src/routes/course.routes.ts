import { Router } from "express";

import { createCourse, getAllCourses, getCourseById, getCourseBySlug, deleteCourse, updateCourse, getCourseDetailBySlug, getCourseDetailById } from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createCourseSchema, updateCourseSchema } from "../validators/course.validator";

const router = Router();

router.get(
    "/",
    getAllCourses
);

router.get("/slug/:slug", getCourseBySlug);

router.get(
    "/:id",
    getCourseById
);

router.get(
    "/:id/detail",
    getCourseDetailById
);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createCourseSchema),
    createCourse
);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateCourseSchema),
    updateCourse
);

// DELETE course - Admin only
router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCourse
);

router.get(
    "/slug/:slug/detail",
    getCourseDetailBySlug
);

export default router;