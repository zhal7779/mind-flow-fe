import React, { useState } from 'react';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnglesLeft,
  faAnglesRight,
  faHouse,
  faTag,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
const SideMenu = () => {
  const [menuToggle, setMenuToggle] = useState(true);

  const onClickToggle = () => {
    setMenuToggle(!menuToggle);
  };

  return !menuToggle ? (
    <S.Tag>
      <FontAwesomeIcon icon={faAnglesRight} onClick={onClickToggle} />
    </S.Tag>
  ) : (
    <S.SideMenuWrapper $menuToggle={menuToggle}>
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
  );
};

export default SideMenu;
