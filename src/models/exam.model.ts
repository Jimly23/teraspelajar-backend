export interface CreateExamData {
    courseId: number;
    title: string;
    description?: string;
    duration?: number;
    passingScore?: number;
}