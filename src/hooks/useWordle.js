import { useState } from "react";
import { answerList } from "../components/AnswerList";
import { wordList } from "../components/WordList";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);

  const [currentGuess, setCurrentGuess] = useState("");

  // each guess is formatted as an array of objects showing each individual letter and the color
  // set initial value to an array of length 6, each with an undefined value.
  const [guesses, setGuesses] = useState([...Array(6)]); // Each guess is an array

  // separate history state is needed to ensure the user does not submit duplicate guesses.
  const [history, setHistory] = useState([]); // Each guess is a string

  // Boolean
  const [isCorrect, setIsCorrect] = useState(false);

  const [usedKeys, setUsedKeys] = useState({}); //{a: 'green', b: 'yellow', c: 'grey'}

  // Format a guess (string) into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    // spread operator is turning the string value and turning it into an array of letters.

    let solutionArray = [...solution];
    // spread currentGuess into an array, then map that array into a new array, and return an updated value for each item in the array in object format, assigning each letter a key value and a color.

    let formattedGuess = [...currentGuess].map((letter) => {
      // set default color to grey
      return { key: letter, color: "grey" };
    });

    // find any green letters
    formattedGuess.forEach((letter, i) => {
      // if the formatted guess array at the index matches the solution array at the same position(index)
      if (solutionArray[i] === letter.key) {
        // set the color of the matching index to green
        formattedGuess[i].color = "green";

        // avoid double matching a letter by setting the matched letter in the solution array to null after it has been matched (cross it out)
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((letter, i) => {
      // if the solution array contains the letter anywhere inside it
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "yellow";

        // yellow letters are not dependant on the index in the array
        // find particular index of letter in solution array, and set to null.
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct (matches solution word)
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];

      // update guess with each turn to be the formatted guess.
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    // update and colorize used keys state
    setUsedKeys((prevUsedKeys) => {
      let newKeys = { ...prevUsedKeys };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];

        if (letter.color === "green") {
          newKeys[letter.key] = "green";
          return;
        }
        // verify color does not already have the value 'green' before assigning 'yellow' (in the case of potential duplicate letters in the solution array.)
        if (letter.color === "yellow" && currentColor !== "green") {
          newKeys[letter.key] = "yellow";
          return;
        }
        if (
          letter.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[letter.key] = "grey";
          return;
        }
      });

      return newKeys;
    });

    setCurrentGuess("");
  };

  // handle keyup event & track current guess
  // if user presses enter, add the new guess

  //   destructure 'event' object and pull the 'key' property from it
  const handleKeyup = ({ key }) => {
    console.log(key);

    if (key === "Enter") {
      const isValidGuess = validateGuess(); //true if valid guess, false if invalid (truthy)

      // Check if guess is valid or  not returning either true or false.
      if (!isValidGuess) {
        return;
      }

      // currentGuess does not have to be passed as an argument because currentGuess is stored in the state already,
      // so it can be accessed inside the formatGuess function
      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    if (key === "Backspace" || key === "Delete") {
      setCurrentGuess((prev) => {
        // returns new string based on old string, removing the last character.
        return prev.slice(0, -1);
      });
      //   after backspace has been hit, return to stop code from running any further, wait for next keyup event
      return;
    }

    // regex (regular expression) expression to check exclusively for user input that is letters a-z, A-Z
    // regex is placed inside 2 forward slashes
    // start with a ^ which means start checking from the beginning of the input string
    // [] to match against a range of characters
    // $ at the end - stop checking at the end of string being tested
    // passing 'key' into test as an argument will check to make sure the key pressed matches A-Za-z params
    if (/^[A-Za-z]$/.test(key)) {
      // check to make sure user guess length is less than 5 characters
      if (currentGuess.length < 5) {
        // prev= current value of 'currentGuess'
        setCurrentGuess((prev) => {
          // updates 'currentGuess' by taking initial value and adding the key that was pressed
          return prev + key;
        });
      }
    }
  };

  const validateGuess = () => {
    // Only want to submit guess if the 'turn' is less than 5
    if (turn > 5) {
      console.log("You have used all of your guesses");
      return false;
    }
    // Do not allow duplicate words
    if (history.includes(currentGuess)) {
      console.log("You have already tried this word");
      return false;
    }
    // Word must be 5 characters long
    if (currentGuess.length !== 5) {
      console.log("Word must be 5 characters long");
      return false;
    }
    // Is word in the wordList?
    const isInWordList = wordList.find(({ word }) => {
      return word === currentGuess;
    });
    // Is word in the answerList?
    const isInAnswerList = answerList.find(({ word }) => {
      return word === currentGuess;
    });
    // if the word is neither in the wordList or the answerList
    if (!isInWordList && !isInAnswerList) {
      console.log("Word must be in the wordList");
      return false;
    }
    return true;
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    usedKeys,
    handleKeyup,
  };
};

// Export function
export default useWordle;
