import Head from 'next/head'
import {useState} from "react";
import Form from "../src/components/Form/Form";
import Board from "../src/components/Board/Board";


export default function Home() {
  const [ isStarted, setIsStarted ] = useState(false);

  const [ sizeX, setSizeX ] = useState(0);
  const [ sizeY, setSizeY ] = useState(0);
  const [ holes, setHoles ] = useState(0);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <h1 className="title">
          Minesweeper game
        </h1>
        {!isStarted && <Form
          handleSubmitCallback={({ sizeX, sizeY, holes }) => {
            setIsStarted(true);
            setSizeX(sizeX);
            setSizeY(sizeY);
            setHoles(holes);
          } }/>}
        {isStarted && <Board sizeX={sizeX} sizeY={sizeY} holes={holes} handleGameEnd={() => {
          setIsStarted(false);
        }} />}
      </main>
    </div>
  )
}
