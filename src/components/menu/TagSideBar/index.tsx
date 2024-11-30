import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from './styles';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { SubTitle } from '../../../styles/common';
import { useState } from 'react';
import Tags from '../../../data/tags';
import { useNavigate } from 'react-router-dom';

const TagSideBar = () => {
  const nvaigate = useNavigate();
  const [activeTag, setActiveTag] = useState(Tags[0].name);

  const handleActiveTag = (tagName: string, tag: string) => {
    setActiveTag(tagName);
    nvaigate(`/bookmark/${tag}`);
  };

  return (
    <S.TagMenuWrapper>
      <S.MenuTitleWrapper>
        <SubTitle>즐겨찾기 태그</SubTitle>
      </S.MenuTitleWrapper>

      <S.Tags>
        {Tags.map((tag) => (
          <S.Tag
            key={tag.name}
            $active={tag.name === activeTag}
            onClick={() => handleActiveTag(tag.name, tag.tag)}
          >
            <FontAwesomeIcon icon={faTag} style={{ color: tag.color }} />
            <h5>{tag.name}</h5>
          </S.Tag>
        ))}
      </S.Tags>
    </S.TagMenuWrapper>
  );
};

export default TagSideBar;
