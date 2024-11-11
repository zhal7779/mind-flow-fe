import styled from "styled-components";

export const RootNodeContainer = styled.div<{ $isRoot: string; $side: string }>`
  display: flex;
  flex-direction: ${({ $isRoot }) => ($isRoot ? "row" : "column")};
  justify-content: ${({ $side }) =>
    $side === undefined ? "center" : $side === "left" ? "end" : "start"};
  align-items: center;
  margin: 20px;
  position: relative;
`;

export const DirectionNodeContainer = styled.div<{ $side: string }>`
  display: flex;
  flex-direction: ${({ $side }) => ($side === "left" ? "row-reverse" : "row")};
  justify-content: ${({ $side }) => ($side === "left" ? "end" : "start")};
  align-items: center;
  margin: 15px;
  position: relative;
`;

export const Node = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const NodeLine = styled.span<{
  $direction: string;
  $right: number;
  $width: number;
  $angle: number;
}>`
  position: absolute;
  display: block;
  right: ${(props) =>
    props.$direction === "left" ? -1 : props.$right / 10}rem;
  width: ${(props) => props.$width / 10}rem;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: 100% 0;
  background-color: var(--color-green);
  height: 0.4rem;
  border-radius: 0.4rem;
`;

const commonInput = styled.textarea`
  text-align: center;
  padding: 2rem 1.6rem;
  background-color: var(--color-white);
  border-radius: 3.6rem;
  box-sizing: content-box;
  height: auto;
  overflow: hidden;
  z-index: 1;
`;

export const RootTopicInput = styled(commonInput)`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  min-width: 30rem;
  background-color: var(--color-butter);
  border: 5px solid var(--color-butter);
`;

export const MainTopicInput = styled(commonInput)`
  font-size: 1.6rem;
  font-weight: 600;
  width: 100%;
  min-width: 23.5rem;
  border: 5px solid var(--color-primary);
`;

export const ContentInput = styled(commonInput)`
  font-size: 1.4rem;
  font-weight: 400;
`;

export const ButtonWrapper = styled.span`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  z-index: 2;

  > span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

export const Button = styled.button<{ $color: string; $size: number }>`
  color: ${(props) => props.$color};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  border-radius: 50%;
  border: 2.5px solid ${(props) => props.$color};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1.2rem;
  }
  z-index: 1;
`;
