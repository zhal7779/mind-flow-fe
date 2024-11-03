import styled from 'styled-components';

export const SideMenuWrapper = styled.div<{ $isSideBarOn: boolean }>`
  position: fixed;
  overflow: hidden;
  transform: ${(props) =>
    props.$isSideBarOn ? 'translateX(0)' : 'translateX(-100%);'};
  transition: transform 0.35s ease-in-out;
  padding: 0 1.2rem;
  min-width: 30rem;
  max-width: 81.3rem;
  top: 0px;
  height: 100vh;
  width: 30rem;
  border-right: 1px solid var(--color-border);
`;
export const Header = styled.header`
  padding: 2rem 0rem 2rem 1rem;
  display: flex;
  justify-content: space-between;

  svg {
    color: var(--color-grey-02);
    cursor: pointer;
    font-size: 1.8rem;
    padding: 0 1rem;
    &:hover {
      color: var(--color-grey-04);
    }
  }
`;

export const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const Menu = styled.ul`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > li {
    display: flex;
    align-items: center;
    margin-left: 1rem;
    cursor: pointer;
    > span {
      font-weight: 500;
    }
    > svg {
      font-size: 1.4rem;
      color: var(--color-grey-02);
      margin-right: 1.4rem;
    }
  }
`;

export const Tag = styled.div`
  position: fixed;
  margin-top: 2rem;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--color-border);
  height: fit-content;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;

  > svg {
    color: var(--color-grey-02);
  }

  &:hover {
    > svg {
      color: var(--color-grey-04);
    }
  }
`;
