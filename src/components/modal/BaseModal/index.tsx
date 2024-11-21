import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Backdrop>
      <Container>
        <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
        <CloseButton onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </Container>
    </Backdrop>
  );
};

export default BaseModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  background: var(--color-white-bg);
  border-radius: 0.8rem;
  width: 50rem;
  height: fit-content;
  padding: 2rem;
  position: relative;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: -3rem;
  background-color: #4b4d4e;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  backdrop-filter: blur(10px);
  justify-content: center;
  > svg {
    border-radius: 50%;
    color: var(--color-white-bg);
    font-size: 1.1rem;
    cursor: pointer;
  }

  &:hover {
    filter: brightness(1.2);
  }
`;
