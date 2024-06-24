import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const NodeContent = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Node = styled.li`
  position: relative;
  left: 150px;
  width: 5rem;
  height: 5rem;
  border: 5px solid pink;
  background-color: #fefefe;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 15rem;
  margin-bottom: 1rem;
  color: #242424;
  position: relative;
`;

export const NodeText = styled.span`
  position: absolute;
  font-weight: 600;
`;

export const Line = styled.div`
  position: absolute;
  background-color: #808080;
  width: 55px;
  height: 2px;
  top: 50%;
  right: -55px;
`;
