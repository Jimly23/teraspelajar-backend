import { Router } from "express";

import {
    register,
    login,
    me,
    logout,
    verifyEmail,
    resendVerification,
} from "../controllers/auth.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

import { validate } from "../middlewares/validate.middleware";

import {
    registerSchema,
    loginSchema,
    resendVerificationSchema,
} from "../validators/auth.validator";

const router = Router();

router.post(
    "/register",
    validate(registerSchema),
    register
);

router.post(
    "/login",
    validate(loginSchema),
    login
);

router.get(
    "/me",
    authMiddleware,
    me
);

router.post(
    "/logout",
    authMiddleware,
    logout
);

router.get(
    "/verify-email",
    verifyEmail
);

router.post(
    "/resend-verification",
    validate(resendVerificationSchema),
    resendVerification
);

export default router;