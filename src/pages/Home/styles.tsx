import styled from 'styled-components';

export const Wrapper = styled.main`
  max-width: 140rem;
  margin: 0 auto;
  padding-top: 10rem;
`;

export const NewFileFrame = styled.div`
  border-radius: 0.8rem;
  width: 100%;
  background: url('/img/home-head-bg.png') 0% 0% / 100% 100% no-repeat;
  text-align: center;
  padding: 4rem 0;
  box-shadow: var(--shadow-primary);
  color: var(--color-grey-01);
  cursor: pointer;
  > p {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 3rem;
  }

  > svg {
    font-size: 2.4rem;
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

export const FileFrame = styled.div`
  cursor: pointer;
  &:hover {
    border-radius: 8px;
    box-shadow: var(--shadow-base);
  }
`;

export const FileImg = styled.div`
  height: 19rem;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  background-color: var(--color-grey-03);
`;

export const FileDes = styled.div`
  background-color: var(--color-white);
  padding: 1.2rem 1.2rem 0.8rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);

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
