import { getCourseProgress, upsertLearningProgress } from "../repositories/progress.repository.js";
import { findCourseDetailById } from "../repositories/course.repository.js";
import { findEnrollment, updateEnrollmentProgress } from "../repositories/enrollment.repository.js";
import { LearningItemType } from "../generated/prisma/client.js";
import { prisma } from "../config/database.js";

export const getCourseProgressService = async (userId: number, courseId: number) => {
    const progress = await getCourseProgress(userId, courseId);
    
    const course = await findCourseDetailById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    let allModulesCompleted = true;
    const modulesStatus: { id: number; status: string }[] = [];
    
    // Status can be UNLOCKED, IN_PROGRESS, COMPLETED, LOCKED
    let isNextModuleUnlocked = true; // First module is always unlocked

    for (const mod of course.modules) {
        const lessons = mod.lessons;
        const quiz = mod.quizzes[0];
        
        let allLessonsCompleted = true;
        for (const lesson of lessons) {
            const isCompleted = progress.some((p: any) => p.itemType === "LESSON" && p.itemId === lesson.id && p.passed);
            if (!isCompleted) allLessonsCompleted = false;
        }

        const quizPassed = quiz 
            ? progress.some((p: any) => p.itemType === "QUIZ" && p.itemId === quiz.id && p.passed)
            : true;

        const isModuleCompleted = allLessonsCompleted && quizPassed;
        
        let currentStatus = "LOCKED";
        
        if (isModuleCompleted) {
            currentStatus = "COMPLETED";
            // Next module is automatically unlocked
            isNextModuleUnlocked = true;
        } else if (isNextModuleUnlocked) {
            currentStatus = "IN_PROGRESS";
            // Next module is locked because this one is in progress
            isNextModuleUnlocked = false;
            allModulesCompleted = false;
        } else {
            currentStatus = "LOCKED";
            allModulesCompleted = false;
        }

        modulesStatus.push({
            id: mod.id,
            status: currentStatus
        });
    }

    const finalExamStatus = allModulesCompleted ? "UNLOCKED" : "LOCKED";

    return {
        items: progress,
        status: {
            modules: modulesStatus,
            finalExam: {
                status: finalExamStatus
            }
        }
    };
};

export const submitProgressService = async (
    userId: number,
    courseId: number,
    itemType: LearningItemType,
    itemId: number,
    score?: number,
    passed: boolean = true
) => {
    // Verifikasi enrollment
    const enrollment = await findEnrollment(userId, courseId);
    if (!enrollment) {
        throw new Error("You are not enrolled in this course");
    }

    // 1. Simpan progress
    const progressRecord = await upsertLearningProgress(
        userId,
        courseId,
        itemType,
        itemId,
        score,
        passed
    );

    // 2. Kalkulasi ulang persentase progress course
    const course = await findCourseDetailById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    let totalItems = 0;
    course.modules.forEach((mod: any) => {
        totalItems += mod.lessons.length;
        if (mod.quizzes.length > 0) totalItems += 1;
    });
    if (course.exams.length > 0) totalItems += 1;

    // 3. Ambil semua progress user untuk course ini yang passed = true
    const allProgress = await getCourseProgress(userId, courseId);
    const completedItemsCount = allProgress.filter((p: any) => p.passed).length;

    // 4. Update tabel Enrollment
    const progressPercentage = totalItems > 0 
        ? Math.round((completedItemsCount / totalItems) * 100)
        : 0;
    
    // Pastikan persentase tidak melebihi 100%
    const finalProgress = Math.min(progressPercentage, 100);
    
    await updateEnrollmentProgress(enrollment.id, finalProgress);

    // Jika final exam passed, update completedAt and issue credential
    if (itemType === "EXAM" && passed) {
        await prisma.enrollment.update({
            where: { id: enrollment.id },
            data: { status: "COMPLETED", completedAt: new Date() }
        });
        
        // Issue Credential and Certificate
        const { issueCredential } = await import("./credential.service.js");
        await issueCredential(userId, courseId, score ?? 100);
    }

    // Re-calculate status exactly like getCourseProgressService
    let allModulesCompleted = true;
    const modulesStatus: { id: number; status: string }[] = [];
    let isNextModuleUnlocked = true;

    for (const mod of course.modules) {
        const lessons = mod.lessons;
        const quiz = mod.quizzes[0];
        
        let allLessonsCompleted = true;
        for (const lesson of lessons) {
            const isCompleted = allProgress.some((p: any) => p.itemType === "LESSON" && p.itemId === lesson.id && p.passed);
            if (!isCompleted) allLessonsCompleted = false;
        }

        const quizPassed = quiz 
            ? allProgress.some((p: any) => p.itemType === "QUIZ" && p.itemId === quiz.id && p.passed)
            : true;

        const isModuleCompleted = allLessonsCompleted && quizPassed;
        
        let currentStatus = "LOCKED";
        if (isModuleCompleted) {
            currentStatus = "COMPLETED";
            isNextModuleUnlocked = true;
        } else if (isNextModuleUnlocked) {
            currentStatus = "IN_PROGRESS";
            isNextModuleUnlocked = false;
            allModulesCompleted = false;
        } else {
            currentStatus = "LOCKED";
            allModulesCompleted = false;
        }
        modulesStatus.push({ id: mod.id, status: currentStatus });
    }

    const finalExamStatus = allModulesCompleted ? "UNLOCKED" : "LOCKED";

    return {
        progressRecord,
        progressPercentage: finalProgress,
        completedItemsCount,
        totalItems,
        items: allProgress,
        status: {
            modules: modulesStatus,
            finalExam: {
                status: finalExamStatus
            }
        }
    };
};
