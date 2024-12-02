import styled from "styled-components";

type NoDataProps = {
  text: string;
};

const NoData = ({ text }: NoDataProps) => {
  return (
    <NoDataContent>
      <img src={"/img/empty-file-page.png"} alt="no file" />
      <span>{text}</span>
    </NoDataContent>
  );
};

export default NoData;

const NoDataContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100%;
  color: var(--color-grey-02);
  padding-top: 14rem;
  > img {
    width: 10rem;
  }
  > span {
    font-size: 1.3rem;
    color: var(--color-grey-04);
    font-weight: 600;
  }
`;
