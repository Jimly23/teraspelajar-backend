import { prisma } from "../config/database";
import { LearningItemType } from "../generated/prisma/client";

export const getCourseProgress = async (userId: number, courseId: number) => {
    return prisma.learningProgress.findMany({
        where: {
            userId,
            courseId,
        },
    });
};

export const upsertLearningProgress = async (
    userId: number,
    courseId: number,
    itemType: LearningItemType,
    itemId: number,
    score?: number,
    passed: boolean = true
) => {
    return prisma.learningProgress.upsert({
        where: {
            userId_itemType_itemId: {
                userId,
                itemType,
                itemId,
            },
        },
        update: {
            score,
            passed,
            courseId,
        },
        create: {
            userId,
            courseId,
            itemType,
            itemId,
            score,
            passed,
        },
    });
};
