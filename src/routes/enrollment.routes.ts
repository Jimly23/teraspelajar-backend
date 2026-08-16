import { Router } from "express";

import {
    createEnrollment,
    getMyEnrollments,
    getEnrollmentById,
    updateEnrollmentProgress,
    cancelEnrollment,
} from "../controllers/enrollment.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createEnrollmentSchema,
    updateEnrollmentProgressSchema,
} from "../validators/enrollment.validator";

const router = Router();

router.use(authMiddleware);

// Enroll ke course
router.post(
    "/",
    validate(createEnrollmentSchema),
    createEnrollment
);

// Semua enrollment milik user yang sedang login
router.get(
    "/my",
    getMyEnrollments
);

// Detail enrollment
router.get(
    "/:id",
    getEnrollmentById
);

// Update progress
router.patch(
    "/:id/progress",
    validate(updateEnrollmentProgressSchema),
    updateEnrollmentProgress
);

// Cancel enrollment
router.patch(
    "/:id/cancel",
    cancelEnrollment
);

export default router;