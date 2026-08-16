-- CreateTable
CREATE TABLE `quest_scenarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quest_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `content` TEXT NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `quest_scenarios_quest_id_idx`(`quest_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quest_scenarios` ADD CONSTRAINT `quest_scenarios_quest_id_fkey` FOREIGN KEY (`quest_id`) REFERENCES `quests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
