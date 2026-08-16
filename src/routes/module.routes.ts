import { Router } from "express";

import {
    createModule,
    getAllModules,
    getModulesByCourseId,
    getModuleById,
    updateModule,
    deleteModule,
} from "../controllers/module.controller";

import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";

import {
    createModuleSchema,
    updateModuleSchema,
} from "../validators/module.validator";

const router = Router();

// Public read
router.get("/", getAllModules);
router.get("/course/:courseId", getModulesByCourseId);
router.get("/:id", getModuleById);

// Admin only
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validate(createModuleSchema),
    createModule
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validate(updateModuleSchema),
    updateModule
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteModule
);

export default router;