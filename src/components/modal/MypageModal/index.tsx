import BaseModal from '../BaseModal';
import * as S from '../../../styles/modal';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isOpenMypageModal } from '../../../recoil/atoms/auth';

const MypageModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenMypageModal);
  return (
    <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <S.ModalContent>
        <S.ModalTitle>마이페이지</S.ModalTitle>
        <span>닉네임</span>
        <Input type="text" placeholder="닉네임을 입력해주세요" />
        <InputButton>수정</InputButton>
      </S.ModalContent>
    </BaseModal>
  );
};

export default MypageModal;

const Input = styled.input``;
const InputButton = styled.button``;
