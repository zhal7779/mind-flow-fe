import TagSideBar from '../../components/TagSideBar';
import { Wrapper, MainTitle, TitlePadding } from '../../styles/common';
import { SideContainer, Container } from './styles';

const Favorites = () => {
  return (
    <Container>
      <SideContainer>
        <TagSideBar />
      </SideContainer>
      <Wrapper>
        <TitlePadding>
          <MainTitle>즐겨찾기</MainTitle>
        </TitlePadding>
      </Wrapper>
    </Container>
  );
};

export default Favorites;
