import React from 'react';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
const SideMenu = () => {
  return (
    <S.SideMenuWrapper>
      <S.Header>
        <S.Logo>MindFlow</S.Logo>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </S.Header>

      <ul>
        <li>홈페이지</li>
        <li>즐겨찾기</li>
        <li>공간 휴지통</li>
      </ul>
    </S.SideMenuWrapper>
  );
};

export default SideMenu;
