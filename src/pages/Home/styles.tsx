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
  > p {
    color: #19191a;
    font-size: 2.2rem;
    font-weight: 500;
    margin-bottom: 2rem;
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
  background-color: var(--color-white);
  border-radius: 8px;
  border: 1px solid var(--color-border);
`;
