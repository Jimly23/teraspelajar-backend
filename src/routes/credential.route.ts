import { Router } from "express";
import * as credentialController from "../controllers/credential.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Student routes
router.get("/my", authMiddleware, credentialController.getMyCredentials);
router.get("/:credentialId", authMiddleware, credentialController.getCredentialById);
router.post("/:credentialId/retry-blockchain", authMiddleware, credentialController.retryBlockchainIssue);

export default router;
