import Head from 'next/head'
import {clone, times} from "lodash";
import styled from "styled-components";

// simple cell
const cell = {
  isHole: false,
  isOpen: false,
  // part4: if we want to duplicate game behavior, it has additional logic inside:
  // first click is always happens on a cell that has 0 adjacent cells and reveals large area
  // means board is always generated after the first click
  // means cell should have isStarterCell param which will prevent generating hole on it or next to it
  // to simplify holes calc, isStarterCell applies to +1/-1 area around click
  //
  // ps: so I used custom config and I see this after first click sometimes:
  // You win! (custom mode - 5x5:16)
  // Score
  // 27680989:06
  // Best
  // 27680988:15
  // I still confident enough that generation happens after first click
  // probably example game just have not bullet-proofed all conditions, but who knows
  isStarterCell: false,
  count: 0,
}

// sizes as const for now, no inputs
// req says NxN, so let's just duplicate it
const sizeX = 4;
const sizeY = sizeX;

// just use a matrix which represents board directly. each cell has required properties on it
const board = times(sizeX, () => (
  times(sizeY,
    () => clone(cell)
  )
));

const holesCount = 4;

// check config to be correct
if (sizeX * sizeY < holesCount) throw(new Error("wrong config"));
if (holesCount === 0) throw(new Error("wrong config"));

// uniform distribution = not exactly random?
// looking at example game it seems to be random
// so it will be random for v1
// probably later some conditions may be added to prevent spawning all holes at the same area close to each other?
// or they may be dynamically spawned to prevent lose on first click on different difficulties?
// or condition to reveal large area on first click on easy can be added?
// etc...
let generatedCount = 0;
while (generatedCount < holesCount) {
  let x = Math.floor(Math.random() * sizeX);
  let y = Math.floor(Math.random() * sizeY);
  if (!board[ x ][ y ].isHole && !board[ x ][ y ].isStarterCell) {
    board[ x ][ y ].isHole = true;
    generatedCount++;

    // update adjacent holes count numbers
    // that's actually pretty interesting:
    // I tried to write simple loop first, and then check each cell around looped cell
    // but that complicate logic a lot and increased loops enormously
    // so I will just repeat same thing as with starter click and go the other way around
    // fill/increase numbers around holes
    let xx1 = (x > 0 ? x - 1 : 0);
    let yy1 = (y > 0 ? y - 1 : 0);
    let xx2 = (x < sizeX - 1 ? x + 1 : sizeX - 1);
    let yy2 = (y < sizeY - 1 ? y + 1 : sizeY - 1);
    for (let i = xx1; i <= xx2; i++) {
      for (let j = yy1; j <= yy2; j++) {
        board[ i ][ j ].count++;
      }
    }
  }
}

const Table = styled.table`
  border: 1px solid black;
  border-spacing: 0;

  tr {
    padding: 0;
  }

  td {
    padding: .5rem;
    border: solid;
    border-collapse: collapse;
  }
`;

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Table>
          <tbody>
          {board.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>
                  {cell.isHole ? "x" : cell.count}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </Table>
      </main>
    </div>
  )
}
