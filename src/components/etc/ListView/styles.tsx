import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  thead {
    border-bottom: 1px solid var(--color-border);
    tr {
      th {
        font-weight: 600;
        color: var(--color-grey-04);
        font-size: 1.3rem;
      }
      th:nth-child(1) {
        width: 4%;
      }
      th:nth-child(2) {
        width: 55%;
      }
      th:nth-child(3) {
        width: 25%;
      }
    }
  }
  tbody {
    tr {
      td:nth-child(1),
      td:nth-child(3),
      td:nth-child(4) {
        vertical-align: middle;
        text-align: center;
      }

      td:nth-child(2) {
        > div {
          display: flex;
          align-items: center;
          gap: 1rem;

          > p {
            font-weight: 600;
          }
        }
      }

      td:nth-child(4) {
        text-align: center;
      }
    }
  }
  th,
  td {
    padding: 1.2rem;
    font-size: 1.3rem;
  }
`;

export const TagTd = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  display: inline-flex;

  align-items: center;
  justify-content: center;
  border-radius: 0.4rem;
  z-index: 1;

  &:hover {
    background: var(--color-grey-03);
  }
`;

export const TagMenuWrapper = styled.div`
  position: absolute;
  bottom: 4rem;
  right: -8rem;
`;

export const FileImg = styled.div`
  height: 4.4rem;
  width: 7rem;
  border-radius: 4px;
  background-color: var(--color-white-bg);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 3rem;
    opacity: 0.4;
  }
`;
