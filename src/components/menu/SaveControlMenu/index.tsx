import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from '../../../styles/menu';
import styled from 'styled-components';
import {
  faChevronLeft,
  faCircle,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { HiOutlineSave } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { GoTag } from 'react-icons/go';
import TagMenu from '../TagMenu';
import { ITree } from '../../../types/treeType';
import {
  useUpdateFileNameQuery,
  useUpdateFileThemeColorQuery,
} from '../../../hooks/usefileQuery';

type dataProps = {
  data: ITree;
};

const ThemeColors = [
  { red: '#F26957' },
  { pink: '#F25C9B' },
  { orange: '#F69918' },
  { green: '#30BEB9' },
  { blue: '#48A0F7' },
  { navy: '#6066FC' },
  { purple: '#C263E8' },
];

const SaveControlMenu = ({ data }: dataProps) => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState(data.file_name);
  const [active, setActive] = useState({ palette: false, tag: false });

  // Refs for detecting clicks outside
  const paletteMenuRef = useRef(null);
  const tagMenuWrapperRef = useRef(null);

  //파일 이름 수정
  const { mutate: updateFileName } = useUpdateFileNameQuery([
    'tree',
    data.file_id,
  ]);

  //파일 테마 색상 수정
  const { mutate: updateThemeColor } = useUpdateFileThemeColorQuery([
    'tree',
    data.file_id,
  ]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFileName(value);
  };

  const handleActiveMenu = (menu: keyof typeof active) => {
    setActive((prevActive) => {
      const updatedActive = Object.keys(prevActive).reduce((acc, key) => {
        acc[key as keyof typeof active] = key === menu;
        return acc;
      }, {} as typeof active);

      return updatedActive;
    });
  };

  return (
    <Wrapper>
      <S.MenuIcon onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </S.MenuIcon>
      <span></span>
      <Input
        onChange={onChangeInput}
        value={fileName}
        placeholder="파일 제목을 입력해주세요"
      />
      <S.MenuIcon
        onClick={() =>
          updateFileName({ file_id: data.file_id, file_name: fileName })
        }
      >
        <HiOutlineSave fontSize={'2rem'} />
      </S.MenuIcon>
      <span></span>
      <S.MenuIcon onClick={() => handleActiveMenu('palette')}>
        <FontAwesomeIcon icon={faPalette} fontSize={'2rem'} />
      </S.MenuIcon>
      <span></span>
      <S.MenuIcon onClick={() => handleActiveMenu('tag')}>
        <GoTag fontSize={'2rem'} />
      </S.MenuIcon>
      {active.palette ? (
        <PaletteMenu ref={paletteMenuRef}>
          <ul>
            {ThemeColors.map((item) => {
              return Object.entries(item).map(([colorName, colorValue]) => (
                <li
                  key={colorName}
                  onClick={() =>
                    updateThemeColor({
                      file_id: data.file_id,
                      theme_color: colorName,
                    })
                  }
                >
                  <FontAwesomeIcon
                    icon={faCircle}
                    fontSize={'2rem'}
                    color={colorValue}
                  />
                </li>
              ));
            })}
          </ul>
        </PaletteMenu>
      ) : (
        <TagMenuWrapper ref={tagMenuWrapperRef}>
          <TagMenu id={data.file_id} handleSelectTag={() => {}} />
        </TagMenuWrapper>
      )}
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

const PaletteMenu = styled.div`
  position: absolute;
  bottom: -4.4rem;
  right: -7rem;
  background-color: var(--color-white-bg);
  padding: 0.8rem 1rem;
  border-radius: 6px;
  > ul {
    display: flex;
    gap: 0.8rem;
  }
  box-shadow: var(--shadow-base);
`;

const TagMenuWrapper = styled.div`
  position: absolute;
  bottom: -14.4rem;
  right: -11rem;
`;
