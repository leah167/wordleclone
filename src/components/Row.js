import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row past">
        {/*  map through guess array, getting letter and index properties for each letter in the array */}
        {guess.map((letter, index) => (
          // give the class properties of the letter object to the square to color it.
          //   this will set the className to the color 'green' 'yellow' or 'grey' allowing a class to be created in the index.css to correspond.
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }
  if (currentGuess) {
    // turn currentGuess into an array of letters that can be iterated.
    let letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, index) => (
          // map through letters and output a square for each one with the letter inside it.
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {[...Array(5 - letters.length)].map((_, index) => (
          // empty squares
          <div key={index}></div>
        ))}
      </div>
    );
  }

  // if guess is still initial value of undefined, return empty row
  return (
    <div className="row">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
