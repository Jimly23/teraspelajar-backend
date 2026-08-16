export interface CreateQuizQuestionData {
    quizId: number;
    question: string;
    order: number;
}

export interface UpdateQuizQuestionData {
    question?: string;
    order?: number;
}

export interface CreateQuizOptionData {
    questionId: number;
    option: string;
    isCorrect: boolean;
}

export interface UpdateQuizOptionData {
    option?: string;
    isCorrect?: boolean;
}
