import NoData from "../../components/NoData";
import TagSideBar from "../../components/TagSideBar";
import { Wrapper, MainTitle, TitlePadding } from "../../styles/common";
import { SideContainer, Container } from "./styles";

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
        <NoData text={"즐겨찾기 파일이 없습니다"} />
      </Wrapper>
    </Container>
  );
};

export default Favorites;
