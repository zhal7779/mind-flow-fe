import styled from "styled-components";

export const NodeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  position: relative;
`;

export const Node = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1rem;
`;
export const NodeLine = styled.span`
  position: absolute;
  display: block;
  right: ${(props) => props.$right}px;
  width: ${(props) => props.$width}px;
  transform: rotate(${(props) => props.$angle}deg);
  transform-origin: 100% 0;
  background-color: black;
  height: 0.2rem;
  z-index: -1;
`;

const commonInput = styled.input`
  text-align: center;
  padding: 1.2rem;
  border: 5px solid var(--color-primary);
  background-color: #fff;
  border-radius: 2rem;
  min-width: 10rem; /* 최소 너비 설정 */
  width: auto; /* 너비 가변 */
  box-sizing: content-box; /* 패딩을 너비 계산에 포함하지 않음 */
`;

export const RootTopicInput = styled(commonInput)`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
`;

export const MainTopicInput = styled(commonInput)`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const ContentInput = styled(commonInput)`
  font-size: 1.3rem;
  font-weight: 400;
`;

export const Button = styled.button`
  position: absolute;
  color: ${(props) => props.$color};
  width: ${(props) => props.$size}rem;
  height: ${(props) => props.$size}rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.$color};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  > i {
    font-size: 1rem;
  }
`;
