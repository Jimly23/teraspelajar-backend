import {
    createExamQuestion,
    findAllQuestionsByExamId,
    findQuestionById,
    updateExamQuestion,
    deleteExamQuestion,
    createExamOption,
    findOptionById,
    findAllOptionsByQuestionId,
    updateExamOption,
    deleteExamOption,
} from "../repositories/exam-question.repository";

import {
    CreateExamQuestionData,
    UpdateExamQuestionData,
    CreateExamOptionData,
    UpdateExamOptionData,
} from "../models/exam-question.model";

export const createExamQuestionService = async (
    data: CreateExamQuestionData
) => {
    return createExamQuestion(data);
};

export const getExamQuestionsService = async (
    examId: number
) => {
    return findAllQuestionsByExamId(examId);
};

export const getExamQuestionByIdService = async (
    id: number
) => {
    const question = await findQuestionById(id);

    if (!question) {
        throw new Error("Exam question not found");
    }

    return question;
};

export const updateExamQuestionService = async (
    id: number,
    data: UpdateExamQuestionData
) => {
    const question = await findQuestionById(id);

    if (!question) {
        throw new Error("Exam question not found");
    }

    return updateExamQuestion(id, data);
};

export const deleteExamQuestionService = async (
    id: number
) => {
    const question = await findQuestionById(id);

    if (!question) {
        throw new Error("Exam question not found");
    }

    await deleteExamQuestion(id);
};

export const createExamOptionService = async (
    data: CreateExamOptionData
) => {
    const question = await findQuestionById(data.questionId);

    if (!question) {
        throw new Error("Exam question not found");
    }

    return createExamOption(data);
};

export const getExamOptionsByQuestionIdService = async (
    questionId: number
) => {
    return findAllOptionsByQuestionId(questionId);
};

export const updateExamOptionService = async (
    id: number,
    data: UpdateExamOptionData
) => {
    const option = await findOptionById(id);

    if (!option) {
        throw new Error("Exam option not found");
    }

    return updateExamOption(id, data);
};

export const deleteExamOptionService = async (
    id: number
) => {
    const option = await findOptionById(id);

    if (!option) {
        throw new Error("Exam option not found");
    }

    await deleteExamOption(id);
};
