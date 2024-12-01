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
import { GoTag } from 'react-icons/go';
import TagMenu from '../TagMenu';
import { ITree } from '../../../types/treeType';
import {
  useUpdateFileNameQuery,
  useUpdateFileTagQuery,
  useUpdateFileThemeColorQuery,
} from '../../../hooks/usefileQuery';

import { useUpdateTreeQuery } from '../../../hooks/useTreeQuery';
import { confirmAlert } from '../../../utils/alert';

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
  const [fileName, setFileName] = useState(data.file_name);
  const [paletteActive, setPaletteActive] = useState(false);
  const [tagActive, setTagActive] = useState(false);

  // Refs for detecting clicks outside
  const paletteMenuRef = useRef(null);
  const tagMenuWrapperRef = useRef(null);

  const { mutate: updateTree } = useUpdateTreeQuery(['tree', data.file_id]);

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

  //파일 태그 수정
  const { mutate: updateTag } = useUpdateFileTagQuery(['tree', data.file_id]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFileName(value);
  };

  const handleUpdateTree = () => {
    confirmAlert('파일을 저장하시겠습니까?', 'question', () =>
      updateTree(data)
    );
  };

  const handleSelectThemeColor = (id: string, color: string) => {
    setPaletteActive(false);
    updateThemeColor({
      file_id: id,
      theme_color: color,
    });
  };

  const handleSelectTag = (id: string, tag: string) => {
    setTagActive(false);
    updateTag({ file_id: id, tag: tag });
  };

  return (
    <Wrapper>
      <S.MenuIcon onClick={handleUpdateTree}>
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
      <S.MenuIcon onClick={() => setPaletteActive(!paletteActive)}>
        <FontAwesomeIcon icon={faPalette} fontSize={'2rem'} />
      </S.MenuIcon>
      <span></span>
      <S.MenuIcon onClick={() => setTagActive(!tagActive)}>
        <GoTag fontSize={'2rem'} />
      </S.MenuIcon>
      {paletteActive && (
        <PaletteMenu ref={paletteMenuRef}>
          <ul>
            {ThemeColors.map((item) => {
              return Object.entries(item).map(([colorName, colorValue]) => (
                <li
                  key={colorName}
                  onClick={() =>
                    handleSelectThemeColor(data.file_id, colorName)
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
      )}
      {tagActive && (
        <TagMenuWrapper ref={tagMenuWrapperRef}>
          <TagMenu id={data.file_id} handleSelectTag={handleSelectTag} />
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
