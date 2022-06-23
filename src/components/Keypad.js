import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleKeyup }) {
  const defaultLetters = [
    { key: "a" },
    { key: "b" },
    { key: "c" },
    { key: "d" },
    { key: "e" },
    { key: "f" },
    { key: "g" },
    { key: "h" },
    { key: "i" },
    { key: "j" },
    { key: "k" },
    { key: "l" },
    { key: "m" },
    { key: "n" },
    { key: "o" },
    { key: "p" },
    { key: "q" },
    { key: "r" },
    { key: "s" },
    { key: "t" },
    { key: "Enter" },
    { key: "u" },
    { key: "v" },
    { key: "w" },
    { key: "x" },
    { key: "y" },
    { key: "z" },
    { key: "Delete" },
  ];

  const [letters, setLetters] = useState(defaultLetters);

  return (
    <div className="keypad">
      {/* intially letters value is 'null' passing map on a null value will return an error. Once letters has a value, then map through them */}
      {letters &&
        letters.map((letter) => {
          const color = usedKeys[letter.key];
          // can use the key prop here because the letters all have unique key values
          return (
            <div
              key={letter.key}
              className={color}
              // add functionality to virtual keyboard to make it clickable.
              onClick={() => {
                // key prop of object from letter array
                handleKeyup({ key: letter.key });
              }}
            >
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
