import { GeneralFields } from "./GeneralFields";
import { QuestionFields } from "./QuestionFields";
import { NoteField } from "./NoteField";
import {
  startApplication,
  addQuestion,
  addAnswer,
} from "@src/shared/utils/helpers";
import { useNewApplication } from "../contexts/NewApplicationContext";
import { useApplicationTransformer } from "../hooks/useApplicationTransformer";
import { useRegisterMessageListener } from "../hooks/useRegisterMessageListener";
import { usePage } from "../contexts/PageContext";

export const Form = () => {
  const { newApplication } = useNewApplication();
  const { page } = usePage();

  const startApplicationListener = useApplicationTransformer(
    "startApplication",
    startApplication
  );
  const addQuestionListener = useApplicationTransformer(
    "addQuestion",
    addQuestion
  );
  const addAnswerListener = useApplicationTransformer("addAnswer", addAnswer);

  useRegisterMessageListener(startApplicationListener);
  useRegisterMessageListener(addQuestionListener);
  useRegisterMessageListener(addAnswerListener);

  const getTitle = () => {
    if (!newApplication) return "";
    if (page === 0) return "New Application";
    return newApplication.company || "New Application";
  };

  return (
    <div className="form-container" draggable="false">
      <div className="form-header">
        <h1 className="title">{getTitle()}</h1>
      </div>
      <form>
        {page === 0 && <GeneralFields />}
        {page === 1 && <QuestionFields />}
        {page === 2 && <NoteField />}
      </form>
    </div>
  );
};
