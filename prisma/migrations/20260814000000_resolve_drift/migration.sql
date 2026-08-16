-- DropForeignKey
ALTER TABLE `quest_scenarios` DROP FOREIGN KEY `quest_scenarios_quest_id_fkey`;

-- DropForeignKey
ALTER TABLE `quests` DROP FOREIGN KEY `quests_module_id_fkey`;

-- AlterTable
ALTER TABLE `quizzes` ADD COLUMN `passing_score` INTEGER NOT NULL DEFAULT 70;

-- DropTable
DROP TABLE `quest_scenarios`;

-- DropTable
DROP TABLE `quests`;

-- CreateTable
CREATE TABLE `certificates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credential_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `certificate_number` VARCHAR(191) NOT NULL,
    `certificate_url` VARCHAR(191) NOT NULL,
    `status` ENUM('ACTIVE', 'REVOKED') NOT NULL DEFAULT 'ACTIVE',
    `issued_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `certificates_certificate_number_idx`(`certificate_number` ASC),
    UNIQUE INDEX `certificates_certificate_number_key`(`certificate_number` ASC),
    INDEX `certificates_course_id_fkey`(`course_id` ASC),
    UNIQUE INDEX `certificates_credential_id_key`(`credential_id` ASC),
    INDEX `certificates_user_id_fkey`(`user_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `credential_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `status` ENUM('ACTIVE', 'REVOKED') NOT NULL DEFAULT 'ACTIVE',
    `issued_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `credentials_course_id_fkey`(`course_id` ASC),
    INDEX `credentials_credential_id_idx`(`credential_id` ASC),
    UNIQUE INDEX `credentials_credential_id_key`(`credential_id` ASC),
    UNIQUE INDEX `credentials_user_id_course_id_key`(`user_id` ASC, `course_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `learning_progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `course_id` INTEGER NOT NULL,
    `item_type` ENUM('LESSON', 'QUIZ', 'EXAM') NOT NULL,
    `item_id` INTEGER NOT NULL,
    `score` INTEGER NULL,
    `passed` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `learning_progress_course_id_fkey`(`course_id` ASC),
    INDEX `learning_progress_user_id_course_id_idx`(`user_id` ASC, `course_id` ASC),
    UNIQUE INDEX `learning_progress_user_id_item_type_item_id_key`(`user_id` ASC, `item_type` ASC, `item_id` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_credential_id_fkey` FOREIGN KEY (`credential_id`) REFERENCES `credentials`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credentials` ADD CONSTRAINT `credentials_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `credentials` ADD CONSTRAINT `credentials_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `learning_progress` ADD CONSTRAINT `learning_progress_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `learning_progress` ADD CONSTRAINT `learning_progress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

