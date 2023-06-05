import { useNewApplication } from "../contexts/NewApplicationContext";
import { InputGroup } from "./InputGroup";

export const NoteField = () => {
  const { newApplication, updateNewApplication } = useNewApplication();

  return (
    <InputGroup
      label="Notes"
      value={newApplication.application.notes}
      onChange={(notes) =>
        updateNewApplication({
          ...newApplication,
          application: { ...newApplication.application, notes },
        })
      }
      multiline
    />
  );
};
