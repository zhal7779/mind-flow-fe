import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from './styles';
import { faTag } from '@fortawesome/free-solid-svg-icons';
const Tags = [
  { name: '중요함', color: '' },
  { name: '보류중', color: '' },
  { name: '진행중', color: '' },
  { name: '완료됨', color: '' },
];

const TagSideBar = () => {
  return (
    <S.TagMenuWrapper>
      <S.Tags>
        {Tags.map((tag) => (
          <S.Tag key={tag.name}>
            <FontAwesomeIcon icon={faTag} />
            <h5>{tag.name}</h5>
          </S.Tag>
        ))}
      </S.Tags>
    </S.TagMenuWrapper>
  );
};

export default TagSideBar;
