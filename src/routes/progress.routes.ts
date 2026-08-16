import { Router } from "express";
import { getCourseProgress, submitProgress } from "../controllers/progress.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Semua rute progress memerlukan autentikasi
router.use(authMiddleware);

router.get("/courses/:courseId", getCourseProgress);
router.post("/:itemType/:itemId", submitProgress);

export default router;
