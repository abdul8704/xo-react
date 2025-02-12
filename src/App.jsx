import React, { useState } from "react";
import checkWinner from "./game";
import checkTie from "./Tie";

export default function App() {

  let [game, setGame] = useState(Array(9).fill(""));
  let [currPlayer, setCurrPlayer] = useState('X');
  let [winnerPos, setWinnerPos] = useState(Array(3).fill(-1));
  let [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState(`${currPlayer}'s turn`)

  function handleClick(index) {
    if (game[index] === '' && !gameOver) {
      let modifiedGame = [...game];
      modifiedGame[index] = currPlayer;
      
      if (checkWinner(modifiedGame) !== -1) {
        setGameOver(true);
        setWinnerPos(checkWinner(modifiedGame))
        setGameStatus(`${currPlayer} Wins!!`)
      }
      else if(checkTie(modifiedGame)){
        setGameOver(true);
        setGameStatus(`It's a Draw!!`)
      }
      else{
        let player = (currPlayer === 'X') ? 'O' : 'X';
        setCurrPlayer(player)
        // console.log(currPlayer)
        setGameStatus(`${player}'s turn`)
      } 
      setGame(modifiedGame)
    }
  }
  function restartGame() {
    setGame(Array(9).fill(""))
    setWinnerPos(Array(3).fill(-1))
    setGameOver(false);
    setGameStatus(`${currPlayer}'s turn`)
  }
  return (
    <>

      <div className="border-2 border-red-600 flex flex-col items-center p-4 rounded-xl">
        <h1 className="font-bold text-3xl p-6 font-mono ">Tic Tac Toe</h1>
        <div className="grid text-center grid-cols-3 w-auto h-auto gap-[18px]">
          {game.map((value, index) => (
            <div key={index} className={` 
              ${(index === winnerPos[0] || index === winnerPos[1] || index === winnerPos[2]) ? 
                "bg-red-400 h-[75px] w-[75px] cursor-pointer text-center leading-[75px] font-bold text-[30px] italic" :
                "bg-red-300 h-[75px] w-[75px] cursor-pointer text-center leading-[75px] font-bold text-[30px] "}`
            }
              onClick={() => handleClick(index)}>{value}</div>
          ))}

        </div>

        <div className="p-2 text-lg font-semibold font-mono text-[20px]">{gameStatus}</div>  
        <button
          onClick={restartGame}
          className="mt-2 px-4 py-2 bg-red-400 text-white font-semibold rounded-md shadow-md hover:bg-red-500 transition"
        >
          Restart Game
        </button>
      </div>
      
    </>
  );
}
