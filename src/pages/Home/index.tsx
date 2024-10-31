import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { fileDataState } from '../../recoil/atoms/fileDataState';
import { FileDataType } from '../../types/fileDataType';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import updateDate from '../../utils/updateDate';
import { MainTitle, SubTitle } from '../../styles/common';
const Home = () => {
  const [fileData, setFileData] = useRecoilState(fileDataState);

  const navigate = useNavigate();

  const addNewFile = () => {
    const updatedDate = updateDate();

    const newFileData = {
      fileName: '이름이 없는 파일',
      updatedDate,
      tree: {
        value: '',
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
    navigate('/editor');
  };

  return (
    <S.Wrapper>
      <S.NewFileFrame onClick={addNewFile}>
        <p>새로운 파일을 생성하시겠습니까?</p>
        <FontAwesomeIcon icon={faPlus} />
      </S.NewFileFrame>

      <S.FileSection>
        <MainTitle>최근 열기</MainTitle>

        <SubTitle> 파일({fileData.length})</SubTitle>
        <S.FileContent>
          {fileData.map((item) => (
            <S.FileFrame>
              <S.FileImg></S.FileImg>
              <S.FileDes>
                <p>{item.fileName}</p>
                <span>{item.updatedDate} 마지막으로 수정</span>
              </S.FileDes>
            </S.FileFrame>
          ))}
        </S.FileContent>
      </S.FileSection>
    </S.Wrapper>
  );
};

export default Home;
