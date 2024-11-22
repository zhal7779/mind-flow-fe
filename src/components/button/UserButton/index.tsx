import {
  faArrowRightFromBracket,
  faArrowUpRightFromSquare,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  authState,
  isOpenAuthModal,
  isOpenMypageModal,
} from '../../../recoil/atoms/auth';

const UserButton = () => {
  const [menuActive, setMenuActive] = useState(false);
  const auth = useRecoilValue(authState);

  const setIsOpenAuthModal = useSetRecoilState(isOpenAuthModal);
  const setIsOpenMypageModal = useSetRecoilState(isOpenMypageModal);
  const handleActiveMenu = () => {
    if (!auth) {
      return setIsOpenAuthModal(true);
    }
    setMenuActive(!menuActive);
  };

  return (
    <>
      <Wrapper onClick={handleActiveMenu}>
        <UserFrame>
          <UserIcon>
            <FontAwesomeIcon icon={faUser} />
          </UserIcon>
        </UserFrame>
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </Wrapper>
      {menuActive && (
        <UserMenu>
          <ul>
            <li onClick={() => setIsOpenMypageModal(true)}>
              <FontAwesomeIcon icon={faUser} />
              <span>회원정보수정</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <span>로그아웃</span>
            </li>
          </ul>
        </UserMenu>
      )}
    </>
  );
};

export default UserButton;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  > svg {
    font-size: 1.5rem;
    color: var(--color-grey-05);
  }

  padding: 0.4rem;
  border-radius: 0.8rem;

  &:hover {
    background-color: var(--color-grey-06);
  }
`;

const UserFrame = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.8rem;
  background-color: var(--color-tag-purple);
  position: relative;
`;

const UserIcon = styled.span`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  font-size: 2.4rem;
  cursor: pointer;
  color: #ffff;
`;

const UserMenu = styled.div`
  position: absolute;
  padding: 1.6rem 0.4rem;
  top: -9rem;
  width: 13rem;
  border-radius: 0.8rem;
  border: 1px solid var(--color-border);
  background-color: var(--color-white-bg);
  z-index: 1;

  > ul {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    > li {
      padding: 0.8rem 0.6rem;
      font-size: 1.3rem;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background-color: var(--color-grey-06);
      }
      > svg {
        color: var(--color-grey-05);
        margin-right: 0.6rem;
      }
    }
  }
`;
