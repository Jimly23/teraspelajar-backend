import QRCode from "qrcode";
import { env } from "../config/env";

/**
 * Generate a QR code PNG buffer for certificate verification.
 * The QR code contains only the public verification URL.
 * 
 * @param credentialId - The credential ID to embed in the verification URL
 * @returns PNG Buffer of the QR code
 */
export const generateVerificationQR = async (credentialId: string): Promise<Buffer> => {
    const verificationUrl = `${env.FRONTEND_URL}/verify/${credentialId}`;

    const qrBuffer = await QRCode.toBuffer(verificationUrl, {
        type: "png",
        width: 150,
        margin: 1,
        color: {
            dark: "#0f172a",
            light: "#ffffff",
        },
        errorCorrectionLevel: "M",
    });

    return qrBuffer;
};
