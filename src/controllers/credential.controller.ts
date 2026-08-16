import { Request, Response } from "express";
import * as credentialService from "../services/credential.service";
import { fetchCredentialOnChain } from "../services/blockchain/solana.service";
import { hexToBuffer } from "../utils/hash.util";


export const getMyCredentials = async (req: any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const credentials = await credentialService.getMyCredentials(userId);
        res.json({ success: true, data: credentials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch credentials" });
    }
};

export const getCredentialById = async (req: any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const credentialId = req.params.credentialId;

        const credential = await credentialService.getCredentialById(credentialId);

        if (!credential) {
            res.status(404).json({ success: false, message: "Credential not found" });
            return;
        }

        // Only owner or admin can view detail (unless it's public verification, which is another endpoint)
        if (credential.userId !== userId && req.user?.role !== "admin") {
            res.status(403).json({ success: false, message: "Forbidden" });
            return;
        }

        res.json({ success: true, data: credential });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch credential" });
    }
};

export const verifyCredential = async (req: Request, res: Response): Promise<void> => {
    try {
        const credentialId = req.params.credentialId as string;
        const credential = await credentialService.getCredentialById(credentialId);

        // NOT_FOUND: credential does not exist in database
        if (!credential) {
            res.status(404).json({
                success: true,
                data: {
                    status: "NOT_FOUND",
                    verified: false,
                    credential: null,
                },
            });
            return;
        }

        // REVOKED: credential is revoked in database
        if (credential.status === "REVOKED") {
            res.json({
                success: true,
                data: {
                    status: "REVOKED",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate?.certificateNumber || null,
                        issuedAt: credential.issuedAt,
                        blockchain: credential.certificate?.blockchainPda ? {
                            network: credential.certificate.blockchainNetwork,
                            programId: credential.certificate.blockchainProgramId,
                            pda: credential.certificate.blockchainPda,
                            transaction: credential.certificate.blockchainTxSignature,
                        } : null,
                    },
                },
            });
            return;
        }

        // Check if blockchain data is available
        if (!credential.certificate?.blockchainPda || !credential.certificate?.certificateHash) {
            res.json({
                success: true,
                data: {
                    status: "BLOCKCHAIN_UNAVAILABLE",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate?.certificateNumber || null,
                        issuedAt: credential.issuedAt,
                        blockchain: null,
                    },
                },
            });
            return;
        }

        // Fetch on-chain data
        let onChainData;
        try {
            onChainData = await fetchCredentialOnChain(credential.certificate.blockchainPda);
        } catch (error) {
            console.error("[Verify] Failed to fetch on-chain data:", error);
        }

        if (!onChainData) {
            res.json({
                success: true,
                data: {
                    status: "BLOCKCHAIN_UNAVAILABLE",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate.certificateNumber,
                        issuedAt: credential.issuedAt,
                        blockchain: {
                            network: credential.certificate.blockchainNetwork,
                            programId: credential.certificate.blockchainProgramId,
                            pda: credential.certificate.blockchainPda,
                            transaction: credential.certificate.blockchainTxSignature,
                        },
                    },
                },
            });
            return;
        }

        // Check on-chain status (Revoked)
        const onChainStatus = "active" in onChainData.status ? "ACTIVE" : "REVOKED";
        if (onChainStatus === "REVOKED") {
            res.json({
                success: true,
                data: {
                    status: "REVOKED",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate.certificateNumber,
                        issuedAt: credential.issuedAt,
                        blockchain: {
                            network: credential.certificate.blockchainNetwork,
                            programId: credential.certificate.blockchainProgramId,
                            pda: credential.certificate.blockchainPda,
                            transaction: credential.certificate.blockchainTxSignature,
                        },
                    },
                },
            });
            return;
        }

        // Compare certificate hash: database vs blockchain
        const dbHashBuffer = hexToBuffer(credential.certificate.certificateHash);
        const onChainHashBuffer = Buffer.from(onChainData.certificateHash);
        const hashMatch = dbHashBuffer.equals(onChainHashBuffer);

        if (!hashMatch) {
            res.json({
                success: true,
                data: {
                    status: "HASH_MISMATCH",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate.certificateNumber,
                        issuedAt: credential.issuedAt,
                        blockchain: {
                            network: credential.certificate.blockchainNetwork,
                            programId: credential.certificate.blockchainProgramId,
                            pda: credential.certificate.blockchainPda,
                            transaction: credential.certificate.blockchainTxSignature,
                        },
                    },
                },
            });
            return;
        }

        // Compare credentialId and score: database vs blockchain
        const credentialIdMatch = credential.credentialId === onChainData.credentialId;
        const scoreMatch = credential.score === onChainData.score;

        if (!credentialIdMatch || !scoreMatch) {
            res.json({
                success: true,
                data: {
                    status: "INVALID",
                    verified: false,
                    credential: {
                        credentialId: credential.credentialId,
                        name: credential.user.name,
                        course: credential.course.title,
                        score: credential.score,
                        certificateNumber: credential.certificate.certificateNumber,
                        issuedAt: credential.issuedAt,
                        blockchain: {
                            network: credential.certificate.blockchainNetwork,
                            programId: credential.certificate.blockchainProgramId,
                            pda: credential.certificate.blockchainPda,
                            transaction: credential.certificate.blockchainTxSignature,
                        },
                    },
                },
            });
            return;
        }

        // All checks passed — VALID
        res.json({
            success: true,
            data: {
                status: "VALID",
                verified: true,
                credential: {
                    credentialId: credential.credentialId,
                    name: credential.user.name,
                    course: credential.course.title,
                    score: credential.score,
                    certificateNumber: credential.certificate.certificateNumber,
                    issuedAt: credential.issuedAt,
                    blockchain: {
                        network: credential.certificate.blockchainNetwork,
                        programId: credential.certificate.blockchainProgramId,
                        pda: credential.certificate.blockchainPda,
                        transaction: credential.certificate.blockchainTxSignature,
                    },
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to verify credential" });
    }
};

export const getAllAdminCredentials = async (req: any, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "admin") {
            res.status(403).json({ success: false, message: "Forbidden" });
            return;
        }

        const credentials = await credentialService.getAllCredentials();
        res.json({ success: true, data: credentials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch credentials" });
    }
};

export const revokeCredential = async (req: any, res: Response): Promise<void> => {
    try {
        if (req.user?.role !== "admin") {
            res.status(403).json({ success: false, message: "Forbidden" });
            return;
        }

        const credentialId = req.params.credentialId;
        const revoked = await credentialService.revokeCredential(credentialId);
        res.json({ success: true, data: revoked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to revoke credential" });
    }
};

export const retryBlockchainIssue = async (req: any, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        const credentialId = req.params.credentialId;
        const result = await credentialService.retryBlockchainIssue(credentialId, userId);
        res.json({ success: true, data: result });
    } catch (error: any) {
        console.error(error);

        if (error.message === "Credential not found") {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        if (error.message === "Forbidden") {
            res.status(403).json({ success: false, message: error.message });
            return;
        }
        if (error.message === "Credential already issued on blockchain") {
            res.status(409).json({ success: false, message: error.message });
            return;
        }

        res.status(500).json({ success: false, message: "Failed to retry blockchain issue" });
    }
};
