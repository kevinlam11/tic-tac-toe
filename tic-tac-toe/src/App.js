import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board that represents the game board. It receives props xIsNext, squares, and onPlay. 
// The function handleClick is defined to handle the click event on a square. 
// It checks if there is already a winner or the square is already filled, and if not, it updates the nextSquares array accordingly and calls the onPlay function.
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  // This section calculates the winner by calling the calculateWinner function with the squares array. 
  // If there is a winner, it sets the status variable to display the winner's name. Otherwise, it displays the next player's turn.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  // This section returns the JSX elements representing the game board. 
  // It includes the status element to display the game status, and a set of nested Square components to represent the individual squares on the board. 
  // Each Square component receives the value from the squares array and an onSquareClick function, 
  // which is assigned a unique handleClick function for each square.
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// This section defines the Game component, which represents the overall game. 
// It uses the useState hook to manage the state of the game. 
// It initializes the history state with an array containing a single element, an array of 9 null values, representing the initial state of the game. 
// It also initializes the currentMove state to 0. The xIsNext variable is calculated to determine if it's X's turn or not. 
// The currentSquares variable is set to the squares corresponding to the current move.
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // This function handlePlay is called when a move is played. 
  // It takes the nextSquares array and updates the history state by adding the new nextSquares array to the history. 
  // It also updates the currentMove state to the index of the newly added move.
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // This function jumpTo is called when a move in the history is clicked. 
  // It updates the currentMove state to the selected move, effectively changing the current state of the game.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  // This section creates a list of moves in the game history. 
  // It maps over the history array and generates a list item (<li>) for each move. 
  //   The description for each move is determined based on the move index. 
  //   If the move is greater than 0, it displays "Go to move #" followed by the move number. 
  //   Otherwise, it displays "Go to game start". 
  //   Each move is associated with a button that, when clicked, calls the jumpTo function with the corresponding move index.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  // This section returns the JSX elements representing the overall game. 
  // It includes a wrapper <div> with the class name "game" that contains the game board and the game info. 
  // The game board is rendered using the Board component, passing the xIsNext, currentSquares, and handlePlay props. 
  // The game info section displays the list of moves (<ol>) generated earlier.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
// This is a helper function calculateWinner that determines if there is a winner based on the squares array. 
// It checks all possible winning combinations by iterating over the lines array. 
// If a winning condition is found, it returns the winner's symbol ('X' or 'O'). If there is no winner, it returns null.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
