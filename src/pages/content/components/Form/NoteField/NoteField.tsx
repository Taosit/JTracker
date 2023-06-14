import { useNewApplicationStore } from "../../../stores/NewApplicationStore";
import { InputGroup } from "../InputGroup/InputGroup";

export const NoteField = () => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );

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
