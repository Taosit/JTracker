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
  background-color: var(--gray-light) !important;
  border-radius: 2px !important;
  border: none !important;
  font-size: 16px !important;
  padding-inline: 4px !important;
  box-shadow: none !important;
  height: 32px;
  caret-color: initial;
  &:active,
  &:focus {
    outline: 2px solid var(--primary-dark) !important;
    outline-offset: 0 !important;
    box-shadow: none !important;
  }
  &:hover {
    box-shadow: none !important;
    outline: 2px solid var(--primary-dark) !important;
  }
`;

export const Textarea = styled.textarea`
  flex-grow: 1;
  background-color: var(--gray-light) !important;
  border-radius: 2px !important;
  border: none !important;
  font-size: 16px !important;
  padding-inline: 4px !important;
  box-shadow: none !important;
  caret-color: initial;
  height: 96px;
  resize: none;
  line-height: 1.3;
  padding: 4px;
  &:active,
  &:focus {
    outline: 2px solid var(--primary-dark) !important;
    outline-offset: 0 !important;
    box-shadow: none !important;
  }
  &:hover {
    box-shadow: none !important;
    outline: 2px solid var(--primary-dark) !important;
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
