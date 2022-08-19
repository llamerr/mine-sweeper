import { times, cloneDeep } from "lodash";
import { createICell, TBoard, TGameBoard } from './Board.types';
import { BombIcon, Cell, Table } from './Board.styles';
import { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';

const Board = ({sizeX, sizeY, holes, handleGameEnd}: TBoard) => {
  const [gameStarted, setGameStarted] = useState(false);

  const [board, setBoard] = useState<TGameBoard>([]);

  const [isGameLost, setIsGameLost] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const [openedCount, setOpenedCount] = useState(0);

  useEffect(() => {
    if (openedCount === sizeX * sizeY - holes - 1) {
      setIsGameWon(true);
    }
  }, [openedCount, sizeX, sizeY, holes]);

  const generateBoard = ((sizeX: number, sizeY: number, holes: number) => (x: number, y: number): TGameBoard => {
    // just use a matrix which represents board directly. each cell has required properties on it
    const board: TGameBoard = times(sizeX, () => times(sizeY, createICell));

    // fill starter cell positions
    let xx1 = (x > 0 ? x - 1 : 0);
    let yy1 = (y > 0 ? y - 1 : 0);
    let xx2 = (x < sizeX - 1 ? x + 1 : sizeX - 1);
    let yy2 = (y < sizeY - 1 ? y + 1 : sizeY - 1);
    for (let i = xx1; i <= xx2; i++) {
      for (let j = yy1; j <= yy2; j++) {
        board[i][j].isStarterCell = true;
        board[i][j].isOpen = true;
      }
    }

    // fill holes
    let generatedCount = 0;
    while (generatedCount < holes) {
      let x = Math.floor(Math.random() * sizeX);
      let y = Math.floor(Math.random() * sizeY);
      if (!board[x][y].isHole && !board[x][y].isStarterCell) {
        board[x][y].isHole = true;
        generatedCount++;

        // fill/increase numbers around holes
        let xx1 = (x > 0 ? x - 1 : 0);
        let yy1 = (y > 0 ? y - 1 : 0);
        let xx2 = (x < sizeX - 1 ? x + 1 : sizeX - 1);
        let yy2 = (y < sizeY - 1 ? y + 1 : sizeY - 1);
        for (let i = xx1; i <= xx2; i++) {
          for (let j = yy1; j <= yy2; j++) {
            board[i][j].count++;
          }
        }
      }
    }

    return board;
  })(sizeX, sizeY, holes);

  const startGame = (x, y) => {
    setBoard(
      openAdjacent(
        generateBoard(x, y),
        x, y)
    );
    setGameStarted(true);
  }

  const openAdjacent = (board: TGameBoard, x: number, y: number) => {
    let xx1 = (x > 0 ? x - 1 : 0);
    let yy1 = (y > 0 ? y - 1 : 0);
    let xx2 = (x < sizeX - 1 ? x + 1 : sizeX - 1);
    let yy2 = (y < sizeY - 1 ? y + 1 : sizeY - 1);
    for (let i = xx1; i <= xx2; i++) {
      for (let j = yy1; j <= yy2; j++) {
        if (!board[i][j].isHole) {
          board[i][j].isOpen = true;
        }
        if (board[i][j].count === 0) {
          if (!board[i][j].traveled) {
            board[i][j].traveled = true;
            board = openAdjacent(board, i, j);
          }
        }
      }
    }
    return board;
  }

  const countOpened = (): number => {
    let opened = 0;
    board.map(row => row.map(cell => {
      if (cell.isOpen) opened++
    }))
    return opened;
  }

  const makeTurn = (x, y) => {
    if (board[x][y].isOpen || board[x][y].isMarked) return;

    let newBoard = cloneDeep(board);
    newBoard[x][y].isOpen = true;
    if (newBoard[x][y].count === 0) openAdjacent(newBoard, x, y);
    if (newBoard[x][y].isHole) setIsGameLost(true);
    setBoard(newBoard);
    setOpenedCount(countOpened());
  }

  const markCell = (x, y) => {
    if (board[x][y].isOpen) return;

    let newBoard = cloneDeep(board);
    newBoard[x][y].isMarked = !newBoard[x][y].isMarked;
    setBoard(newBoard);
  }

  const handleRetry = () => {
    setGameStarted(false);
    setIsGameLost(false);
    setIsGameWon(false);
    setBoard([]);
    setOpenedCount(0);
  }

  return (
    <>
      <Table disabled={isGameLost || isGameWon}>
        <tbody>
        {/* generate boilerplate board for first turn */}
        {!gameStarted && (
          Array(sizeX).fill('').map((row, indexX) => (
            <tr key={indexX}>
              {Array(sizeY).fill('').map((cell, indexY) => (
                <Cell key={indexY}
                      onClick={() => startGame(indexX, indexY)}
                      onContextMenu={(ev) => {
                        ev.preventDefault();
                      }}
                >?</Cell>
              ))}
            </tr>
          ))
        )}
        {/* actual board */}
        {gameStarted && (
          board.map((row, indexX) => (
            <tr key={indexX}>
              {row.map((cell, indexY) => (
                <Cell key={indexY}
                      isOpen={cell.isOpen}
                      isHole={cell.isHole}
                      isMarked={cell.isMarked}
                      onClick={() => makeTurn(indexX, indexY)}
                      onContextMenu={(ev) => {
                        ev.preventDefault();
                        markCell(indexX, indexY);
                      }}
                >
                  {isGameLost && cell.isHole && <BombIcon />}
                  {isGameLost && !cell.isOpen && "\u00A0"}
                  {!cell.isOpen ? (!isGameLost && "?")
                    : (cell.isHole ? (!isGameLost && 'x')
                    : (cell.count > 0 ? cell.count : "\u00A0"))}
                </Cell>
              ))}
            </tr>
          ))
        )}
        </tbody>
      </Table>
      {isGameLost && <Alert severity="warning">You lost!</Alert>}
      {isGameWon && <Alert severity="success">You won!</Alert>}
      {(isGameLost || isGameWon) && (
        <>
          <Button variant="contained" color="secondary" onClick={handleGameEnd}>Go back</Button>
          <Button variant="contained" color="primary" onClick={handleRetry}>Retry</Button>
        </>
      )}
    </>
  )
}

export default Board;
