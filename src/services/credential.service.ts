import { prisma } from "../config/database";
import { generateCertificatePDF } from "../utils/pdf.util";
import { calculatePdfHash, hashToHex } from "../utils/hash.util";
import { issueCredentialOnChain, revokeCredentialOnChain } from "./blockchain/solana.service";
import { generateVerificationQR } from "../utils/qrcode.util";
import path from "path";

export const issueCredential = async (userId: number, courseId: number, score: number) => {
    // Check existing
    const existing = await prisma.credential.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId
            }
        },
        include: {
            certificate: true
        }
    });

    if (existing) {
        return existing;
    }

    // Fetch user and course info
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const course = await prisma.course.findUnique({ where: { id: courseId } });

    if (!user || !course) {
        throw new Error("User or Course not found");
    }

    const timestamp = Date.now();
    const cleanUserName = user.name.toUpperCase().replace(/\s+/g, "");
    
    // Generate IDs
    const credentialId = `SFL-${userId}-${courseId}-${cleanUserName}-${timestamp}`;
    const certificateNumber = `CERT-${new Date().getFullYear()}-${timestamp}`;
    const issuedAt = new Date();

    // Generate QR code for verification URL (before PDF, so QR is embedded in final PDF)
    const qrCodeBuffer = await generateVerificationQR(credentialId);

    // Generate PDF with QR code embedded
    const relativePdfPath = await generateCertificatePDF(
        user.name,
        course.title,
        score,
        credentialId,
        certificateNumber,
        issuedAt,
        qrCodeBuffer
    );

    // Calculate SHA-256 hash of the generated PDF
    const absolutePdfPath = path.join(__dirname, "../../public", relativePdfPath);
    const certificateHash = await calculatePdfHash(absolutePdfPath);
    const certificateHashHex = hashToHex(certificateHash);

    console.log(`[Credential] Certificate hash: ${certificateHashHex}`);

    // Try to issue credential to Solana blockchain
    let blockchainData: {
        certificateHash: string;
        blockchainNetwork: string;
        blockchainProgramId: string;
        blockchainPda: string;
        blockchainTxSignature: string;
        blockchainStatus: string;
        blockchainIssuedAt: Date;
    } | null = null;

    try {
        const issuedAtUnix = Math.floor(issuedAt.getTime() / 1000);
        const result = await issueCredentialOnChain(
            credentialId,
            String(courseId),
            course.title,
            score,
            certificateHash,
            issuedAtUnix
        );

        blockchainData = {
            certificateHash: certificateHashHex,
            blockchainNetwork: result.network,
            blockchainProgramId: result.programId,
            blockchainPda: result.pda,
            blockchainTxSignature: result.transactionSignature,
            blockchainStatus: result.status,
            blockchainIssuedAt: result.issuedAt,
        };

        console.log(`[Credential] Blockchain issued successfully. PDA: ${result.pda}`);
    } catch (error) {
        console.error("[Credential] Blockchain issue failed, saving with PENDING status:", error);
        // Save hash even if blockchain fails, so we can retry later
        blockchainData = {
            certificateHash: certificateHashHex,
            blockchainNetwork: "",
            blockchainProgramId: "",
            blockchainPda: "",
            blockchainTxSignature: "",
            blockchainStatus: "PENDING",
            blockchainIssuedAt: issuedAt,
        };
    }

    // Save to database
    const credential = await prisma.credential.create({
        data: {
            credentialId,
            userId,
            courseId,
            score,
            issuedAt,
            certificate: {
                create: {
                    userId,
                    courseId,
                    certificateNumber,
                    certificateUrl: relativePdfPath,
                    issuedAt,
                    // Blockchain fields
                    ...(blockchainData || {}),
                }
            }
        },
        include: {
            certificate: true,
            course: true,
            user: {
                select: { id: true, name: true, email: true }
            }
        }
    });

    return credential;
};

export const retryBlockchainIssue = async (credentialId: string, userId: number) => {
    // Fetch credential with certificate
    const credential = await prisma.credential.findUnique({
        where: { credentialId },
        include: {
            certificate: true,
            course: true,
            user: { select: { id: true, name: true, email: true } }
        }
    });

    if (!credential) {
        throw new Error("Credential not found");
    }

    if (credential.userId !== userId) {
        throw new Error("Forbidden");
    }

    if (!credential.certificate) {
        throw new Error("Certificate not found");
    }

    // Check if already issued on blockchain
    if (credential.certificate.blockchainStatus === "ACTIVE") {
        throw new Error("Credential already issued on blockchain");
    }

    // Re-calculate hash from the actual PDF
    const absolutePdfPath = path.join(__dirname, "../../public", credential.certificate.certificateUrl);
    const certificateHash = await calculatePdfHash(absolutePdfPath);
    const certificateHashHex = hashToHex(certificateHash);

    const issuedAtUnix = Math.floor(credential.issuedAt.getTime() / 1000);

    try {
        const result = await issueCredentialOnChain(
            credential.credentialId,
            String(credential.courseId),
            credential.course.title,
            credential.score,
            certificateHash,
            issuedAtUnix
        );

        // Update certificate with blockchain data
        await prisma.certificate.update({
            where: { id: credential.certificate.id },
            data: {
                certificateHash: certificateHashHex,
                blockchainNetwork: result.network,
                blockchainProgramId: result.programId,
                blockchainPda: result.pda,
                blockchainTxSignature: result.transactionSignature,
                blockchainStatus: result.status,
                blockchainIssuedAt: result.issuedAt,
            }
        });

        return {
            credentialId: credential.credentialId,
            blockchain: {
                network: result.network,
                programId: result.programId,
                pda: result.pda,
                transactionSignature: result.transactionSignature,
                status: result.status,
            }
        };
    } catch (error) {
        // Update status to FAILED
        await prisma.certificate.update({
            where: { id: credential.certificate.id },
            data: {
                certificateHash: certificateHashHex,
                blockchainStatus: "FAILED",
            }
        });

        throw error;
    }
};

export const getMyCredentials = async (userId: number) => {
    return prisma.credential.findMany({
        where: { userId },
        include: {
            course: true,
            certificate: true
        },
        orderBy: { issuedAt: "desc" }
    });
};

export const getCredentialById = async (credentialId: string) => {
    return prisma.credential.findUnique({
        where: { credentialId },
        include: {
            course: true,
            user: {
                select: { id: true, name: true, email: true }
            },
            certificate: true
        }
    });
};

export const getAllCredentials = async () => {
    return prisma.credential.findMany({
        include: {
            course: true,
            user: {
                select: { id: true, name: true, email: true }
            },
            certificate: true
        },
        orderBy: { issuedAt: "desc" }
    });
};

export const getAllCertificates = async () => {
    return prisma.certificate.findMany({
        include: {
            course: true,
            user: {
                select: { id: true, name: true, email: true }
            },
            credential: true
        },
        orderBy: { issuedAt: "desc" }
    });
};

export const revokeCredential = async (credentialId: string) => {
    const cred = await prisma.credential.update({
        where: { credentialId },
        data: { status: "REVOKED" },
        include: { certificate: true }
    });

    if (cred.certificate) {
        // Revoke on blockchain if PDA exists
        if (cred.certificate.blockchainPda && cred.certificate.blockchainStatus === "ACTIVE") {
            try {
                await revokeCredentialOnChain(cred.certificate.blockchainPda);
                console.log(`[Credential] Blockchain credential revoked for ${credentialId}`);
            } catch (error) {
                console.error(`[Credential] Failed to revoke on blockchain:`, error);
            }
        }

        await prisma.certificate.update({
            where: { id: cred.certificate.id },
            data: {
                status: "REVOKED",
                blockchainStatus: "REVOKED",
            }
        });
    }
    return cred;
};
