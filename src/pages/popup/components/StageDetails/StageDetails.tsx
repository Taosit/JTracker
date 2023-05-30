import styles from "./StageDetails.module.css";
import { toDateString } from "../../../../utils/helpers";
import CopyIcon from "./images/copy.svg";
import EditIcon from "./images/edit.svg";
import CheckmarkIcon from "./images/checkmark.svg";
import ChevronUpIcon from "./images/chevronUp.svg";
import ChevronDownIcon from "./images/chevronDown.svg";
import { useState } from "react";
import { useApplication } from "../../contexts/ApplicationContext";
import { IconButton } from "../IconButton/IconButton";

type Props = {
  stage: ApplicationStage | Interview;
};

export const StageDetails = ({ stage }: Props) => {
  const { viewingApplicationId, updateStageDetails } = useApplication();

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [draftStage, setDraftStage] = useState(stage);
  const [isOpen, setIsOpen] = useState(true);

  const isInterview = (
    stage: ApplicationStage | Interview
  ): stage is Interview => {
    return (stage as Interview).round !== undefined;
  };

  const getDate = (stage: ApplicationStage | Interview) => {
    if (!stage.date) return "";
    const date = toDateString(stage.date);
    if (date === "Today" || date === "Yesterday") {
      return date;
    }
    return `on ${date}`;
  };

  const copyText = (answer: string) => {
    navigator.clipboard.writeText(answer);
  };

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
    const updatedApplications = updateStageDetails(
      viewingApplicationId,
      updatedStage
    );
    chrome.runtime.sendMessage({
      event: "updateApplications",
      data: updatedApplications,
    });
    setDraftStage(updatedStage);
    setEditingQuestion(null);
  };

  const addQuestion = () => {
    const id = crypto.getRandomValues(new Uint32Array(1))[0].toString();
    const question = {
      id,
      question: "",
      answer: "",
    };
    const updatedStage = {
      ...stage,
      questions: [...stage.questions, question],
    };
    setDraftStage(updatedStage);
    setEditingQuestion(question);
  };

  return (
    <details open={isOpen}>
      <summary
        className={styles.header}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        <p>
          {isInterview(stage) ? `R${stage.round} Interview ` : "Applied "}
          {getDate(stage)}
        </p>
        <img src={isOpen ? ChevronUpIcon : ChevronDownIcon} alt="chevron" />
      </summary>
      <div className={styles.body}>
        <ol className={styles.questions}>
          {draftStage.questions.map((question, index) => (
            <li className={styles.question} key={index}>
              <div className={styles.questionText}>
                {question.id === editingQuestion?.id ? (
                  <>
                    <input
                      type="text"
                      value={editingQuestion.question}
                      onChange={editQuestionText}
                    />
                    <IconButton
                      imageUrl={CheckmarkIcon}
                      altText="Save"
                      onClick={saveQuestion}
                    />
                  </>
                ) : (
                  <>
                    <h3>Q: {question.question}</h3>
                    <IconButton
                      imageUrl={EditIcon}
                      altText="Edit"
                      onClick={() => startEdit(question)}
                    />
                  </>
                )}
              </div>
              <div className={styles.answer}>
                {question.id === editingQuestion?.id ? (
                  <textarea
                    value={editingQuestion.answer}
                    onChange={editAnswerText}
                  />
                ) : (
                  <p>A: {question.answer}</p>
                )}
                <IconButton
                  imageUrl={CopyIcon}
                  altText="Copy"
                  onClick={() => copyText(question.answer)}
                />
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.buttons}>
          <button onClick={addQuestion}>Add Question</button>
          <button>Add Note</button>
        </div>
      </div>
    </details>
  );
};
