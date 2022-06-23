import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {/* if the value for isCorrect 'true' */}
      {isCorrect && (
        <div>
          <h1>You Win!</h1>
          <p className="solution">Solution: {solution}</p>
          <p>You found the solution in {turn} guesses! </p>
        </div>
      )}
      {/* if the value for isCorrect 'false' */}
      {!isCorrect && (
        <div>
          <h1>Sorry! Out of guesses! </h1>
          <p className="solution">Solution: {solution}</p>
          <p>Better luck next time!</p>
        </div>
      )}
    </div>
  );
}
