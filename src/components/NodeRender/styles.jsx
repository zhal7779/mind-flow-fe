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
  background-color: var(--color-green);
  height: 0.25rem;
  z-index: -1;
`;

const commonInput = styled.input`
  text-align: center;
  padding: 1.2rem;
  background-color: #fff;
  border-radius: 2rem;
  min-width: 10rem;
  width: auto;
  box-sizing: content-box;
`;

export const RootTopicInput = styled(commonInput)`
  font-size: 2rem;
  font-weight: 600;
  width: 100%;
  border: 5px solid var(--color-butter);
`;

export const MainTopicInput = styled(commonInput)`
  font-size: 1.6rem;
  font-weight: 600;
  border: 5px solid var(--color-primary);
`;

export const ContentInput = styled.textarea`
  font-size: 1.4rem;
  text-align: center;
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
