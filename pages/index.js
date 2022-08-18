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
