import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div>
      {/* map through guesses and retrun a row component for each guess. */}
      {guesses.map((guess, index) => {
        if (turn === index) {
          // will only update the current guess as you type, because index value will only match current guess.
          return <Row key={index} currentGuess={currentGuess} />;
        }
        // key prop is needed because the map is outputting multiple rows, so we assign the index as a key
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
}
