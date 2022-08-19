export type TBoard = {
  sizeX: number;
  sizeY: number;
  holes: number;
  handleGameEnd: () => void
}

export interface ICell {
  isHole: boolean;
  isOpen: boolean;
  isStarterCell: boolean;
  count: number;
}

export type TGameBoard = Array<Array<ICell>>;

export const createICell = (): ICell => ({
  isHole: false,
  isOpen: false,
  isStarterCell: false,
  count: 0,
})

