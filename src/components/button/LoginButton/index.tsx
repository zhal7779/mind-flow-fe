import styled from 'styled-components';
import { isOpenAuthModal } from '../../../recoil/atoms/auth';
import { useSetRecoilState } from 'recoil';
const LoginButton = () => {
  const setIsOpen = useSetRecoilState(isOpenAuthModal);

  const handleActiveModal = () => {
    setIsOpen(true);
  };

  return <Button onClick={handleActiveModal}>로그인 하러가기</Button>;
};

export default LoginButton;
const Button = styled.button`
  width: 12rem;
  border-radius: 0.8rem;
  color: var(--color-white-bg);
  padding: 1rem 1.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: #7856ff;
`;
