export interface CreateLessonData {
    moduleId: number;
    title: string;
    description?: string;
    content?: string;
    videoUrl?: string;
    order: number;
}