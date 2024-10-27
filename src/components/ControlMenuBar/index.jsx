import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsToCircle,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
} from "@fortawesome/free-solid-svg-icons";

import * as S from "./styles";
import { scaleState } from "../../recoil/atoms/scaleState";

const ControlMenuBar = () => {
  const [scale, setScale] = useRecoilState(scaleState);

  const handleMoveScroll = () => {
    window.scrollTo(4252, 700);
  };

  const handleScaleUp = () => {
    if (scale > 1.8) {
      return;
    }
    const newScale = scale + 0.1;
    setScale(newScale);
  };

  const handleScaleDown = () => {
    if (scale < 0.4) {
      return;
    }
    const newScale = scale - 0.1;
    setScale(newScale);
  };

  return (
    <S.MenuContainer>
      <S.MenuIcon onClick={handleMoveScroll}>
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </S.MenuIcon>
      <span></span>
      <S.MenuIcon onClick={handleScaleUp}>
        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
      </S.MenuIcon>
      {Math.floor(scale * 100)} %
      <S.MenuIcon onClick={handleScaleDown}>
        <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
      </S.MenuIcon>
    </S.MenuContainer>
  );
};

export default ControlMenuBar;
