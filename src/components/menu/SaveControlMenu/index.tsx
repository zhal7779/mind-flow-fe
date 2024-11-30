import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from '../../../styles/menu';
import styled from 'styled-components';
import {
  faChevronLeft,
  faCircle,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { HiOutlineSave } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { nodeColor } from '../../../recoil/atoms/nodeColor';
import { GoTag } from 'react-icons/go';
import TagMenu from '../TagMenu';
import { ITree } from '../../../types/treeType';

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
  const setColor = useSetRecoilState(nodeColor);
  const [fileName, setFileName] = useState(data.file_name);
  const [active, setActive] = useState({ palette: false, tag: false });
  const navigate = useNavigate();

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
      <S.MenuIcon>
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
        <PaletteMenu>
          <ul>
            {ThemeColors.map((item) => {
              return Object.entries(item).map(([colorName, colorValue]) => (
                <li key={colorName} onClick={() => setColor(colorName)}>
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
        <TagMenuWrapper>
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
