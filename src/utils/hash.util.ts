import crypto from "crypto";
import fs from "fs";

/**
 * Calculate SHA-256 hash of a PDF file.
 * Returns a 32-byte Buffer compatible with Solana's [u8; 32].
 */
export const calculatePdfHash = (filePath: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash("sha256");
        const stream = fs.createReadStream(filePath);

        stream.on("data", (data) => hash.update(data));
        stream.on("end", () => resolve(hash.digest()));
        stream.on("error", (err) => reject(err));
    });
};

/**
 * Convert a Buffer hash to hex string for database storage.
 */
export const hashToHex = (hash: Buffer): string => {
    return hash.toString("hex");
};

/**
 * Convert a hex string back to Buffer.
 */
export const hexToBuffer = (hex: string): Buffer => {
    return Buffer.from(hex, "hex");
};
