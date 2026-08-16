export interface CreateCourseData {
    title: string;
    slug: string;
    description: string;
    thumbnail?: string;
    level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    category?: string;
}