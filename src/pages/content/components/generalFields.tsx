import { useNewApplication } from "../contexts/NewApplicationContext";
import { InputGroup } from "./InputGroup";

export const GeneralFields = () => {
  const { newApplication, updateNewApplication } = useNewApplication();

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
