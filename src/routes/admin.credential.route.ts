import { Router } from "express";
import * as credentialController from "../controllers/credential.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, credentialController.getAllAdminCredentials);
router.put("/:credentialId/revoke", authMiddleware, credentialController.revokeCredential);

export default router;
