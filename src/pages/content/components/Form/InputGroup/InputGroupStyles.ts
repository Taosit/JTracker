import styled from "@emotion/styled";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputRow = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const Label = styled.label`
  color: var(--text-dark);
  line-height: 1.3;
  font-size: 16px;
  font-weight: 400;
  margin: 0;
`;

export const Input = styled.input`
  flex-grow: 1;
  background-color: var(--gray-light);
  border-radius: 2px;
  border: none;
  font-size: 16px;
  color: var(--text-dark);
  padding: 0 4px;
  box-shadow: none;
  height: 32px;
  caret-color: initial;
  &:active,
  &:focus {
    outline: 2px solid var(--primary-dark);
    outline-offset: 0;
    box-shadow: none;
  }
  &:hover {
    box-shadow: none;
    outline: 2px solid var(--primary-dark);
  }
`;

export const Textarea = styled.textarea`
  flex-grow: 1;
  background-color: var(--gray-light);
  border-radius: 2px;
  border: none;
  font-size: 16px;
  color: var(--text-dark);
  padding-inline: 4px;
  box-shadow: none;
  caret-color: initial;
  height: 96px;
  resize: none;
  line-height: 1.3;
  padding: 4px;
  &:active,
  &:focus {
    outline: 2px solid var(--primary-dark);
    outline-offset: 0;
    box-shadow: none;
  }
  &:hover {
    box-shadow: none;
    outline: 2px solid var(--primary-dark);
  }
`;

export const DeleteButton = styled.button`
  height: 32px;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: 2px solid var(--primary-dark);
  }
`;
