import { useId } from "react";
import {
  Input,
  InputContainer,
  InputRow,
  Textarea,
  DeleteButton,
  Label,
} from "./InputGroupStyles";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
  multiline?: boolean;
};

export const InputGroup = ({
  label,
  value,
  onChange,
  onDelete,
  multiline,
}: Props) => {
  const id = useId();
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <InputRow>
        {multiline ? (
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <Input
            type="text"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
        {onDelete && (
          <DeleteButton type="button" onClick={() => onDelete()}>
            <img
              src="https://res.cloudinary.com/del89ro4h/image/upload/v1685753180/carbon_close-outline_dgmwc1.svg"
              alt="delete text"
            />
          </DeleteButton>
        )}
      </InputRow>
    </InputContainer>
  );
};
