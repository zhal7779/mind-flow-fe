import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "../../styles/menu";
import styled from "styled-components";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineSave } from "react-icons/hi";

const SaveControlMenu = () => {
  const [fileName, setFileName] = useState("이름이 없는 파일");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFileName(value);
  };

  return (
    <Wrapper>
      <S.MenuIcon>
        <FontAwesomeIcon icon={faChevronLeft} />
      </S.MenuIcon>
      <span></span>
      <Input
        onChange={onChangeInput}
        value={fileName}
        placeholder="파일 제목을 입력해주세요"
      />
      <S.MenuIcon>
        <HiOutlineSave fontSize={"2rem"} />
      </S.MenuIcon>
    </Wrapper>
  );
};

export default SaveControlMenu;

const Wrapper = styled(S.MenuContainer)`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
`;

const Input = styled.input`
  width: 24rem;
  margin-left: 1rem;
`;
