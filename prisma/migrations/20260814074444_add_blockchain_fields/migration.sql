-- AlterTable
ALTER TABLE `certificates` ADD COLUMN `blockchain_issued_at` DATETIME(3) NULL,
    ADD COLUMN `blockchain_network` VARCHAR(20) NULL,
    ADD COLUMN `blockchain_pda` VARCHAR(64) NULL,
    ADD COLUMN `blockchain_program_id` VARCHAR(64) NULL,
    ADD COLUMN `blockchain_status` VARCHAR(20) NULL,
    ADD COLUMN `blockchain_tx_signature` VARCHAR(128) NULL,
    ADD COLUMN `certificate_hash` VARCHAR(64) NULL,
    MODIFY `status` ENUM('ACTIVE', 'REVOKED', 'PENDING', 'FAILED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `credentials` MODIFY `status` ENUM('ACTIVE', 'REVOKED', 'PENDING', 'FAILED') NOT NULL DEFAULT 'ACTIVE';
