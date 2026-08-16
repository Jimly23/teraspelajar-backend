import { Request, Response } from "express";
import { getCourseProgressService, submitProgressService } from "../services/progress.service";

export const getCourseProgress = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { courseId } = req.params;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const data = await getCourseProgressService(userId, Number(courseId));
        return res.status(200).json({ success: true, ...data });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const submitProgress = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { itemType, itemId } = req.params;
        const { courseId, score, passed } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required" });
        }

        const validTypes = ["LESSON", "QUIZ", "EXAM"];
        const itemTypeStr = String(itemType);
        if (!validTypes.includes(itemTypeStr.toUpperCase())) {
            return res.status(400).json({ success: false, message: "Invalid item type" });
        }

        const result = await submitProgressService(
            userId,
            Number(courseId),
            itemTypeStr.toUpperCase() as any,
            Number(itemId),
            score ? Number(score) : undefined,
            passed !== undefined ? Boolean(passed) : true
        );

        return res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        if (error.message === "You are not enrolled in this course") {
            return res.status(403).json({ success: false, message: error.message });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};
