import { useState } from "react";
import { useStageDetails } from "./useStage";
import { getBlankQuestion } from "@src/shared/utils/helpers";

export const useEditQuestion = () => {
  const { draftStage, setDraftStage, updateAndSaveStage } = useStageDetails();
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const editQuestionText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingQuestion((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const editAnswerText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditingQuestion((prev) => ({
      ...prev,
      answer: e.target.value,
    }));
  };

  const startEdit = (question: Question) => {
    setEditingQuestion(question);
  };

  const saveQuestion = () => {
    if (!editingQuestion.question) return;
    const updatedStage = {
      ...draftStage,
      questions: draftStage.questions.map((question) => {
        if (question.id === editingQuestion.id) {
          return editingQuestion;
        }
        return question;
      }),
    };
    updateAndSaveStage(updatedStage);
    setEditingQuestion(null);
  };

  const addQuestion = () => {
    const question = getBlankQuestion();
    const updatedStage = {
      ...draftStage,
      questions: [...draftStage.questions, question],
    };
    setDraftStage(updatedStage);
    setEditingQuestion(question);
  };

  return {
    editingQuestion,
    editQuestionText,
    editAnswerText,
    startEdit,
    saveQuestion,
    addQuestion,
  };
};
