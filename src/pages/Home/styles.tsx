import styled from "styled-components";

export const NewFileFrame = styled.div`
  border-radius: 8px;
  border: 1px solid var(--color-border);
  width: 108rem;
  background-color: var(--color-light-purple);
`;

export const FileContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(242px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const FileFrame = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  border: 1px solid var(--color-border);
`;
