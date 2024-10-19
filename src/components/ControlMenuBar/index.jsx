import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsToCircle,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";

import * as S from "./styles";
const ControlMenuBar = () => {
  const handleMoveScroll = () => {
    window.scrollTo(1250, 700);
  };

  const handleScaleUp = () => {};

  const handleScaleDown = () => {};

  return (
    <S.MenuContainer>
      <S.MenuIcon onClick={handleMoveScroll}>
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </S.MenuIcon>
      <S.MenuIcon onClick={handleScaleUp}>
        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
      </S.MenuIcon>
      <S.MenuIcon onClick={handleScaleDown}>
        <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
      </S.MenuIcon>
    </S.MenuContainer>
  );
};

export default ControlMenuBar;
