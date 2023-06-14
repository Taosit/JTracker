import styles from "./StageDetails.module.css";
import { isInterview, toDateString } from "../../../../../shared/utils/helpers";
import CopyIcon from "./images/copy.svg";
import EditIcon from "./images/edit.svg";
import CheckmarkIcon from "./images/checkmark.svg";
import ChevronUpIcon from "./images/chevronUp.svg";
import ChevronDownIcon from "./images/chevronDown.svg";
import { IconButton } from "../../IconButton/IconButton";
import { useStageDetails } from "./useStage";
import { useEditQuestion } from "./useEditQuestion";
import { useNote } from "./useNote";

type Props = {
  stage: ApplicationStage | Interview;
};

export const StageDetails = ({ stage }: Props) => {
  const { draftStage, isOpen, setIsOpen, updateAndSaveStage } =
    useStageDetails(stage);

  const {
    editingQuestion,
    startEdit,
    editQuestionText,
    editAnswerText,
    addQuestion,
    saveQuestion,
  } = useEditQuestion();

  const { isEditingNote, setIsEditingNote, onNoteChange, saveNote } = useNote();

  const getDate = (stage: ApplicationStage | Interview) => {
    if (!stage.date) return "";
    const date = toDateString(stage.date);
    if (date === "Today" || date === "Yesterday") {
      return date;
    }
    return `on ${date}`;
  };

  const saveInterviewDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedStage = {
      ...draftStage,
      date: new Date(`${e.target.value}T00:00:00`).getTime(),
    };
    updateAndSaveStage(updatedStage);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
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
        <div className={styles.headerInfo}>
          <p>
            {isInterview(stage) ? `R${stage.round} Interview ` : "Applied "}
            {getDate(stage)}
          </p>
          {isInterview(stage) && (
            <label
              className={styles.datepicker}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              tabIndex={1}
            >
              <span className={styles.datepickerButton}></span>
              <input
                tabIndex={-1}
                type="date"
                onChange={saveInterviewDate}
                className={styles.datepickerInput}
              />
            </label>
          )}
        </div>
        <img src={isOpen ? ChevronUpIcon : ChevronDownIcon} alt="chevron" />
      </summary>
      <div className={styles.body}>
        {!draftStage || draftStage.questions.length === 0 ? (
          <p className={styles.noItem}>No quesion</p>
        ) : (
          <ol className={styles.questions}>
            {draftStage.questions.map((question, index) => (
              <li className={styles.question} key={index}>
                <div className={styles.questionText}>
                  {question.id === editingQuestion?.id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Question"
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
                      placeholder="Your answer to the question"
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
        )}
        {!editingQuestion && (
          <div className={styles.buttons}>
            <button onClick={addQuestion}>Add Question</button>
          </div>
        )}
        <div className={styles.note}>
          {isEditingNote ? (
            <textarea
              placeholder="Add some notes"
              value={draftStage.notes}
              onChange={onNoteChange}
            />
          ) : (
            <>
              {draftStage?.notes ? (
                <p>Note: {draftStage.notes}</p>
              ) : (
                <p className={styles.noItem}>No Note</p>
              )}
            </>
          )}
          {isEditingNote ? (
            <IconButton
              imageUrl={CheckmarkIcon}
              altText="Save"
              onClick={saveNote}
            />
          ) : (
            <IconButton
              imageUrl={EditIcon}
              altText="Edit"
              onClick={() => setIsEditingNote(true)}
            />
          )}
        </div>
      </div>
    </details>
  );
};
