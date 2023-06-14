import styled from "@emotion/styled";

export const ControlsContainer = styled.div`
  width: 100%;
  background-color: var(--primary-light);
  padding: 8px var(--margin-side) 16px;
  cursor: initial;
`;

export const PageControls = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const PageButton = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 2px;
  padding: 0;
  background-color: transparent;

  &:focus {
    outline: none !important;
  }
  &:focus-visible {
    outline: 2px solid var(--primary-dark) !important;
  }

  &:hover {
    background-color: transparent;
  }
`;

export const ButtonText = styled.p`
  text-transform: capitalize;
  font-weight: 400;
  font-size: 16px;
  color: var(--text-dark);
  margin: 0;
  padding: 0;
`;

export const DoneButton = styled.button`
  margin-top: 8px;
  padding-block: 2px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-dark);
  color: white;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  border-radius: 2px;

  &:disabled {
    filter: grayscale(0.7);
    opacity: 0.7;
    cursor: auto;
  }

  &:focus {
    outline: none !important;
  }

  &:focus-visible {
    outline: 2px solid white !important;
  }

  &:hover {
    background-color: var(--primary-dark);
  }
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin: 0;
`;
