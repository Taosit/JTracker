import { InputGroup } from "./inputGroup";

type Props = {
  newApplication: Application;
  updateNewApplication: (application: Application) => void;
};

export const GeneralFields = ({
  newApplication,
  updateNewApplication,
}: Props) => {
  return (
    <>
      <InputGroup
        label="Company"
        value={newApplication.company}
        onChange={(value) =>
          updateNewApplication({ ...newApplication, company: value })
        }
        onDelete={() =>
          updateNewApplication({ ...newApplication, company: "" })
        }
      />
      <InputGroup
        label="Link"
        value={newApplication.link}
        onChange={(value) =>
          updateNewApplication({ ...newApplication, link: value })
        }
        onDelete={() => updateNewApplication({ ...newApplication, link: "" })}
      />
    </>
  );
};
