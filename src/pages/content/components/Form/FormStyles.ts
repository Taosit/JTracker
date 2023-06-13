import styled from "@emotion/styled";

export const FormContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  cursor: initial;
  overflow-y: auto;
`;

export const FormHeader = styled.div`
  width: 100%;
  border-bottom: 2px solid var(--gray-light);
`;

export const FormTitle = styled.h1`
  font-size: 16px;
  font-weight: 500 !important;
  margin: 0;
  padding: 12px var(--margin-side) 0;
  color: var(--primary-dark);
  line-height: initial;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FormContent = styled.div`
  padding: 12px var(--margin-side);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
