import "./naughts-and-crosses.css";
import { useState } from "react";

const NaughtsAndCrosses = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(new Array(9));
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const checkForWinner = (squares) => {
    let player = turn;
    const combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combo in combos) {
      let isWinner = combos[combo].find((pattern) =>
        pattern.every((square) => {
          return squares[square] === player;
        })
      );
      if (isWinner) {
        setWinner(true);
        const newScore = { ...score };
        newScore[player] += 1;
        setScore(newScore);
        setCells(new Array(9));
      }
    }
  };

  const handleClick = (num) => {
    if (!winner) {
      if (cells[num] && !cells.every((cell) => cell)) {
        alert("Square taken");
        return;
      } else if (cells[num] && cells.every((cell) => cell)) {
        alert("Draw!");
        return handleReset();
      }
      const squares = [...cells];
      if (turn === "X") {
        squares[num] = "X";
        setTurn("O");
      } else {
        squares[num] = "O";
        setTurn("X");
      }
      setCells(squares);
      checkForWinner(squares);
    }
  };

  const handleReset = () => {
    setWinner(false);
    setCells(new Array(9));
  };

  const Cell = ({ num }) => {
    return (
      <div className="ox" onClick={() => handleClick(num)}>
        {cells[num]}
      </div>
    );
  };

  const OnWin = () => {
    return (
      <button className="ox" onClick={() => handleReset()}>
        <span id="new-game">
          {`X: ${score.X} | O: ${score.O}`}
          <br />
          New Game
        </span>
      </button>
    );
  };

  return (
    <div className="wrapper">
      <Cell num={0} />
      <Cell num={1} />
      <Cell num={2} />
      <Cell num={3} />
      {winner ? <OnWin /> : <Cell num={4} />}
      <Cell num={5} />
      <Cell num={6} />
      <Cell num={7} />
      <Cell num={8} />
    </div>
  );
};

export default NaughtsAndCrosses;
