import styled from '@emotion/styled';
import AlbumIcon from '@mui/icons-material/Album';

export const BombIcon = styled(AlbumIcon)`
  font-size: 1.5rem;
`

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
    width: 2rem;
    height: 2rem;
    text-align: center;
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
  isMarked?: boolean;
}

export const Cell = styled.td<CellProps>`
  background-color: ${props => (
    props.isMarked ? 'darkorange' 
    : !props.isOpen ? `lightgray`
    : props.isHole ? 'lightcoral'
    : 'lightgreen')};
`
