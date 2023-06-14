import { useNewApplicationStore } from "../../../stores/NewApplicationStore";
import { InputGroup } from "../InputGroup/InputGroup";

export const GeneralFields = () => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );

  return (
    <>
      <InputGroup
        label="Company"
        value={newApplication.company}
        onChange={(value) =>
          updateNewApplication({ ...newApplication, company: value })
        }
      />
      <InputGroup
        label="Link"
        value={newApplication.link}
        onChange={(value) =>
          updateNewApplication({ ...newApplication, link: value })
        }
      />
    </>
  );
};
