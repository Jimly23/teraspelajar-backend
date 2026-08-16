import {
    createQuizQuestion,
    findAllQuestionsByQuizId,
    findQuizQuestionById,
    updateQuizQuestion,
    deleteQuizQuestion,
    createQuizOption,
    findQuizOptionById,
    findAllOptionsByQuestionId,
    updateQuizOption,
    deleteQuizOption,
} from "../repositories/quiz-question.repository";

import {
    CreateQuizQuestionData,
    UpdateQuizQuestionData,
    CreateQuizOptionData,
    UpdateQuizOptionData,
} from "../models/quiz-question.model";

export const createQuizQuestionService = async (
    data: CreateQuizQuestionData
) => {
    return createQuizQuestion(data);
};

export const getQuizQuestionsService = async (
    quizId: number
) => {
    return findAllQuestionsByQuizId(quizId);
};

export const getQuizQuestionByIdService = async (
    id: number
) => {
    const question = await findQuizQuestionById(id);

    if (!question) {
        throw new Error("Quiz question not found");
    }

    return question;
};

export const updateQuizQuestionService = async (
    id: number,
    data: UpdateQuizQuestionData
) => {
    const question = await findQuizQuestionById(id);

    if (!question) {
        throw new Error("Quiz question not found");
    }

    return updateQuizQuestion(id, data);
};

export const deleteQuizQuestionService = async (
    id: number
) => {
    const question = await findQuizQuestionById(id);

    if (!question) {
        throw new Error("Quiz question not found");
    }

    await deleteQuizQuestion(id);
};

export const createQuizOptionService = async (
    data: CreateQuizOptionData
) => {
    const question = await findQuizQuestionById(
        data.questionId
    );

    if (!question) {
        throw new Error("Quiz question not found");
    }

    return createQuizOption(data);
};

export const getQuizOptionsByQuestionIdService = async (
    questionId: number
) => {
    return findAllOptionsByQuestionId(questionId);
};

export const updateQuizOptionService = async (
    id: number,
    data: UpdateQuizOptionData
) => {
    const option = await findQuizOptionById(id);

    if (!option) {
        throw new Error("Quiz option not found");
    }

    return updateQuizOption(id, data);
};

export const deleteQuizOptionService = async (
    id: number
) => {
    const option = await findQuizOptionById(id);

    if (!option) {
        throw new Error("Quiz option not found");
    }

    await deleteQuizOption(id);
};
