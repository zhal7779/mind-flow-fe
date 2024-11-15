import styled from 'styled-components';

export const TagMenuWrapper = styled.aside`
  position: fixed;
  padding: 0 1.2rem;
  width: 100%;
  top: 0px;
  height: 100vh;
  width: 18rem;
  border-right: 1px solid var(--color-border);
`;

export const Tags = styled.ul`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;

export const Tag = styled.li`
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  width: 100%;
`;
