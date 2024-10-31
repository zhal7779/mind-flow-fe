import styled from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  z-index: 1000;
  padding: 0.6rem;
  border-radius: 0.6rem;
  box-shadow: var(--shadow-base);
  > span {
    display: block;
    width: 0.1rem;
    height: 3rem;
    background: #aeaeae;
    margin: 0.2rem;
  }
`;

export const MenuIcon = styled.div`
  font-size: 1.5rem;
  line-height: 1.5rem;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
  color: var(--color-black-01);
`;
