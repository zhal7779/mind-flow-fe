import BaseModal from '../BaseModal';
import * as S from '../../../styles/modal';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isOpenMypageModal } from '../../../recoil/atoms/auth';
import { useState } from 'react';
import { alert } from '../../../utils/alert';

const MypageModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenMypageModal);

  const [user, setUser] = useState({
    avatarUrl: 'https://via.placeholder.com/80', // 유저 사진 (샘플)
    userId: 'user123', // 유저 아이디
    nickname: 'JohnDoe', // 닉네임
  });

  const [nickname, setNickname] = useState(user.nickname);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.', 'error');
      return;
    }

    setUser((prev) => ({ ...prev, nickname }));
    alert('프로필이 성공적으로 업데이트되었습니다!', 'success');
    setPassword('');
    setConfirmPassword('');
  };
  return (
    <BaseModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <S.ModalContent style={{ padding: '0 3rem' }}>
        <S.ModalTitle>회원 정보 수정</S.ModalTitle>
        <ProfileHeader>
          <Avatar src={user.avatarUrl} alt="User Avatar" />
          <UserInfo>
            <div>ID: {user.userId}</div>
            <div>Nickname: {user.nickname}</div>
          </UserInfo>
        </ProfileHeader>
        <LabelContent>
          <Label htmlFor="nickname">닉네임 변경</Label>
          <Input
            id="nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </LabelContent>
        <LabelContent>
          <Label htmlFor="password">비밀번호 변경</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </LabelContent>
        <LabelContent>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </LabelContent>
        <div style={{ margin: '1rem 0 5rem 0', width: '100%' }}>
          <S.LoginButton onClick={handleSubmit}>수정 완료</S.LoginButton>
        </div>
      </S.ModalContent>
    </BaseModal>
  );
};

export default MypageModal;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const LabelContent = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  text-align: left;
  font-size: 1.4rem;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
