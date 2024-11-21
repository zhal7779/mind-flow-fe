import { useRecoilState } from 'recoil';
import { authState, isOpenAuthModal } from '../../../recoil/atoms/auth';
import BaseModal from '../BaseModal';
import styled from 'styled-components';
const AuthModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenAuthModal);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  const handleActiveTrial = () => {
    setAuthRecoil(true);
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleDelete}>
      <img src="/public/img/logo.png" alt="logo" style={{ width: '12rem' }} />
      <Content>
        <Title>로그인</Title>
        <InputContent>
          <span>아이디</span>
          <Input placeholder="아이디를 입력해주세요" />
        </InputContent>
        <InputContent>
          <span>비밀번호</span>
          <Input placeholder="비밀번호를 입력해주세요" type="password" />
          <TextButton>비밀번호 찾기</TextButton>
        </InputContent>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <LoginButton>로그인</LoginButton>
          <TrialLoginButton onClick={handleActiveTrial}>
            체험판 로그인
          </TrialLoginButton>
        </div>
        <BottomContent>
          <span>계정이 없으신가요?</span>
          <TextButton>회원가입</TextButton>
        </BottomContent>
      </Content>
    </BaseModal>
  );
};

export default AuthModal;

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 6rem;
`;

const Title = styled.h5`
  margin: 2rem 0 4rem 0;
  font-size: 2.2rem;
  font-weight: 600;
`;

const InputContent = styled.div`
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

const Input = styled.input`
  width: 100%;
  height: 4.8rem;
  border: 1px solid var(--color-border);
  border-radius: 0.8rem;
  padding: 0 1rem;
  font-size: 1.3rem;

  &:hover,
  &:focus {
    background-color: var(--color-grey-06);
  }
`;

const Button = styled.button`
  width: 100%;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  padding: 1rem 0;
  height: 4.8rem;
`;

const LoginButton = styled(Button)`
  color: var(--color-white-bg);
  background-color: var(--color-tag-purple);
`;

const TrialLoginButton = styled(Button)`
  color: var(--color-tag-purple);
  background-color: var(--color-white-bg);
  border: 1px solid var(--color-tag-purple);
`;

const TextButton = styled.button`
  font-size: 1.3rem;
  text-decoration: underline;
  color: var(--color-purple);
  background-color: transparent;
`;

const BottomContent = styled.div`
  font-size: 1.3rem;
  padding: 2rem;
  margin-bottom: 3rem;
`;
