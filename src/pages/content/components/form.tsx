import { GeneralFields } from "./GeneralFields";
import { QuestionFields } from "./QuestionFields";
import { NoteField } from "./NoteField";
import { startApplication, addQuestion, addAnswer } from "@src/utils/helpers";
import { useNewApplication } from "../contexts/NewApplicationContext";
import { useApplicationTransformer } from "../hooks/useApplicationTransformer";
import { useRegisterMessageListener } from "../hooks/UseRegisterMessageListener";

type Props = {
  page: number;
};

export const Form = ({ page }: Props) => {
  const { newApplication } = useNewApplication();

  const startApplicationListener = useApplicationTransformer(startApplication);
  const addQuestionListener = useApplicationTransformer(addQuestion);
  const addAnswerListener = useApplicationTransformer(addAnswer);

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
