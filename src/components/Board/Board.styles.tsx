import styled from '@emotion/styled';

type TableProps = {
  disabled: boolean
}

export const Table = styled.table<TableProps>`
  pointer-events: ${props => (props.disabled ? `none` : '')};
  border: 1px solid black;
  border-spacing: 0;
  user-select: none;

  tr {
    padding: 0;
  }

  td {
    padding: .5rem;
    border: solid;
    border-collapse: collapse;
    cursor: pointer;
    &:hover {
      background-color: lightblue;
    }
  }
`;

type CellProps = {
  isOpen?: boolean;
  isHole?: boolean;
}

export const Cell = styled.td<CellProps>`
  background-color: ${props => (!props.isOpen ? `lightgray` : props.isHole ? 'lightcoral' : 'lightgreen')};
`
