import { Router } from "express";
import * as credentialController from "../controllers/credential.controller";

const router = Router();

// Public route - no auth required
router.get("/:credentialId", credentialController.verifyCredential);

export default router;
