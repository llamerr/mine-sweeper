import Head from 'next/head'
import {clone, times} from "lodash";

// simple cell
const cell = {
  isHole: false,
  isOpen: false,
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
  let x = Math.floor(Math.random() * sizeX)
  let y = Math.floor(Math.random() * sizeY)
  if (!board[x][y].isHole) {
    board[x][y].isHole = true;
    generatedCount++;
  }
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>
    </div>
  )
}
