import styled from 'styled-components';

export const FileSection = styled.section`
  margin-top: 5rem;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4rem;
`;

export const DeleteContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const ModeChangeContent = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export const ModeItem = styled.span<{ $view: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.$view ? 'var(--color-grey-06)' : 'transparent'};
  cursor: pointer;
  > svg {
    font-size: 1.8rem;
    color: var(--color-grey-04);
  }
`;
