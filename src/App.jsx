import React, {useState} from "react";
import checkWinner from "./game";
import checkTie from "./Tie";
import MouseTrail from "./MouseTrail";


export default function App() {
  const [game, setGame] = useState(Array(9).fill(""));
  const [currPlayer, setCurrPlayer] = useState('X');
  const [winnerPos, setWinnerPos] = useState(Array(3).fill(-1));
  const [gameOver, setGameOver] = useState(false);
  const [gameStatus, setGameStatus] = useState(`${currPlayer}'s turn`);
  const [hoverIndex, setHoverIndex] = useState(null);

  function handleClick(index) {
    if (game[index] === '' && !gameOver) {
      let modifiedGame = [...game];
      modifiedGame[index] = currPlayer;

      if (checkWinner(modifiedGame) !== -1) {
        setGameOver(true);
        setWinnerPos(checkWinner(modifiedGame));
        setGameStatus(`${currPlayer} Wins!!`);
      }
      else if (checkTie(modifiedGame)) {
        setGameOver(true);
        setGameStatus(`It's a Draw!!`);
      }
      else {
        let player = (currPlayer === 'X') ? 'O' : 'X';
        setCurrPlayer(player);
        setGameStatus(`${player}'s turn`);
      }
      setGame(modifiedGame);
    }
  }

  function restartGame() {
    setGame(Array(9).fill(""));
    setWinnerPos(Array(3).fill(-1));
    setGameOver(false);
    setGameStatus(`${currPlayer}'s turn`);
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mouse trail effect */}
      <MouseTrail />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-purple-600/10 blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-3xl -bottom-48 -right-48 animate-pulse delay-700"></div>
        <div className="absolute w-48 h-48 rounded-full bg-indigo-600/10 blur-3xl top-1/2 -right-24 animate-pulse delay-500"></div>
      </div>

      <div className="relative bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-bold text-gray-100 text-center mb-8 font-mono tracking-wider">
          Tic Tac Toe
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {game.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className={`
                relative h-20 w-20 flex items-center justify-center rounded-xl cursor-pointer
                transition-all duration-300 transform group
                ${hoverIndex === index && !value && !gameOver ? 'scale-105' : ''}
                ${(index === winnerPos[0] || index === winnerPos[1] || index === winnerPos[2])
                  ? "bg-gradient-to-r from-purple-600/40 to-indigo-600/40 shadow-lg"
                  : "bg-gray-700/30 hover:bg-gray-700/50"}
                ${gameOver ? "cursor-not-allowed" : "hover:shadow-lg"}
              `}
            >
              {/* Preview hover effect */}
              {!value && !gameOver && hoverIndex === index && (
                <span className="absolute text-4xl font-bold text-gray-500/30">
                  {currPlayer}
                </span>
              )}
              <span className={`
                text-4xl font-bold relative z-10
                ${value === 'X' ? 'text-purple-400' : 'text-indigo-400'}
                ${value ? 'animate-appear' : ''}
              `}>
                {value}
              </span>

              {/* Glow effect on hover */}
              <div className={`
                absolute inset-0 rounded-xl transition-opacity duration-300
                ${hoverIndex === index && !value && !gameOver ? 'opacity-100' : 'opacity-0'}
                bg-gradient-to-r from-purple-500/10 to-indigo-500/10 blur-sm
              `} />
            </div>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-xl font-semibold text-gray-100 bg-gray-700/50 py-2 px-4 rounded-full inline-block">
            {gameStatus}
          </p>
        </div>

        <button
          onClick={restartGame}
          className="w-full bg-gray-700/50 hover:bg-gray-700/70 text-gray-100 font-bold py-3 px-6 rounded-xl
            transition-all duration-300 transform hover:scale-105 hover:shadow-lg
            border border-gray-600/30 backdrop-blur-sm"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}