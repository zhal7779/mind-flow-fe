import styled from 'styled-components';

export const NewFileFrame = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: fit-content;
  border-radius: 0.8rem;
  height: 6rem;
  background: url('/img/home-head-bg.png') 0% 0% / 100% 100% no-repeat;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--color-grey-01);
  cursor: pointer;

  > p {
    font-size: 1.8rem;
    font-weight: 600;
    margin-right: 2rem;
  }

  > svg {
    border-radius: 50%;
    padding: 0.6rem;
    font-size: 1.6rem;
    color: var(--color-red);
    background-color: var(--color-white);
  }

  &:hover {
    box-shadow: var(--shadow-primary);
  }
`;

export const FileSection = styled.section`
  margin-top: 5rem;
`;

export const FileContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(242px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const FileFrame = styled.div<{ $active: boolean }>`
  position: relative;
  border-radius: 8px;
  border: ${(props) =>
    props.$active
      ? '2px solid var( --color-purple)'
      : '1px solid var(--color-border)'};

  > span {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  &:hover {
    box-shadow: var(--shadow-base);
  }
`;
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
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
