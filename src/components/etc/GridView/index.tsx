import { useState } from 'react';
import { CheckBox } from '../../../styles/common';
import * as S from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { GoTag } from 'react-icons/go';
import { IFile } from '../../../types/fileType';
import TagMenu from '../../menu/TagMenu';

type GridViewProps = {
  data: IFile[];
  selectFiles: string[];
  handleSelectFile: (id: string) => void;
  selectTag: (index: number, tag: string) => void;
};

const GridView = ({
  data,
  selectFiles,
  handleSelectFile,
  selectTag,
}: GridViewProps) => {
  const navigate = useNavigate();
  const [activeTagMenu, setActiveTagMenu] = useState('');
  const [hoverFile, setHoverFile] = useState(-1);

  const handleMouseOver = (index: number) => {
    setHoverFile(index);
  };

  const handleMouseOut = () => {
    setHoverFile(-1);
  };

  const handleOpenFile = (id: string) => {
    navigate(`/editor/${id}`);
  };

  const handleActiveTagMenu = (id: string) => {
    setActiveTagMenu(id);
  };

  const handleSelectTag = (index: number, tag: string) => {
    setActiveTagMenu('');
    selectTag(index, tag);
  };

  return (
    <S.FileContent>
      {data.map((item, index) => (
        <S.FileFrame
          key={index}
          $active={selectFiles.includes(item.file_id)}
          onClick={() => handleOpenFile(item.file_id)}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
        >
          <CheckBox
            $hover={hoverFile === index}
            $active={selectFiles.includes(item.file_id)}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectFile(item.file_id);
            }}
          >
            <FontAwesomeIcon icon={faCheck} />
          </CheckBox>
          <S.FileImg>
            <img src="/public/favicon.png" alt="logo" />
          </S.FileImg>
          <S.FileDes>
            <p>{item.file_name}</p>
            <span>
              {item.updated_at.split('T')[0]}{' '}
              {item.updated_at.split('T')[1].slice(0, 8)} 마지막으로 수정
            </span>
          </S.FileDes>
          <S.TagContent
            onClick={(e) => {
              e.stopPropagation();
              handleActiveTagMenu(item.file_id);
            }}
          >
            {item.tag === null ? (
              <GoTag style={{ color: 'var(--color-grey-02)' }} />
            ) : (
              <S.ActiveTag $tag={item.tag}>
                <FontAwesomeIcon icon={faTag} />
              </S.ActiveTag>
            )}
          </S.TagContent>

          {activeTagMenu === item.tag && (
            <S.TagMenuWrapper>
              <TagMenu itemIndex={index} handleSelectTag={handleSelectTag} />
            </S.TagMenuWrapper>
          )}
        </S.FileFrame>
      ))}
    </S.FileContent>
  );
};

export default GridView;
