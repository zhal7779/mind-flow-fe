import styled from 'styled-components';

export const NewFileFrame = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: fit-content;
  border-radius: 0.8rem;
  border: 1px solid var(--color-border);
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
  &:hover {
    box-shadow: var(--shadow-base);
  }
`;

export const CheckBox = styled.span<{ $hover: boolean; $active: boolean }>`
  visibility: ${(props) =>
    props.$hover || props.$active ? 'visible' : 'hidden'};
  position: absolute;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$active ? 'var( --color-purple)' : 'var(--color-white)'};
  border: 1px solid var(--color-border);
  border-radius: 4px;
  top: 1rem;
  left: 1rem;
  z-index: 10;

  > svg {
    color: var(--color-white);
    font-size: 1.3rem;
  }
  &:hover {
    box-shadow: var(--shadow-primary);
  }
`;

export const FileImg = styled.div`
  height: 19rem;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: var(--color-grey-03);
`;

export const FileDes = styled.div`
  background-color: var(--color-white);
  padding: 1.2rem 1.2rem 0.8rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  > p {
    font-size: 1.4rem;
    font-weight: 600;
    height: 2rem;
  }
  > span {
    font-size: 1.3rem;
    line-height: 1.8rem;
    font-weight: 400;
    color: var(--color-grey-02);
  }
`;
