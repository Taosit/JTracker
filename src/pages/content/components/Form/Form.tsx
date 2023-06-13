import { GeneralFields } from "./GeneralFields/GeneralFields";
import { QuestionFields } from "./QuestionFields/QuestionFields";
import { NoteField } from "./NoteField/NoteField";
import {
  startApplication,
  addQuestion,
  addAnswer,
} from "@src/shared/utils/helpers";
import { useApplicationTransformer } from "./useApplicationTransformer";
import { useRegisterMessageListener } from "../../hooks/useRegisterMessageListener";
import { useNewApplicationStore } from "../../stores/NewApplicationStore";
import { usePageStore } from "../../stores/PageStore";
import {
  FormContainer,
  FormContent,
  FormHeader,
  FormTitle,
} from "./FormStyles";

export const Form = () => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const page = usePageStore((state) => state.page);

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
    <FormContainer>
      <FormHeader>
        <FormTitle>{getTitle()}</FormTitle>
      </FormHeader>
      <FormContent>
        {page === 0 && <GeneralFields />}
        {page === 1 && <QuestionFields />}
        {page === 2 && <NoteField />}
      </FormContent>
    </FormContainer>
  );
};
