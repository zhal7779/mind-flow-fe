import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsToCircle } from "@fortawesome/free-solid-svg-icons";

import * as S from "./styles";
const ControlMenuBar = () => {
  const handleMoveScroll = () => {
    window.scrollTo(1250, 700);
  };

  return (
    <S.MenuContainer>
      <S.MenuIcon onClick={handleMoveScroll}>
        <FontAwesomeIcon icon={faArrowsToCircle} />
      </S.MenuIcon>
    </S.MenuContainer>
  );
};

export default ControlMenuBar;
