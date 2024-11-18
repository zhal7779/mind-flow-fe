import { Wrapper, MainTitle, TitlePadding } from "../../styles/common";
import NoData from "../../components/NoData";

const Trash = () => {
  return (
    <Wrapper>
      <TitlePadding>
        <MainTitle>공간 휴지통</MainTitle>
      </TitlePadding>
      <NoData text={"휴지통에 파일이 없습니다"} />
    </Wrapper>
  );
};

export default Trash;
