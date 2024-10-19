import styled from "styled-components";

export const MenuContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 1rem;
  background-color: #fff;
  z-index: 1000;
  padding: 0.6rem;
  transform: translate(0, -50%);
  border-radius: 0.6rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
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
  color: var(--color-black);
`;
