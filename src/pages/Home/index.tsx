import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fileDataState } from "../../recoil/atoms/fileDataState";
import { FileDataType } from "../../types/fileDataType";
import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const Home = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);

  const navigate = useNavigate();

  const addNewFile = () => {
    const newFileData = {
      fileName: "이름이 없는 파일",
      tree: {
        value: "",
        node: 0,
        level: 0,
        position: { x: 0, y: 0, r: 0, t: 0 },
        parentNode: {
          node: -1,
          position: { x: 0, y: 0, r: 0, t: 0 },
        },
        leftChildNode: [],
        rightChildNode: [],
      },
    };

    setFileData((prevFileData: FileDataType[]) => [
      ...prevFileData,
      newFileData,
    ]);
    navigate("/editor");
  };

  return (
    <div onClick={addNewFile}>
      <S.NewFileFrame>
        <p>새로운 파일을 생성하시겠습니까?</p>
        <FontAwesomeIcon icon={faPlus} />
      </S.NewFileFrame>

      <S.FileContent>
        {fileData.map((item) => (
          <S.FileFrame>
            <p>{item.fileName}</p>
          </S.FileFrame>
        ))}
      </S.FileContent>
    </div>
  );
};

export default Home;
