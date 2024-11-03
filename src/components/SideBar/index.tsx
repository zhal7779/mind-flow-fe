import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faHouse,
  faTag,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { isSideBarOnState } from '../../recoil/atoms/isSideBarOnState';
import React, { useState, useEffect } from 'react';

const SideBar = () => {
  const [isSideBarOn, setIsSideBarOn] = useRecoilState(isSideBarOnState);
  const [showTag, setShowTag] = useState(false);

  const onClickToggle = () => {
    if (isSideBarOn) {
      setTimeout(() => {
        setShowTag(true);
      }, 350);
    } else {
      setShowTag(false);
    }
    setIsSideBarOn(!isSideBarOn);
  };

  useEffect(() => {
    if (!isSideBarOn) {
      setShowTag(false);
    }
  }, [isSideBarOn]);

  return (
    <>
      <S.SideMenuWrapper $isSideBarOn={isSideBarOn}>
        <S.Header>
          <S.Logo>MindFlow</S.Logo>
          <FontAwesomeIcon icon={faAnglesLeft} onClick={onClickToggle} />
        </S.Header>
        <S.Menu>
          <li>
            <FontAwesomeIcon icon={faHouse} />
            <span>홈페이지</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faTag} />
            <span>즐겨찾기</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faTrash} />
            <span>공간 휴지통</span>
          </li>
        </S.Menu>
      </S.SideMenuWrapper>
      {!isSideBarOn && showTag && (
        <S.Tag onClick={onClickToggle}>
          <FontAwesomeIcon icon={faAnglesRight} />
        </S.Tag>
      )}
    </>
  );
};

export default SideBar;
