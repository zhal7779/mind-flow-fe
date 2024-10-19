import React from "react";
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
    window.scrollTo(1250, 700);
  };

  const handleScaleUp = () => {
    const newScale = scale - 0.1;
    setScale(newScale);
  };

  const handleScaleDown = () => {
    const newScale = scale + 0.1;
    setScale(newScale);
  };

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
