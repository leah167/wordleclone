import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

export default function Wordle({ solution }) {
  // use functions imported from 'useWordle.js'
  const { currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } =
    useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // 'keyup' - everytime a user presses a key, when released it will fire 'handleKeyup' function.
    window.addEventListener("keyup", handleKeyup);

    // 'truthy' when this condition evaluates to true, remove event listener ending game.
    if (isCorrect) {
      // when these parameters are met, display modal after 2 seconds to allow for animation to complete.
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      // when these parameters are met, display modal after 2 seconds to allow for animation to complete.
      setTimeout(() => setShowModal(true), 2000);

      window.removeEventListener("keyup", handleKeyup);
    }

    // cleanup function to un-attach event to prevent having multiple keyup functions everytime 'useEffect' runs.
    return () => window.removeEventListener("keyup", handleKeyup);
    // pass in handleKeyup, isCorrect, and turn as dependencies - will trigger use effect when dependency array is modified.. i.e. a key is pressed.
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      {/* <div>Solution: {solution}</div> */}
      <div>Guess Word: {currentGuess}</div>
      <br></br>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyup={handleKeyup} />
      {/* only shows modal when showModal evaluates to 'true' */}
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
