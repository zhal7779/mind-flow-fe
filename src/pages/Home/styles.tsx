import styled from "styled-components";

export const Content = styled.main<{ $isSideBarOn: boolean }>`
  width: 100%;
  padding: 6rem 3rem 0 3rem;
  flex-grow: 1;
  margin-left: ${(props) => (props.$isSideBarOn ? "30rem" : "0")};
  transition: margin-left 0.35s ease-in-out;
`;

export const NewFileFrame = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: fit-content;
  border-radius: 0.8rem;
  border: 1px solid var(--color-border);
  height: 6rem;
  background: url("/img/home-head-bg.png") 0% 0% / 100% 100% no-repeat;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--color-grey-01);
  cursor: pointer;

  > p {
    font-size: 1.8rem;
    font-weight: 600;
    margin-right: 2rem;
  }

  > svg {
    border-radius: 50%;
    padding: 0.6rem;
    font-size: 1.6rem;
    color: var(--color-red);
    background-color: var(--color-white);
  }

  &:hover {
    box-shadow: var(--shadow-primary);
  }
`;

export const FileSection = styled.section`
  margin-top: 5rem;
`;

export const FileContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(242px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const FileFrame = styled.div`
  cursor: pointer;
  &:hover {
    border-radius: 8px;
    box-shadow: var(--shadow-base);
  }
`;

export const FileImg = styled.div`
  height: 19rem;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  background-color: var(--color-grey-03);
`;

export const FileDes = styled.div`
  background-color: var(--color-white);
  padding: 1.2rem 1.2rem 0.8rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom: 1px solid var(--color-border);
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);

  > p {
    font-size: 1.4rem;
    font-weight: 600;
    height: 2rem;
  }
  > span {
    font-size: 1.3rem;
    line-height: 1.8rem;
    font-weight: 400;
    color: var(--color-grey-02);
  }
`;
