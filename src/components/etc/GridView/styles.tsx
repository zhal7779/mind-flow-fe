import styled from 'styled-components';
export const FileContent = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(242px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

export const FileFrame = styled.div<{ $active: boolean }>`
  position: relative;
  border-radius: 8px;
  border: ${(props) =>
    props.$active
      ? '2px solid var( --color-purple)'
      : '1px solid var(--color-border)'};

  > span {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  &:hover {
    box-shadow: var(--shadow-base);
  }
`;
export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;
export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
`;

export const DeleteContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const FileImg = styled.div`
  height: 19rem;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: var(--color-grey-03);
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 6rem;
    opacity: 0.4;
  }
`;

export const FileDes = styled.div`
  background-color: var(--color-white);
  padding: 1.2rem 1.2rem 0.8rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  > p {
    font-size: 1.4rem;
    font-weight: 600;
    height: 2rem;
  }
  > span {
    display: block;
    font-size: 1.3rem;
    line-height: 1.8rem;
    font-weight: 400;
    color: var(--color-grey-02);
  }

  > strong {
    font-size: 1.3rem;
    color: var(--color-danger);
    font-weight: 600;
  }
`;

export const TagMenuWrapper = styled.div`
  position: absolute;
  bottom: 5rem;
  right: -6rem;
`;
export const TagContent = styled.div<{ $hover: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  z-index: 1;

  &:hover {
    background: ${(props) =>
      props.$hover ? 'var(--color-grey-03)' : 'transparent'};
  }
`;

export const ActiveTag = styled.span<{ $tag: string }>`
  color: ${(props) =>
    props.$tag === 'important'
      ? 'var(--color-tag-purple)'
      : props.$tag === 'defer'
      ? 'var(--color-tag-red)'
      : props.$tag === 'progress'
      ? 'var(--color-tag-orange)'
      : 'var(--color-tag-blue)'};
`;
