import { Connection, Keypair, PublicKey, Commitment } from "@solana/web3.js";
import { AnchorProvider, Program, Wallet, BN } from "@coral-xyz/anchor";
import bs58 from "bs58";
import { env } from "../../config/env";
import idl from "./idl/safelearn_credential.json";

// ============================================================
// Types
// ============================================================

export interface BlockchainResult {
    network: string;
    programId: string;
    pda: string;
    transactionSignature: string;
    certificateHash: string;
    status: string;
    issuedAt: Date;
}

export interface OnChainCredential {
    issuer: string;
    credentialId: string;
    courseId: string;
    courseTitle: string;
    score: number;
    certificateHash: number[];
    issuedAt: number;
    status: { active: {} } | { revoked: {} };
}

// ============================================================
// Helpers
// ============================================================

const LOG_PREFIX = "[Solana]";

function log(message: string) {
    console.log(`${LOG_PREFIX} ${message}`);
}

function logError(message: string, error?: unknown) {
    console.error(`${LOG_PREFIX} ${message}`, error || "");
}

/**
 * Load issuer Keypair from environment variable.
 * Supports base58 encoded private key or JSON byte array.
 */
function loadIssuerKeypair(): Keypair {
    const privateKeyStr = env.SOLANA_ISSUER_PRIVATE_KEY;

    if (!privateKeyStr) {
        throw new Error("SOLANA_ISSUER_PRIVATE_KEY is not set in environment variables");
    }

    try {
        // Try JSON byte array first (e.g. from solana-keygen)
        if (privateKeyStr.startsWith("[")) {
            const keyArray = JSON.parse(privateKeyStr);
            return Keypair.fromSecretKey(Uint8Array.from(keyArray));
        }

        // Otherwise treat as base58 (e.g. from Phantom export)
        const decoded = bs58.decode(privateKeyStr);
        return Keypair.fromSecretKey(decoded);
    } catch (error) {
        throw new Error("Failed to parse SOLANA_ISSUER_PRIVATE_KEY. Ensure it is a valid base58 string or JSON byte array.");
    }
}

/**
 * Create Anchor provider connected to the configured Solana RPC.
 */
function createProvider(): { provider: AnchorProvider; issuer: Keypair } {
    const commitment = env.SOLANA_COMMITMENT as Commitment;
    const connection = new Connection(env.SOLANA_RPC_URL, commitment);
    const issuer = loadIssuerKeypair();
    const wallet = new Wallet(issuer);
    const provider = new AnchorProvider(connection, wallet, {
        commitment,
    });

    return { provider, issuer };
}

/**
 * Create the Anchor Program instance from the IDL.
 */
function createProgram(provider: AnchorProvider): Program<any> {
    const idlObj = idl as any;
    if (!idlObj.address) {
        idlObj.address = env.SOLANA_PROGRAM_ID;
    }
    return new Program(idlObj, provider);
}

/**
 * Derive the PDA for a credential based on certificate hash.
 * Seeds: ["credential", certificate_hash]
 */
function derivePda(certificateHash: Buffer): { pda: PublicKey; bump: number } {
    const programId = new PublicKey(env.SOLANA_PROGRAM_ID);
    const [pda, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from("credential"), certificateHash],
        programId
    );
    return { pda, bump };
}

// ============================================================
// Public API
// ============================================================

/**
 * Issue a credential to the Solana blockchain.
 */
export async function issueCredentialOnChain(
    credentialId: string,
    courseId: string,
    courseTitle: string,
    score: number,
    certificateHash: Buffer,
    issuedAtTimestamp: number
): Promise<BlockchainResult> {
    log(`Connecting to ${env.SOLANA_NETWORK}...`);
    log(`RPC: ${env.SOLANA_RPC_URL}`);

    const { provider, issuer } = createProvider();
    const program = createProgram(provider);

    log(`Issuer: ${issuer.publicKey.toBase58()}`);
    log(`Credential ID: ${credentialId}`);
    log(`Certificate hash: ${certificateHash.toString("hex")}`);

    const { pda } = derivePda(certificateHash);
    log(`PDA: ${pda.toBase58()}`);

    // Convert certificate hash to array of numbers for Anchor
    const hashArray = Array.from(certificateHash);

    log("Sending transaction...");

    const txSignature = await (program as any).methods
        .issueCredential(
            credentialId,
            courseId,
            courseTitle,
            score,
            hashArray,
            new BN(issuedAtTimestamp)
        )
        .accounts({
            credential: pda,
            issuer: issuer.publicKey,
        })
        .signers([issuer])
        .rpc();

    log(`Transaction: ${txSignature}`);
    log("Credential issued successfully");

    return {
        network: env.SOLANA_NETWORK,
        programId: env.SOLANA_PROGRAM_ID,
        pda: pda.toBase58(),
        transactionSignature: txSignature,
        certificateHash: certificateHash.toString("hex"),
        status: "ACTIVE",
        issuedAt: new Date(issuedAtTimestamp * 1000),
    };
}

/**
 * Revoke a credential on the Solana blockchain.
 */
export async function revokeCredentialOnChain(
    pdaAddress: string
): Promise<string> {
    log(`Revoking credential on ${env.SOLANA_NETWORK}...`);

    const { provider, issuer } = createProvider();
    const program = createProgram(provider);
    const pda = new PublicKey(pdaAddress);

    log(`PDA: ${pdaAddress}`);
    log("Sending revoke transaction...");

    const txSignature = await (program as any).methods
        .revokeCredential()
        .accounts({
            credential: pda,
            issuer: issuer.publicKey,
        })
        .signers([issuer])
        .rpc();

    log(`Revoke Transaction: ${txSignature}`);
    log("Credential revoked successfully on-chain");

    return txSignature;
}

/**
 * Fetch a credential from the Solana blockchain by PDA address.
 */
export async function fetchCredentialOnChain(
    pdaAddress: string
): Promise<OnChainCredential | null> {
    try {
        log(`Fetching credential from ${env.SOLANA_NETWORK}...`);

        const { provider } = createProvider();
        const program = createProgram(provider);
        const pda = new PublicKey(pdaAddress);

        const account = await (program as any).account.credential.fetch(pda);
        log(`Credential fetched: ${pdaAddress}`);

        return {
            issuer: (account as any).issuer.toBase58(),
            credentialId: (account as any).credentialId,
            courseId: (account as any).courseId,
            courseTitle: (account as any).courseTitle,
            score: (account as any).score,
            certificateHash: Array.from((account as any).certificateHash),
            issuedAt: (account as any).issuedAt.toNumber(),
            status: (account as any).status,
        };
    } catch (error) {
        logError("Failed to fetch credential on-chain", error);
        return null;
    }
}

/**
 * Verify a credential on-chain by comparing certificate hash.
 */
export async function verifyCredentialOnChain(
    pdaAddress: string,
    expectedHash: Buffer
): Promise<{
    verified: boolean;
    hashMatch: boolean;
    onChainStatus: string;
    onChainData: OnChainCredential | null;
}> {
    const onChainData = await fetchCredentialOnChain(pdaAddress);

    if (!onChainData) {
        return {
            verified: false,
            hashMatch: false,
            onChainStatus: "NOT_FOUND",
            onChainData: null,
        };
    }

    // Compare hashes
    const onChainHash = Buffer.from(onChainData.certificateHash);
    const hashMatch = onChainHash.equals(expectedHash);

    // Determine on-chain status
    const onChainStatus = "active" in onChainData.status ? "ACTIVE" : "REVOKED";

    return {
        verified: hashMatch && onChainStatus === "ACTIVE",
        hashMatch,
        onChainStatus,
        onChainData,
    };
}
