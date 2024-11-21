import { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { authState } from '../../../recoil/atoms/auth';
import BaseModal from '../BaseModal';
import styled from 'styled-components';
const AuthModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={handleDelete}>
      <img src="/public/img/logo.png" alt="logo" style={{ width: '12rem' }} />
      <Content>
        <Title>로그인</Title>
      </Content>
    </BaseModal>
  );
};

export default AuthModal;

const Content = styled.div`
  text-align: center;
`;

const Title = styled.h5`
  margin: 2rem;
  font-size: 2.2rem;
  font-weight: 600;
`;
