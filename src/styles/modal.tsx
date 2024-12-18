import styled from 'styled-components';
export const ModalContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6rem;
`;

export const ModalTitle = styled.h5`
  margin: 2rem 0 4rem 0;
  font-size: 2.2rem;
  font-weight: 600;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1.4rem;

  > span {
    font-weight: 600;
    font-size: 1.3rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  padding: 0 1rem;
  font-size: 1.3rem;

  &:hover,
  &:focus {
    background-color: var(--color-grey-06);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  padding: 1rem 0;
  height: 4.8rem;
`;

export const DuplicateText = styled.p<{ $isDuplicate: boolean }>`
  padding-left: 0.6rem;
  font-size: 1.2rem;
  color: ${(props) =>
    props.$isDuplicate ? 'var(--color-purple)' : 'var(--color-grey-02)'};
`;

export const LoginButton = styled(Button)`
  color: var(--color-white-bg);
  background-color: var(--color-tag-purple);
`;

export const TrialLoginButton = styled(Button)`
  color: var(--color-tag-purple);
  background-color: var(--color-white-bg);
  border: 1px solid var(--color-tag-purple);
`;

export const ConfirmButton = styled.button`
  border-radius: 0.8rem;
  color: var(--color-tag-purple);
  background-color: var(--color-white-bg);
  border: 1px solid var(--color-tag-purple);
`;
