export interface CreateExamQuestionData {
    examId: number;
    question: string;
    order: number;
}

export interface UpdateExamQuestionData {
    question?: string;
    order?: number;
}

export interface CreateExamOptionData {
    questionId: number;
    option: string;
    isCorrect: boolean;
}

export interface UpdateExamOptionData {
    option?: string;
    isCorrect?: boolean;
}
