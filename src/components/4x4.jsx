import "./4x4.css";
import { useState } from "react";

const FourByFour = () => {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(new Array(16));
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const checkForWinner = (squares) => {
    let player = turn;
    const combos = {
      across: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ],
      down: [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
      ],
      diagonal: [
        [0, 5, 10, 15],
        [3, 6, 9, 12],
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
    <div className="fourbyfourwrapper">
      {winner ? <OnWin /> : <Cell num={0} />}
      <Cell num={1} />
      <Cell num={2} />
      <Cell num={3} />
      <Cell num={4} />
      <Cell num={5} />
      <Cell num={6} />
      <Cell num={7} />
      <Cell num={8} />
      <Cell num={9} />
      <Cell num={10} />
      <Cell num={11} />
      <Cell num={12} />
      <Cell num={13} />
      <Cell num={14} />
      <Cell num={15} />
    </div>
  );
};

export default FourByFour;
