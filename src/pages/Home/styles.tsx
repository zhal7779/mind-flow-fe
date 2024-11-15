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

export const DeleteContent = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  align-items: center;
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
