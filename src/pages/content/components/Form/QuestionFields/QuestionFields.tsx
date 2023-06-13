import { useNewApplicationStore } from "../../../stores/NewApplicationStore";
import { InputGroup } from "../InputGroup/InputGroup";
import { cleanUpQuestions } from "@src/shared/utils/helpers";
import { QuestionAnswerPair, QuestionsContainer } from "./QuestionFieldsStyles";

export const QuestionFields = () => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );
  const onQuestionChange = (question: string, id: string) => {
    const rawQuestions = newApplication.application.questions.map((q) =>
      q.id === id ? { ...q, question } : q
    );
    const questions = cleanUpQuestions(rawQuestions);
    updateNewApplication({
      ...newApplication,
      application: { ...newApplication.application, questions },
    });
  };

  const onAnswerChange = (answer: string, id: string) => {
    const rawQuestions = newApplication.application.questions.map((q) =>
      q.id === id ? { ...q, answer } : q
    );
    const questions = cleanUpQuestions(rawQuestions);
    updateNewApplication({
      ...newApplication,
      application: { ...newApplication.application, questions },
    });
  };

  return (
    <QuestionsContainer>
      {newApplication.application.questions.map((question, index) => (
        <QuestionAnswerPair key={question.id}>
          <InputGroup
            label={`${index + 1}. Question`}
            value={question.question}
            onChange={(str: string) => onQuestionChange(str, question.id)}
          />
          <InputGroup
            label={`${index + 1}. Answer`}
            value={question.answer}
            onChange={(str: string) => onAnswerChange(str, question.id)}
            multiline
          />
        </QuestionAnswerPair>
      ))}
    </QuestionsContainer>
  );
};
