import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const env = {
    PORT: Number(process.env.PORT) || 3001,

    JWT_SECRET,

    JWT_EXPIRES_IN:
        process.env.JWT_EXPIRES_IN || "7d",

    DATABASE_HOST:
        process.env.DATABASE_HOST || "localhost",

    DATABASE_PORT:
        Number(process.env.DATABASE_PORT) || 3306,

    DATABASE_USER:
        process.env.DATABASE_USER || "root",

    DATABASE_PASSWORD:
        process.env.DATABASE_PASSWORD || "",

    DATABASE_NAME:
        process.env.DATABASE_NAME || "safelearn",

    // Solana Blockchain
    SOLANA_NETWORK:
        process.env.SOLANA_NETWORK || "devnet",

    SOLANA_RPC_URL:
        process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",

    SOLANA_PROGRAM_ID:
        process.env.SOLANA_PROGRAM_ID || "DE2dK5kB3dS35bLBiQ3GfSPL4SE79aChJ6Dzo541VYGZ",

    SOLANA_ISSUER_PRIVATE_KEY:
        process.env.SOLANA_ISSUER_PRIVATE_KEY || "",

    SOLANA_COMMITMENT:
        process.env.SOLANA_COMMITMENT || "confirmed",

    FRONTEND_URL:
        process.env.FRONTEND_URL || "http://localhost:3000",

    RESEND_API_KEY:
        process.env.RESEND_API_KEY || "",

    MAIL_FROM:
        process.env.MAIL_FROM || "Teras Pelajar <admin@teraspelajar.com>",
};