import { useNewApplication } from "../contexts/NewApplicationContext";
import { InputGroup } from "./InputGroup";
import { cleanUpQuestions } from "@src/utils/helpers";

export const QuestionFields = () => {
  const { newApplication, updateNewApplication } = useNewApplication();
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
    <div className="questions">
      {newApplication.application.questions.map((question, index) => (
        <div key={question.id} className="question-answer-pair">
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
        </div>
      ))}
    </div>
  );
};
